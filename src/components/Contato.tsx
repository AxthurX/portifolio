'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
	type CSSProperties,
	type FormEvent,
	type JSX,
	type ReactNode,
	useState,
} from 'react';

const WA_NUMBER = '5569981162676';

const CREAM = '#f4f4f0';
const INK = '#1a1a1a';
const INK_GHOST = 'rgba(26,26,26,0.12)';

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

const iClass =
	'w-full border-b bg-transparent py-3 text-base font-light placeholder:opacity-30 transition-all duration-300 focus:outline-none';

const iStyle: CSSProperties = {
	borderColor: INK_GHOST,
	color: INK,
};

const iFocusStyle: CSSProperties = {
	borderColor: INK,
};

interface FieldProps {
	label: string;
	id: string;
	children: ReactNode;
}

function Field({ label, id, children }: FieldProps) {
	return (
		<div className='flex flex-col gap-1.5'>
			<label
				htmlFor={id}
				className='font-black text-[10px] uppercase tracking-[0.25em]'
				style={{
					color: `${INK}55`,
				}}
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
	const [focused, setFocused] = useState(false);

	return (
		<input
			id={id}
			className={iClass}
			style={{
				...iStyle,
				...(focused ? iFocusStyle : {}),
			}}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
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
	const [focused, setFocused] = useState(false);

	return (
		<textarea
			id={id}
			rows={rows}
			className={`${iClass} resize-none leading-relaxed`}
			style={{
				...iStyle,
				...(focused ? iFocusStyle : {}),
			}}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			{...rest}
		/>
	);
}

const BUDGETS = ['< R$ 5k', 'R$ 5–15k', 'R$ 15–50k', 'R$ 50k+'];

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
					className='rounded-full border px-4 py-2 font-semibold text-xs tracking-wide transition-all duration-200'
					style={
						value === b
							? { background: INK, color: CREAM, borderColor: INK }
							: {
									background: 'transparent',
									color: INK,
									borderColor: INK_GHOST + 'aa',
								}
					}
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
			className='flex w-full cursor-pointer items-center gap-3 rounded-full px-8 py-4 font-semibold text-sm tracking-wide transition-colors disabled:opacity-50 sm:w-fit'
			style={{ background: INK, color: CREAM }}
		>
			{sending ? 'Abrindo WhatsApp…' : label}
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
		<form onSubmit={submit} className='flex w-full max-w-lg flex-col gap-7'>
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
					placeholder='Descreva o projeto, objetivos e prazo…'
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
		title: 'Start a project',
		sub: 'Sales funnel',
		headline: 'Vamos construir algo extraordinário.',
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
			className='relative w-full'
			style={{
				background: CREAM,
				color: INK,
				borderRadius: '1.75rem',
				marginTop: '3rem',
			}}
		>
			<div className='px-8 pt-8 md:px-12'>
				<span
					className='font-black text-[9px] uppercase tracking-[0.35em]'
					style={{
						color: `${INK}44`,
					}}
				>
					{selected && funnel ? `Contact / ${funnel.title}` : 'Contact'}
				</span>
			</div>

			<div className='px-8 pt-10 pb-16 md:px-12 md:pb-24'>
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
						className='mb-10 md:mb-16'
					>
						<h2
							className='leading-[0.88] tracking-[-0.04em]'
							style={{
								fontSize: 'clamp(2.8rem, 9.5vw, 8.5rem)',
								color: INK,
								fontWeight: 900,
							}}
						>
							{selected && funnel ? funnel.title : "Let's talk."}
						</h2>

						{selected && funnel && (
							<p
								className='mt-4 font-light text-base md:text-lg'
								style={{
									color: `${INK}66`,
								}}
							>
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
								className='mb-12 max-w-xs font-light text-sm md:mb-16 md:text-base'
								style={{
									color: `${INK}66`,
								}}
							>
								Escolha como podemos te ajudar.
							</motion.p>

							<nav
								className='flex flex-col'
								style={{
									borderTop: `1px solid ${INK_GHOST}`,
								}}
							>
								{FUNNELS.map((funnelItem, index) => (
									<motion.button
										key={funnelItem.id}
										{...slideUp(0.1 + index * 0.07)}
										type='button'
										onClick={() => setSelected(funnelItem.id)}
										className='group flex items-center justify-between text-left transition-all duration-500 hover:pl-3 md:hover:pl-6'
										style={{
											padding: '1.5rem 0',
											borderBottom: `1px solid ${INK_GHOST}`,
										}}
									>
										<div className='flex items-baseline gap-4 md:gap-8'>
											<span
												className='shrink-0 font-black font-mono text-xs tabular-nums'
												style={{
													color: `${INK}33`,
												}}
											>
												{funnelItem.n}
											</span>

											<div className='flex flex-col sm:flex-row sm:items-baseline sm:gap-5'>
												<span
													className='leading-none tracking-tight transition-colors duration-300 group-hover:text-primary'
													style={{
														fontSize: 'clamp(1.5rem, 4.5vw, 3.25rem)',
														color: INK,
														fontWeight: 900,
													}}
												>
													{funnelItem.title}
												</span>

												<span
													className='hidden font-black text-[10px] uppercase tracking-[0.25em] sm:inline'
													style={{
														color: `${INK}33`,
													}}
												>
													{funnelItem.sub}
												</span>
											</div>
										</div>

										<div
											className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110'
											style={{
												borderColor: INK_GHOST,
												background: 'transparent',
											}}
										>
											<ArrowRight
												className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5'
												style={{
													color: INK,
												}}
												strokeWidth={1.5}
											/>
										</div>
									</motion.button>
								))}
							</nav>
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
								className='group mb-12 flex items-center gap-2 font-semibold text-sm'
								style={{
									color: `${INK}60`,
								}}
								whileHover={{
									x: -4,
									color: INK,
								}}
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
		</section>
	);
}
