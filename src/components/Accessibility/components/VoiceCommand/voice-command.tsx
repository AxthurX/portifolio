'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Markup } from 'interweave';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { useIsMobile } from '@/lib/use-mobile';
import { useAccessibility } from '../accessibility-context';
import type { Key } from '../items';
import {
	ACCESSIBILITY,
	ACCESSIBILITY_FEATURES,
	type AccessibilityFeatures,
	COMMANDS,
} from './commands-map';
import { clickElement, fillInput } from './voice-utils';
import { useWebSpeech } from './web-speech';

const featureToAction = Object.entries(ACCESSIBILITY).reduce(
	(acc, [groupKey, phrases]) => {
		const rule = ACCESSIBILITY_FEATURES[groupKey];
		if (rule) {
			phrases.forEach((phrase) => {
				acc[phrase] = rule;
			});
		}
		return acc;
	},
	{} as Record<string, AccessibilityFeatures>,
);

const commandLookUp = Object.entries(COMMANDS).reduce(
	(acc, [key, phrases]) => {
		phrases.forEach((phrase) => {
			acc[phrase] = key;
		});
		return acc;
	},
	{} as Record<string, string>,
);

export function VoiceCommand() {
	const isMobile = useIsMobile();
	const { settings, updateSetting, voiceResetSettings, toggleMenu, setVoiceCommandStatus } =
		useAccessibility();
	const enabled = settings['voice-command'] === 'enable';
	const route = useRouter();
	const feedback_timer_ref = useRef<NodeJS.Timeout | null>(null);

	const isOnLeft = settings.position === 'left';

	const toggleNextOption = (key: string, options: string[]) => {
		const current_value = settings[key] || options[0];
		const current_index = options.indexOf(current_value);
		const next_index = (current_index + 1) % options.length;

		updateSetting(key as Key, options[next_index]); //
	};

	const handleCommandProcessed = (rawText: string) => {
		const cmd = rawText.toLowerCase().trim();
		const action_key = commandLookUp[cmd];
		if (feedback) dispatchFeedback(null);

		// CLICAR EM [ALVO]
		if (cmd.startsWith('clicar em')) {
			feedback && setFeedback(null);
			clickElement.search(cmd.replace('clicar em', '').trim(), undefined, dispatchFeedback);
			return;
		}

		// DIGITAR [TEXTO]
		else if (cmd.startsWith('digitar')) {
			feedback && setFeedback(null);
			const text = cmd.replace('digitar', '').trim();
			if (
				document.activeElement instanceof HTMLInputElement ||
				document.activeElement instanceof HTMLTextAreaElement
			) {
				fillInput(document.activeElement, text);
			}
		}

		// ATIVAR [FUNÇÃO]
		else if (cmd.startsWith('ativar')) {
			feedback && setFeedback(null);
			const feature = cmd.replace('ativar', '').trim();
			const rule = featureToAction[feature];

			if (rule) {
				if (rule.action === 'cycle' && rule.values) toggleNextOption(rule.setting, rule.values);
				else if (rule.action === 'enable') updateSetting(rule.setting as Key, 'enable');
				else if (rule.action === 'set' && rule.value)
					updateSetting(rule.setting as Key, rule.value);
			} else {
				dispatchFeedback(`Função não reconhecida: ${feature}`, false);
			}
			return;
		}

		// DESATIVAR [FUNÇÃO]
		else if (cmd.startsWith('desativar')) {
			feedback && setFeedback(null);
			const feature = cmd.replace('desativar', '').trim();

			if (ACCESSIBILITY.VOICE_COMMAND.includes(feature)) {
				setVoiceCommandStatus(false);
				return;
			}

			const rule = featureToAction[feature];
			if (rule) {
				const defaults: Record<string, string> = {
					saturation: '100%',
					text: '16',
					contrast: 'sedam',
					alignment: 'none',
					spacing: 'normal',
					height: 'normal',
					font: "'AmsiPro', sans-serif",
					cursor: 'cursor',
				};

				const valueToSet = defaults[rule.setting] || 'disable';
				updateSetting(rule.setting as Key, valueToSet);
			} else {
				dispatchFeedback(`Função não reconhecida: ${feature}`, false);
			}
			return;
		}

		// OUTROS COMANDOS
		else if (action_key && commandActions[action_key]) {
			commandActions[action_key]();
			return;
		}

		// NÃO RECONHECIDO
		else {
			dispatchFeedback(`Comando não reconhecido: ${cmd}`, false);
		}
	};

	const { transcript, setFeedback, feedback, isListening } = useWebSpeech(
		enabled,
		handleCommandProcessed,
	);

	const dispatchFeedback = useCallback(
		(message: string | null, isPersistent = false) => {
			if (feedback_timer_ref.current) {
				clearTimeout(feedback_timer_ref.current);
				feedback_timer_ref.current = null;
			}
			setFeedback(message);

			if (message && !isPersistent) {
				feedback_timer_ref.current = setTimeout(() => {
					setFeedback(null);
				}, 4000);
			}
		},
		[setFeedback],
	);

	const commandActions: Record<string, () => void> = useMemo(
		() => ({
			NAVIGATION: () => {
				clickElement.search('Navegação', '[role="tab"]', dispatchFeedback);
			},
			ACCESSIBILITY: () => {
				clickElement.search('acessibilidade', '[role="tab"]', dispatchFeedback);
			},
			HOME: () => route.push('/'),
			SCROLL_DOWN: () => window.scrollBy({ top: window.innerHeight / 1.5, behavior: 'smooth' }),
			SCROLL_UP: () => window.scrollBy({ top: -window.innerHeight / 1.5, behavior: 'smooth' }),
			GO_TOP: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
			GO_BOTTOM: () =>
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: 'smooth',
				}),
			FORWARD: () => window.history.forward(),
			BACK: () => window.history.back(),
			NEXT: () => clickElement.next(dispatchFeedback),
			PREVIOUS: () => clickElement.previous(dispatchFeedback),
			CONFIRM: () => clickElement.confirm(dispatchFeedback),
			CLEAR_INPUT: () => {
				if (
					document.activeElement instanceof HTMLInputElement ||
					document.activeElement instanceof HTMLTextAreaElement
				) {
					fillInput(document.activeElement, '');
				}
			},
			OPEN_ACCESSIBILITY: () => toggleMenu(true),
			CLOSE_ACCESSIBILITY: () => toggleMenu(false),
			RESET_ACCESSIBILITY: () => voiceResetSettings(),
			CLOSE_VOICE: () => setVoiceCommandStatus(false),
			MOVE_LEFT: () => updateSetting('position', 'left'),
			MOVE_RIGHT: () => updateSetting('position', 'right'),
		}),
		[dispatchFeedback, route, toggleMenu, voiceResetSettings, setVoiceCommandStatus, updateSetting],
	);

	if (!enabled) return null;

	return (
		<div className='fixed z-50'>
			<VoiceCommandUI
				transcript={transcript}
				onClose={() => setVoiceCommandStatus(false)}
				feedback={feedback}
				isOnLeft={isOnLeft}
				isMobile={isMobile}
				isListening={isListening}
			/>
		</div>
	);
}

