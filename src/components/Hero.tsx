'use client';

import { motion, type Transition } from 'framer-motion';
import { ArrowDownRight, Mail } from 'lucide-react';

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

function LinkedinIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

import Link from 'next/link';
import { useRef } from 'react';

export default function Hero() {
	const sectionRef = useRef<HTMLElement | null>(null);

	const transition: Transition = {
		duration: 1,
		ease: [0.16, 1, 0.3, 1],
	};

	const wordReveal = (delay = 0) => ({
		initial: {
			y: '110%',
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
		},
		transition: {
			...transition,
			delay,
		},
	});

	const fadeIn = (delay = 0) => ({
		initial: {
			opacity: 0,
			y: 16,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		transition: {
			duration: 0.8,
			ease: [0.16, 1, 0.3, 1],
			delay,
		},
	});

	return (
		<motion.section
			ref={sectionRef}
			initial='hidden'
			animate='visible'
			className='relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 py-8 md:px-12 lg:px-20'
		>
			{/* Subtle gradient background */}
			<div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5' />
			
			{/* Grid pattern overlay */}
			<div 
				className='pointer-events-none absolute inset-0 opacity-[0.02]'
				style={{
					backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
						linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
					backgroundSize: '64px 64px'
				}}
			/>

			{/* TOP - Profile */}
			<motion.div
				{...fadeIn(0.2)}
				className='relative z-10 flex items-center justify-between pt-20'
			>
				<div className='flex items-center gap-4'>
					<div className='flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface'>
						<span className='text-gradient font-bold text-lg'>AM</span>
					</div>

					<div>
						<p className='font-medium text-foreground'>Arthur Martins</p>
						<p className='text-muted-foreground text-sm'>
							Fullstack Developer
						</p>
					</div>
				</div>

				{/* Social Links */}
				<div className='hidden items-center gap-3 md:flex'>
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
						<LinkedinIcon className='h-4 w-4' />
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

			{/* CENTER - Main Content */}
			<div className='relative z-10 flex flex-1 flex-col justify-center py-12 md:py-16'>
				{/* MOBILE */}
				<div className='flex flex-col md:hidden'>
					<motion.p
						{...fadeIn(0.1)}
						className='mb-4 font-medium text-primary text-sm uppercase tracking-widest'
					>
						Fullstack Developer
					</motion.p>

					{['Crafting', 'Digital', 'Experiences'].map((word, index) => (
						<div key={word} className='overflow-hidden'>
							<motion.h1
								{...wordReveal(0.15 + index * 0.1)}
								className='font-bold text-[13vw] uppercase leading-[0.9] tracking-tight'
							>
								{word}
							</motion.h1>
						</div>
					))}

					<motion.p
						{...fadeIn(0.6)}
						className='mt-8 max-w-md text-muted-foreground text-base leading-relaxed'
					>
						Desenvolvedor fullstack com foco em experiencias digitais premium, 
						performance e animacoes modernas.
					</motion.p>

					<motion.div {...fadeIn(0.8)} className='mt-10 flex gap-4'>
						<Link
							href='#cases'
							className='flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25'
						>
							Ver projetos
							<ArrowDownRight className='h-4 w-4' />
						</Link>

						<Link
							href='#contato'
							className='rounded-full border border-border px-6 py-3 font-medium text-sm transition-all hover:border-foreground hover:bg-foreground hover:text-background'
						>
							Contato
						</Link>
					</motion.div>
				</div>

				{/* DESKTOP */}
				<div className='hidden flex-col md:flex'>
					<motion.p
						{...fadeIn(0.1)}
						className='mb-6 font-medium text-primary text-xs uppercase tracking-[0.3em]'
					>
						Fullstack Developer / Porto Velho, Brasil
					</motion.p>

					{/* LINE 1 */}
					<div className='overflow-hidden'>
						<motion.h1
							{...wordReveal(0.15)}
							className='font-bold text-[7vw] uppercase leading-[0.9] tracking-tight xl:text-[6.5vw]'
						>
							Crafting Digital
						</motion.h1>
					</div>

					{/* LINE 2 */}
					<div className='flex items-end gap-6 overflow-hidden'>
						<motion.h1
							{...wordReveal(0.25)}
							className='font-bold text-[7vw] uppercase leading-[0.9] tracking-tight xl:text-[6.5vw]'
						>
							Experiences
						</motion.h1>

						<motion.span
							{...wordReveal(0.35)}
							className='mb-2 font-serif text-[5vw] text-primary italic leading-none xl:text-[4.5vw]'
						>
							with code
						</motion.span>
					</div>

					{/* Description */}
					<motion.p
						{...fadeIn(0.5)}
						className='mt-12 max-w-lg text-lg text-muted-foreground leading-relaxed'
					>
						Desenvolvedor fullstack com foco em interfaces modernas, performance 
						e animacoes imersivas. Especializado em React, Next.js e TypeScript.
					</motion.p>

					{/* CTAs */}
					<motion.div {...fadeIn(0.7)} className='mt-10 flex items-center gap-6'>
						<Link
							href='#cases'
							className='group flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25'
						>
							Ver projetos
							<ArrowDownRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5' />
						</Link>

						<Link
							href='#contato'
							className='rounded-full border border-border px-8 py-4 font-medium transition-all hover:border-foreground hover:bg-foreground hover:text-background'
						>
							Entre em contato
						</Link>
					</motion.div>
				</div>
			</div>

			{/* BOTTOM - Scroll indicator */}
			<motion.div
				{...fadeIn(1)}
				className='relative z-10 flex items-center justify-between'
			>
				<p className='text-muted-foreground text-xs uppercase tracking-widest'>
					Scroll para explorar
				</p>

				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					className='flex h-12 w-6 items-start justify-center rounded-full border border-border p-2'
				>
					<div className='h-2 w-1 rounded-full bg-primary' />
				</motion.div>
			</motion.div>
		</motion.section>
	);
}
