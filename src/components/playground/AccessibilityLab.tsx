'use client';

import {
	Accessibility,
	CircleStop,
	Eye,
	Mic,
	MicOff,
	RotateCcw,
	Ruler,
	Volume2,
} from 'lucide-react';
import {
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface A11yPrefs {
	scale: number;
	lineHeight: number;
	letterSpacing: number;
	saturation: number;
	contrast: boolean;
	invert: boolean;
	grayscale: boolean;
	dyslexia: boolean;
	highlightLinks: boolean;
	ruler: boolean;
	reduceMotion: boolean;
}

type BooleanPrefKey =
	| 'contrast'
	| 'invert'
	| 'grayscale'
	| 'dyslexia'
	| 'highlightLinks'
	| 'ruler'
	| 'reduceMotion';

type RangePrefKey = 'scale' | 'lineHeight' | 'letterSpacing' | 'saturation';

const DEFAULTS: A11yPrefs = {
	scale: 100,
	lineHeight: 1.6,
	letterSpacing: 0,
	saturation: 100,
	contrast: false,
	invert: false,
	grayscale: false,
	dyslexia: false,
	highlightLinks: false,
	ruler: false,
	reduceMotion: false,
};

const STORAGE_KEY = 'playground:a11y';

const PRESETS: { id: string; label: string; prefs: A11yPrefs }[] = [
	{ id: 'padrao', label: 'Padrão', prefs: DEFAULTS },
	{
		id: 'baixa-visao',
		label: 'Baixa visão',
		prefs: { ...DEFAULTS, scale: 145, contrast: true, highlightLinks: true, lineHeight: 2 },
	},
	{
		id: 'dislexia',
		label: 'Dislexia',
		prefs: {
			...DEFAULTS,
			dyslexia: true,
			scale: 115,
			letterSpacing: 0.06,
			lineHeight: 2.1,
			highlightLinks: true,
		},
	},
	{
		id: 'monocromatico',
		label: 'Monocromático',
		prefs: { ...DEFAULTS, grayscale: true, saturation: 0 },
	},
];

interface SpeechResultLike {
	0: { transcript: string };
}

interface SpeechEventLike {
	results: ArrayLike<SpeechResultLike>;
}

interface RecognitionLike {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	start: () => void;
	stop: () => void;
	onresult: ((event: SpeechEventLike) => void) | null;
	onend: (() => void) | null;
	onerror: (() => void) | null;
}

type RecognitionCtor = new () => RecognitionLike;

function SwitchRow({
	id,
	label,
	description,
	checked,
	onCheckedChange,
}: {
	id: string;
	label: string;
	description: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}) {
	return (
		<div className='flex items-start justify-between gap-3 py-2'>
			<label htmlFor={id} className='cursor-pointer select-none'>
				<span className='block text-xs font-medium'>{label}</span>
				<span className='text-muted-foreground mt-0.5 block text-[11px] leading-snug'>
					{description}
				</span>
			</label>

			<Switch
				id={id}
				checked={checked}
				onCheckedChange={onCheckedChange}
				aria-label={label}
				className='data-[state=unchecked]:bg-base-300 mt-0.5 border-black/20 dark:border-white/30'
			/>
		</div>
	);
}

function RangeRow({
	label,
	value,
	min,
	max,
	step,
	display,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	display: string;
	onChange: (value: number) => void;
}) {
	return (
		<div className='py-2'>
			<div className='mb-2 flex items-center justify-between gap-2'>
				<span className='text-xs font-medium'>{label}</span>
				<span className='text-muted-foreground rounded border border-black/10 px-1.5 py-0.5 font-mono text-[10px] dark:border-white/20'>
					{display}
				</span>
			</div>

			<Slider
				aria-label={label}
				min={min}
				max={max}
				step={step}
				value={[value]}
				onValueChange={(values) => onChange(values[0] ?? min)}
			/>
		</div>
	);
}

export function AccessibilityLab() {
	const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULTS);
	const [announcement, setAnnouncement] = useState('Preferências no padrão.');
	const [rulerY, setRulerY] = useState<number | null>(null);
	const [listening, setListening] = useState(false);
	const [transcript, setTranscript] = useState('');
	const [speaking, setSpeaking] = useState(false);

	const previewRef = useRef<HTMLDivElement>(null);
	const prefsRef = useRef<A11yPrefs>(DEFAULTS);
	const recognitionRef = useRef<RecognitionLike | null>(null);
	const speakRef = useRef<() => void>(() => {});

	const announce = useCallback((message: string) => {
		setAnnouncement(message);
	}, []);

	const apply = useCallback(
		(updater: (previous: A11yPrefs) => A11yPrefs, message?: string) => {
			const next = updater(prefsRef.current);
			prefsRef.current = next;
			setPrefs(next);
			if (message) announce(message);
		},
		[announce],
	);

	const toggle = useCallback(
		(key: BooleanPrefKey, label: string) => {
			const next = !prefsRef.current[key];
			apply(
				(previous) => ({ ...previous, [key]: next }),
				`${label} ${next ? 'ativado' : 'desativado'}.`,
			);
		},
		[apply],
	);

	const setRange = useCallback(
		(key: RangePrefKey, value: number, label: string, display: string) => {
			apply((previous) => ({ ...previous, [key]: value }), `${label}: ${display}.`);
		},
		[apply],
	);

	const applyPreset = useCallback(
		(preset: (typeof PRESETS)[number]) => {
			apply(() => preset.prefs, `Preset ${preset.label} aplicado.`);
		},
		[apply],
	);

	const reset = useCallback(() => {
		apply(() => DEFAULTS, 'Preferências restauradas para o padrão.');
	}, [apply]);

	useEffect(() => {
		prefsRef.current = prefs;
	}, [prefs]);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);

			if (!stored) return;

			const parsed = JSON.parse(stored) as Partial<A11yPrefs>;
			const merged = { ...DEFAULTS, ...parsed };

			prefsRef.current = merged;
			setPrefs(merged);
			setAnnouncement('Preferências salvas carregadas.');
		} catch {
			// storage bloqueado ou JSON inválido: segue com os padrões.
		}
	}, []);

	useEffect(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
		} catch {
			// storage indisponível em modo privado.
		}
	}, [prefs]);

	const stopSpeaking = useCallback(() => {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
		}

		setSpeaking(false);
	}, []);

	const speak = useCallback(() => {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
			announce('Leitura em voz alta não é suportada neste navegador.');
			return;
		}

		const selected = window.getSelection()?.toString().trim();
		const text = selected || previewRef.current?.innerText.trim() || '';

		if (!text) {
			announce('Nada para ler nesta área.');
			return;
		}

		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(text);

		utterance.lang = 'pt-BR';
		utterance.rate = 1;
		utterance.onend = () => setSpeaking(false);
		utterance.onerror = () => setSpeaking(false);

		setSpeaking(true);
		announce(selected ? 'Lendo o trecho selecionado.' : 'Lendo o conteúdo da demonstração.');
		window.speechSynthesis.speak(utterance);
	}, [announce]);

	useEffect(() => {
		speakRef.current = speak;
	}, [speak]);

	const runCommand = useCallback(
		(phrase: string) => {
			const normalized = phrase
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.toLowerCase();

			setTranscript(phrase);

			const bump = (delta: number) => {
				const value = Math.min(200, Math.max(100, prefsRef.current.scale + delta));

				apply((previous) => ({ ...previous, scale: value }), `Tamanho do texto: ${value}%.`);
			};

			if (normalized.includes('aumentar') || normalized.includes('maior')) return bump(10);
			if (normalized.includes('diminuir') || normalized.includes('menor')) return bump(-10);
			if (normalized.includes('contraste')) return toggle('contrast', 'Alto contraste');
			if (normalized.includes('inverter') || normalized.includes('invert'))
				return toggle('invert', 'Inversão de cores');
			if (normalized.includes('cinza') || normalized.includes('monocrom'))
				return toggle('grayscale', 'Escala de cinza');
			if (normalized.includes('dislexia')) return toggle('dyslexia', 'Fonte para dislexia');
			if (normalized.includes('regua')) return toggle('ruler', 'Régua de leitura');
			if (normalized.includes('link')) return toggle('highlightLinks', 'Destaque de links');
			if (normalized.includes('movimento') || normalized.includes('animacao'))
				return toggle('reduceMotion', 'Redução de movimento');

			if (normalized.includes('parar') || normalized.includes('silencio')) {
				stopSpeaking();
				recognitionRef.current?.stop();
				return;
			}

			if (
				normalized.includes('ler') ||
				normalized.includes('leitura') ||
				normalized.includes('voz')
			) {
				speakRef.current();
				return;
			}

			if (
				normalized.includes('reset') ||
				normalized.includes('restaurar') ||
				normalized.includes('padrao')
			) {
				apply(() => DEFAULTS, 'Preferências restauradas para o padrão.');
				return;
			}

			announce(`Comando não reconhecido: ${phrase}`);
		},
		[announce, apply, stopSpeaking, toggle],
	);

	const startListening = useCallback(() => {
		const win = window as unknown as {
			SpeechRecognition?: RecognitionCtor;
			webkitSpeechRecognition?: RecognitionCtor;
		};

		const Ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition;

		if (!Ctor) {
			announce('Reconhecimento de voz não é suportado neste navegador. Tente Chrome ou Edge.');
			return;
		}

		const recognition = new Ctor();

		recognition.lang = 'pt-BR';
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.onresult = (event) => {
			const result = event.results[event.results.length - 1];
			const phrase = result?.[0]?.transcript ?? '';

			if (phrase) runCommand(phrase);
		};
		recognition.onend = () => setListening(false);
		recognition.onerror = () => {
			setListening(false);
			announce('Não foi possível ouvir. Verifique a permissão do microfone.');
		};

		recognitionRef.current = recognition;
		recognition.start();
		setListening(true);
		announce('Escutando comandos de voz.');
	}, [announce, runCommand]);

	const stopListening = useCallback(() => {
		recognitionRef.current?.stop();
		recognitionRef.current = null;
		setListening(false);
		announce('Comandos de voz desativados.');
	}, [announce]);

	useEffect(() => {
		return () => {
			recognitionRef.current?.stop();

			if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
				window.speechSynthesis.cancel();
			}
		};
	}, []);

	const filters =
		[
			prefs.invert && 'invert(1)',
			prefs.grayscale && 'grayscale(1)',
			prefs.saturation !== 100 && `saturate(${prefs.saturation / 100})`,
		]
			.filter(Boolean)
			.join(' ') || 'none';

	const rulerHeight = Math.max(28, Math.round(16 * (prefs.scale / 100) * prefs.lineHeight) + 10);

	const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!prefs.ruler) return;

		const rect = event.currentTarget.getBoundingClientRect();

		setRulerY(Math.max(0, Math.min(rect.height - 8, event.clientY - rect.top)));
	};

	return (
		<div className='grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]'>
			<div className='rounded-base bg-base-100 shadow-light dark:shadow-dark border-2 border-black p-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto dark:border-white'>
				<div className='flex items-center justify-between gap-2 border-b-2 border-black pb-3 dark:border-white'>
					<div className='flex items-center gap-2'>
						<span className='rounded-base bg-primary text-primary-content shadow-light dark:shadow-dark flex h-9 w-9 items-center justify-center border-2 border-black dark:border-white'>
							<Accessibility className='h-4 w-4' />
						</span>

						<div>
							<p className='text-sm leading-none font-semibold'>Menu de acessibilidade</p>
							<p className='text-muted-foreground mt-1 font-mono text-[10px] tracking-[0.16em] uppercase'>
								barra de recursos
							</p>
						</div>
					</div>

					<button
						type='button'
						onClick={reset}
						title='Restaurar padrões'
						aria-label='Restaurar preferências padrão'
						className='rounded-base text-muted-foreground hover:text-foreground focus-visible:ring-primary flex h-8 w-8 items-center justify-center border-2 border-black/15 transition-colors hover:border-black focus-visible:ring-2 focus-visible:outline-none dark:border-white/20 dark:hover:border-white'
					>
						<RotateCcw className='h-3.5 w-3.5' />
					</button>
				</div>

				<div
					role='group'
					aria-label='Presets de acessibilidade'
					className='mt-3 flex flex-wrap gap-1.5'
				>
					{PRESETS.map((preset) => (
						<button
							key={preset.id}
							type='button'
							onClick={() => applyPreset(preset)}
							className='text-muted-foreground hover:text-foreground focus-visible:ring-primary rounded-full border border-black/15 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase transition-colors hover:border-black focus-visible:ring-2 focus-visible:outline-none dark:border-white/20 dark:hover:border-white'
						>
							{preset.label}
						</button>
					))}
				</div>

				<p className='text-muted-foreground mt-4 mb-1 font-mono text-[10px] tracking-[0.2em] uppercase'>
					Visão
				</p>

				<RangeRow
					label='Tamanho do texto'
					value={prefs.scale}
					min={100}
					max={200}
					step={5}
					display={`${prefs.scale}%`}
					onChange={(value) => setRange('scale', value, 'Tamanho do texto', `${value}%`)}
				/>

				<RangeRow
					label='Saturação'
					value={prefs.saturation}
					min={0}
					max={150}
					step={5}
					display={`${prefs.saturation}%`}
					onChange={(value) => setRange('saturation', value, 'Saturação', `${value}%`)}
				/>

				<SwitchRow
					id='a11y-contrast'
					label='Alto contraste'
					description='Fundo preto e texto branco com links em amarelo.'
					checked={prefs.contrast}
					onCheckedChange={() => toggle('contrast', 'Alto contraste')}
				/>

				<SwitchRow
					id='a11y-invert'
					label='Inverter cores'
					description='Inverte a luminância de toda a área de leitura.'
					checked={prefs.invert}
					onCheckedChange={() => toggle('invert', 'Inversão de cores')}
				/>

				<SwitchRow
					id='a11y-grayscale'
					label='Escala de cinza'
					description='Remove a informação transmitida por cor.'
					checked={prefs.grayscale}
					onCheckedChange={() => toggle('grayscale', 'Escala de cinza')}
				/>

				<p className='text-muted-foreground mt-4 mb-1 font-mono text-[10px] tracking-[0.2em] uppercase'>
					Leitura
				</p>

				<RangeRow
					label='Altura da linha'
					value={prefs.lineHeight}
					min={1.3}
					max={2.4}
					step={0.1}
					display={`${prefs.lineHeight.toFixed(1)}×`}
					onChange={(value) =>
						setRange('lineHeight', value, 'Altura da linha', `${value.toFixed(1)}×`)
					}
				/>

				<RangeRow
					label='Espaçamento entre letras'
					value={prefs.letterSpacing}
					min={0}
					max={0.16}
					step={0.01}
					display={`${prefs.letterSpacing.toFixed(2)}em`}
					onChange={(value) =>
						setRange('letterSpacing', value, 'Espaçamento entre letras', `${value.toFixed(2)}em`)
					}
				/>

				<SwitchRow
					id='a11y-dyslexia'
					label='Fonte para dislexia'
					description='Troca para uma pilha legível com mais espaço entre palavras.'
					checked={prefs.dyslexia}
					onCheckedChange={() => toggle('dyslexia', 'Fonte para dislexia')}
				/>

				<SwitchRow
					id='a11y-links'
					label='Destacar links'
					description='Aplica fundo e sublinhado em todos os links.'
					checked={prefs.highlightLinks}
					onCheckedChange={() => toggle('highlightLinks', 'Destaque de links')}
				/>

				<SwitchRow
					id='a11y-ruler'
					label='Régua de leitura'
					description='Faixa horizontal que acompanha o ponteiro.'
					checked={prefs.ruler}
					onCheckedChange={() => toggle('ruler', 'Régua de leitura')}
				/>

				<SwitchRow
					id='a11y-motion'
					label='Reduzir movimento'
					description='Corta animações e transições da área de leitura.'
					checked={prefs.reduceMotion}
					onCheckedChange={() => toggle('reduceMotion', 'Redução de movimento')}
				/>

				<div className='mt-4 border-t border-black/10 pt-3 dark:border-white/15'>
					<p className='flex items-center gap-1.5 text-[11px] font-medium'>
						<Mic className='h-3.5 w-3.5' />
						Comandos de voz
					</p>
					<p className='text-muted-foreground mt-1 text-[11px] leading-snug'>
						Diga “aumentar texto”, “contraste”, “dislexia”, “régua”, “ler” ou “resetar”.
					</p>

					<div className='mt-2 flex flex-wrap gap-1.5'>
						<Button
							type='button'
							size='sm'
							variant={listening ? 'default' : 'outline'}
							onClick={listening ? stopListening : startListening}
							aria-pressed={listening}
							className='h-8 gap-1.5 px-2.5 text-[11px]'
						>
							{listening ? <MicOff className='h-3.5 w-3.5' /> : <Mic className='h-3.5 w-3.5' />}
							{listening ? 'Parar de ouvir' : 'Ouvir comandos'}
						</Button>
					</div>

					{transcript && (
						<p className='text-muted-foreground mt-2 text-[11px]'>
							Último comando: <span className='text-foreground'>“{transcript}”</span>
						</p>
					)}
				</div>

				<p className='sr-only' role='status' aria-live='polite'>
					{announcement}
				</p>
			</div>

			<div className='min-w-0'>
				<div className='mb-2 flex flex-wrap items-center justify-between gap-2'>
					<p className='text-muted-foreground flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase'>
						<Eye className='h-3.5 w-3.5' />
						Área de leitura
					</p>

					<div className='flex flex-wrap items-center gap-1.5'>
						<Button
							type='button'
							size='sm'
							variant='outline'
							onClick={speaking ? stopSpeaking : speak}
							className='h-8 gap-1.5 px-2.5 text-[11px]'
						>
							{speaking ? (
								<CircleStop className='h-3.5 w-3.5' />
							) : (
								<Volume2 className='h-3.5 w-3.5' />
							)}
							{speaking ? 'Parar leitura' : 'Ler em voz alta'}
						</Button>

						<Button
							type='button'
							size='sm'
							variant={prefs.ruler ? 'default' : 'outline'}
							onClick={() => toggle('ruler', 'Régua de leitura')}
							aria-pressed={prefs.ruler}
							className='h-8 gap-1.5 px-2.5 text-[11px]'
						>
							<Ruler className='h-3.5 w-3.5' />
							Régua
						</Button>
					</div>
				</div>

				<div
					ref={previewRef}
					role='region'
					aria-label='Conteúdo de exemplo com preferências aplicadas'
					className='rounded-base shadow-light dark:shadow-dark relative overflow-hidden border-2 border-black bg-white dark:border-white'
					onPointerMove={handlePointerMove}
					onPointerLeave={() => setRulerY(null)}
				>
					<div
						className={cn(
							'a11y-preview p-5 text-neutral-900 transition-colors duration-200 md:p-8',
							prefs.contrast && 'a11y-contrast',
							prefs.dyslexia && 'a11y-dyslexia',
							prefs.highlightLinks && 'a11y-links',
							prefs.reduceMotion && 'a11y-reduce-motion',
						)}
						style={{
							fontSize: `${prefs.scale / 100}rem`,
							lineHeight: prefs.lineHeight,
							letterSpacing: `${prefs.letterSpacing}em`,
							filter: filters,
						}}
					>
						<article className='mx-auto max-w-2xl'>
							<p className='font-mono text-[0.68em] tracking-[0.22em] text-[#1445c9] uppercase'>
								Conteúdo de exemplo
							</p>

							<h3 className='mt-2 text-[1.7em] leading-tight font-bold tracking-tight'>
								Acessibilidade não é um recurso extra
							</h3>

							<p className='mt-3 text-[0.95em]'>
								Ajustar contraste, tamanho e espaçamento não deixa o site “mais bonito”. Deixa o
								conteúdo <strong>possível</strong> para quem navega com baixa visão, dislexia, TDAH
								ou leitor de tela.
							</p>

							<p className='mt-3 text-[0.95em]'>
								O painel ao lado aplica as mudanças apenas nesta área — do mesmo jeito que um menu
								de acessibilidade real precisa respeitar o escopo.{' '}
								<a
									href='https://www.w3.org/WAI/WCAG22/quickref/'
									target='_blank'
									rel='noreferrer'
									className='text-[#1445c9] underline underline-offset-2'
								>
									Consulte a referência WCAG 2.2
								</a>
								.
							</p>

							<blockquote className='mt-4 border-l-4 border-[#1445c9] pl-4 text-[0.92em] italic opacity-80'>
								“Nada sobre nós, sem nós.” — lema do movimento de direitos das pessoas com
								deficiência.
							</blockquote>

							<h4 className='mt-5 text-[1.1em] font-semibold'>Checklist rápida</h4>

							<ul className='mt-2 list-disc space-y-1 pl-5 text-[0.92em]'>
								<li>Contraste mínimo de 4.5:1 para texto normal.</li>
								<li>Área de toque de pelo menos 24×24 px.</li>
								<li>Nenhuma informação transmitida apenas por cor.</li>
							</ul>

							<form
								className='mt-5 rounded border border-black/15 p-4'
								onSubmit={(event) => {
									event.preventDefault();
									announce('Formulário de demonstração enviado — nada saiu do navegador.');
								}}
							>
								<label htmlFor='a11y-email' className='block text-[0.85em] font-medium'>
									Receba o checklist completo
								</label>

								<p id='a11y-email-hint' className='mt-0.5 text-[0.78em] opacity-60'>
									Formulário de demonstração — nada é enviado.
								</p>

								<div className='mt-2 flex flex-col gap-2 sm:flex-row'>
									<input
										id='a11y-email'
										type='email'
										required
										placeholder='voce@exemplo.com'
										aria-describedby='a11y-email-hint'
										className='h-9 flex-1 rounded border border-black/25 bg-white px-3 text-[0.85em] text-[#111827] outline-none placeholder:text-black/35 focus-visible:border-[#1445c9] focus-visible:ring-2 focus-visible:ring-[#1445c9]/30'
									/>

									<button
										type='submit'
										className='h-9 rounded border-2 border-black bg-[#205bff] px-4 text-[0.8em] font-medium text-white transition-transform focus-visible:ring-2 focus-visible:ring-[#1445c9] focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px'
									>
										Inscrever
									</button>
								</div>

								<p className='mt-2 text-[0.72em] opacity-60'>
									O botão funciona com teclado: Tab para focar, Enter para enviar.
								</p>
							</form>
						</article>
					</div>

					{prefs.ruler && rulerY !== null && (
						<div
							aria-hidden
							className='pointer-events-none absolute inset-x-0 border-y-2 border-[#205bff] bg-[#205bff]/12'
							style={{ top: rulerY, height: rulerHeight }}
						/>
					)}
				</div>

				<p className='text-muted-foreground mt-2 text-[11px] leading-snug'>
					As preferências são salvas em <code>localStorage</code> e sobrevivem ao reload. A régua
					responde ao ponteiro; leitura e comandos usam as APIs nativas do navegador.
				</p>
			</div>
		</div>
	);
}