interface VoiceCommandUIProps {
	transcript: string;
	onClose: () => void;
	feedback: string | null;
	isOnLeft: boolean;
	isMobile: boolean;
	isListening: boolean;
}

function VoiceCommandUI({
	transcript,
	feedback,
	onClose,
	isOnLeft,
	isMobile,
	isListening,
}: VoiceCommandUIProps) {
	return (
		<div
			className={`${isMobile ? 'left-[50%]' : isOnLeft ? 'right-4 translate-x-0' : 'left-4'} fixed bottom-8 z-999999 flex w-full max-w-113 flex-col px-4 transition-all duration-300 ${isOnLeft || isMobile ? '-translate-x-1/2' : ''}`}
		>
			{feedback && (
				<div className='slide-in-from-bottom-4 animate-in text-primary-content z-99999 mb-2 flex w-full text-center text-sm'>
					<div className='border-accent bg-base-100 text-base-content w-full rounded-xl border px-2 py-2'>
						<Markup content={feedback} allowAttributes={true} allowElements={true} />
					</div>
				</div>
			)}
			<div className='fade-in slide-in-from-bottom-4 animate-in border-accent bg-base-100 rounded-xl border shadow duration-300'>
				<div className='from-primary/85 to-primary text-primary-content flex w-full items-center justify-between rounded-xl bg-linear-to-br px-4 py-2'>
					<div className='flex items-center gap-2'>
						<span className='text-sm font-semibold'>Comando de voz</span>
					</div>
					<X className='size-4 cursor-pointer hover:opacity-70' onClick={onClose} />
				</div>

				<div className='flex flex-col p-4'>
					<div>
						<Tabs defaultValue='navegacao' className='w-full'>
							<TabsList className='grid w-full grid-cols-2'>
								<TabsTrigger
									value='navegacao'
									className='bg-base-200 text-base-content/70 data-[state="active"]:from-primary/85 data-[state="active"]:to-primary data-[state="active"]:text-secondary-content flex flex-col rounded-l-lg p-2 data-[state="active"]:bg-linear-to-br data-[state="active"]:font-semibold'
								>
									<div className='text-xs uppercase opacity-70'>(Aba de)</div>
									<div>Navegação</div>
								</TabsTrigger>
								<TabsTrigger
									value='acessibilidade'
									className='bg-base-200 text-base-content/70 data-[state="active"]:from-primary/85 data-[state="active"]:to-primary data-[state="active"]:text-secondary-content flex flex-col rounded-r-lg p-2 data-[state="active"]:bg-linear-to-br data-[state="active"]:font-semibold'
								>
									<div className='text-xs uppercase opacity-70'>(Aba de)</div>
									<div>Acessibilidade</div>
								</TabsTrigger>
							</TabsList>

							<TabsContent value='navegacao' className='grid grid-cols-2 pt-4'>
								<ul className='flex flex-col gap-2 px-6 pb-5'>
									<li>Página Inicial </li>
									<li>
										Descer <span className='text-base-content/50'>(página)</span>{' '}
									</li>
									<li>
										Subir <span className='text-base-content/50'>(página)</span>{' '}
									</li>
									<li>
										<span className='text-base-content/50'>(Ir ao)</span> Topo / Final
									</li>
									<li>
										Avançar <span className='text-base-content/50'>(página)</span>
									</li>
									<li>
										Voltar <span className='text-base-content/50'>(página)</span>
									</li>
								</ul>
								<ul className='border-accent/30 mb-5 flex flex-col gap-2 border-l px-4'>
									<li>
										Clicar em... <span className='text-base-content/50'>[alvo]</span>
									</li>
									<li>
										Próximo <span className='text-base-content/50'>(item)</span>
									</li>
									<li>
										<span className='text-base-content/50'>(Item)</span> Anterior
									</li>
									<li>Confirmar </li>
									<li>
										Digitar... <span className='text-base-content/50'>[texto]</span>
									</li>
									<li>Limpar campo </li>
								</ul>
							</TabsContent>

							<TabsContent value='acessibilidade' className='grid grid-cols-2 pt-4'>
								<ul className='col-span-1 flex flex-col justify-between gap-2 px-6 pb-5'>
									<li className='leading-tight'>Abrir menu de acessibilidade</li>
									<li className='leading-tight'>Fechar menu de acessibilidade</li>
									<li className='leading-tight'>Redefinir opções de acessibilidade</li>
								</ul>
								<ul className='border-accent/30 mb-5 flex flex-col justify-between gap-2 border-l px-4'>
									<li className='leading-tight'>
										Ativar... <span className='text-base-content/50'>[função]</span>
									</li>
									<li className='leading-tight'>
										Desativar... <span className='text-base-content/50'>[função]</span>
									</li>
									<li className='leading-tight'>Mover para esquerda</li>
									<li className='leading-tight'>Mover para direita</li>
								</ul>
							</TabsContent>
						</Tabs>
					</div>
					<div className='border-accent/30 bg-base-200/50 text-base-content relative flex min-h-12 w-full items-center rounded-lg border p-3 align-middle italic shadow-inner'>
						{isListening ? (
							<div className='flex flex-row items-center justify-start space-x-1 px-2'>
								<div className='bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full delay-75' />
								<div className='bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full delay-150' />
								<div className='bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full delay-300' />
							</div>
						) : (
							transcript || 'Diga um comando...'
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
