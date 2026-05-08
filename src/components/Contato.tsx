'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Linkedin, Mail } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
	);
}
import {
	type CSSProperties,
	type FormEvent,
	type JSX,
	type ReactNode,
	useState,
} from 'react';

const WA_NUMBER = '5569981162676';

function sendToWhatsApp(payload: Record<string, string>) {
	const text = Object.entries(payload)
		.filter(([, value]) => value)
		.map(([key, value]) => `*${key}:* ${value}`)
		.join('\n');

	window.open(
		`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
		'_blank',
	);
}

interface FieldProps {
	label: string;
	id: string;
	children: ReactNode;
}

function Field({ label, id, children }: FieldProps) {
	return (
		<div className='flex flex-col gap-2'>
			<label
				htmlFor={id}
				className='text-muted-foreground text-xs font-medium uppercase tracking-widest'
			>
				{label}
			</label>
			{children}
		</div>
	);
}

interface FInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
}

function FInput({ id, ...rest }: FInputProps) {
	return (
		<input
			id={id}
			className='w-full border-b border-border bg-transparent py-3 text-foreground text-base transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none'
			{...rest}
		/>
	);
}

interface FTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string;
	rows?: number;
}

function FTextarea({ id, rows = 4, ...rest }: FTextareaProps) {
	return (
		<textarea
			id={id}
			rows={rows}
			className='w-full resize-none border-b border-border bg-transparent py-3 text-foreground text-base leading-relaxed transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none'
			{...rest}
		/>
	);
}

const BUDGETS = ['< R$ 5k', 'R$ 5-15k', 'R$ 15-50k', 'R$ 50k+'];

interface BudgetChipsProps {
	value: string;
	onChange: (value: string) => void;
}

function BudgetChips({ value, onChange }: BudgetChipsProps) {
	return (
		<div className='flex flex-wrap gap-2 pt-2'>
			{BUDGETS.map((b) => (
				<button
					key={b}
					type='button'
					onClick={() => onChange(value === b ? '' : b)}
					className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
						value === b
							? 'border-primary bg-primary text-primary-foreground'
							: 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
					}`}
				>
					{b}
				</button>
			))}
		</div>
	);
}

interface SubmitBtnProps {
	sending: boolean;
	label?: string;
}

function SubmitBtn({ sending, label = 'Enviar via WhatsApp' }: SubmitBtnProps) {
	return (
		<motion.button
			type='submit'
			disabled={sending}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground text-sm transition-all disabled:opacity-50 sm:w-fit'
		>
			{sending ? 'Abrindo WhatsApp...' : label}
			{!sending && <ArrowUpRight className='h-4 w-4' strokeWidth={1.5} />}
		</motion.button>
	);
}

interface ProjectFormData {
	Nome: string;
	Empresa: string;
	Email: string;
	Budget: string;
	Detalhes: string;
}

function ProjectForm() {
	const [data, setData] = useState<ProjectFormData>({
		Nome: '',
		Empresa: '',
		Email: '',
		Budget: '',
		Detalhes: '',
	});

	const [sending, setSending] = useState(false);

	const handleChange =
		(key: keyof ProjectFormData) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setData((prev) => ({
				...prev,
				[key]: event.target.value,
			}));
		};

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSending(true);

		sendToWhatsApp({
			Tipo: 'Novo Projeto',
			...data,
		});

		setTimeout(() => {
			setSending(false);
		}, 1400);
	};

	return (
		<form onSubmit={submit} className='flex w-full max-w-lg flex-col gap-6'>
			<Field label='Nome' id='p-nome'>
				<FInput
					id='p-nome'
					type='text'
					placeholder='Seu nome completo'
					value={data.Nome}
					onChange={handleChange('Nome')}
					required
					autoComplete='name'
				/>
			</Field>
			<Field label='Empresa' id='p-empresa'>
				<FInput
					id='p-empresa'
					type='text'
					placeholder='Nome da empresa (opcional)'
					value={data.Empresa}
					onChange={handleChange('Empresa')}
				/>
			</Field>
			<Field label='E-mail' id='p-email'>
				<FInput
					id='p-email'
					type='email'
					placeholder='seu@email.com'
					value={data.Email}
					onChange={handleChange('Email')}
					required
					autoComplete='email'
				/>
			</Field>
			<Field label='Budget estimado' id='p-budget'>
				<BudgetChips
					value={data.Budget}
					onChange={(v) => setData((p) => ({ ...p, Budget: v }))}
				/>
			</Field>
			<Field label='Detalhes do Projeto' id='p-detalhes'>
				<FTextarea
					id='p-detalhes'
					rows={5}
					placeholder='Descreva o projeto, objetivos e prazo...'
					value={data.Detalhes}
					onChange={handleChange('Detalhes')}
					required
				/>
			</Field>
			<SubmitBtn sending={sending} label='Iniciar conversa' />
		</form>
	);
}

interface Funnel {
	id: string;
	n: string;
	title: string;
	sub: string;
	headline: string;
	Form: () => JSX.Element;
}

const FUNNELS: Funnel[] = [
	{
		id: 'project',
		n: '01',
		title: 'Iniciar Projeto',
		sub: 'Novo projeto',
		headline: 'Vamos construir algo extraordinario juntos.',
		Form: ProjectForm,
	},
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionAnim: Variants = {
	hidden: {
		opacity: 0,
		y: 28,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.65,
			ease,
		},
	},
	exit: {
		opacity: 0,
		y: -16,
		transition: {
			duration: 0.3,
			ease,
		},
	},
};

const slideUp = (delay = 0) => ({
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	transition: {
		duration: 0.55,
		ease,
		delay,
	},
});

export default function Contato() {
	const [selected, setSelected] = useState<string | null>(null);

	const funnel = FUNNELS.find((f) => f.id === selected) ?? null;

	return (
		<section
			id='contato'
			className='relative mt-8 w-full overflow-hidden rounded-3xl border border-border bg-surface'
		>
			{/* Header */}
			<div className='px-6 pt-8 md:px-12'>
				<span className='text-muted-foreground text-xs font-medium uppercase tracking-widest'>
					{selected && funnel ? `Contato / ${funnel.title}` : 'Contato'}
				</span>
			</div>

			<div className='px-6 pt-8 pb-12 md:px-12 md:pb-16'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={selected ?? 'root'}
						initial={{
							opacity: 0,
							y: 24,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						exit={{
							opacity: 0,
							y: -16,
						}}
						transition={{
							duration: 0.55,
							ease,
						}}
						className='mb-10 md:mb-12'
					>
						<h2 className='font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl'>
							{selected && funnel ? (
								funnel.title
							) : (
								<>
									{"Vamos"}{' '}
									<span className='font-serif text-primary italic font-normal'>
										conversar
									</span>
								</>
							)}
						</h2>

						{selected && funnel && (
							<p className='mt-4 text-muted-foreground text-base md:text-lg'>
								{funnel.headline}
							</p>
						)}
					</motion.div>
				</AnimatePresence>

				<AnimatePresence mode='wait'>
					{!selected ? (
						<motion.div
							key='menu'
							variants={sectionAnim}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							<motion.p
								{...slideUp(0.05)}
								className='mb-10 max-w-xs text-muted-foreground text-sm md:mb-12'
							>
								Escolha como posso te ajudar.
							</motion.p>

							<nav className='flex flex-col border-border border-t'>
								{FUNNELS.map((funnelItem, index) => (
									<motion.button
										key={funnelItem.id}
										{...slideUp(0.1 + index * 0.07)}
										type='button'
										onClick={() => setSelected(funnelItem.id)}
										className='group flex items-center justify-between border-border border-b py-5 text-left transition-all duration-500 hover:pl-4 md:py-6'
									>
										<div className='flex items-baseline gap-4 md:gap-8'>
											<span className='shrink-0 font-mono text-muted-foreground text-xs tabular-nums'>
												{funnelItem.n}
											</span>

											<div className='flex flex-col sm:flex-row sm:items-baseline sm:gap-5'>
												<span className='font-bold text-2xl tracking-tight transition-colors duration-300 group-hover:text-primary md:text-3xl'>
													{funnelItem.title}
												</span>

												<span className='hidden text-muted-foreground text-xs uppercase tracking-widest sm:inline'>
													{funnelItem.sub}
												</span>
											</div>
										</div>

										<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground'>
											<ArrowRight
												className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5'
												strokeWidth={1.5}
											/>
										</div>
									</motion.button>
								))}
							</nav>

							{/* Social Links */}
							<motion.div
								{...slideUp(0.3)}
								className='mt-10 flex items-center gap-4 border-border border-t pt-10'
							>
								<span className='text-muted-foreground text-xs uppercase tracking-widest'>
									Redes
								</span>
								<div className='flex gap-3'>
									<a
										href='https://github.com/AxthurX'
										target='_blank'
										rel='noopener noreferrer'
										className='flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-primary hover:text-primary'
										aria-label='GitHub'
									>
										<GithubIcon className='h-4 w-4' />
									</a>
									<a
										href='https://linkedin.com/in/arthurmartins'
										target='_blank'
										rel='noopener noreferrer'
										className='flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-primary hover:text-primary'
										aria-label='LinkedIn'
									>
										<Linkedin className='h-4 w-4' />
									</a>
									<a
										href='mailto:contato@arthurmartins.dev'
										className='flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-primary hover:text-primary'
										aria-label='Email'
									>
										<Mail className='h-4 w-4' />
									</a>
								</div>
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key={selected}
							variants={sectionAnim}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							<motion.button
								{...slideUp(0)}
								type='button'
								onClick={() => setSelected(null)}
								className='group mb-10 flex items-center gap-2 text-muted-foreground text-sm font-medium transition-colors hover:text-foreground'
							>
								<ArrowLeft
									className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1'
									strokeWidth={1.5}
								/>
								Voltar
							</motion.button>

							<motion.div {...slideUp(0.1)}>
								{funnel && <funnel.Form />}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Footer */}
			<div className='border-border border-t px-6 py-6 md:px-12'>
				<p className='text-muted-foreground text-xs'>
					Arthur Martins - Desenvolvedor Fullstack
				</p>
			</div>
		</section>
	);
}
