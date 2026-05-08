'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatedThemeToggle } from './ui/animated-theme-toggle';

const navLinks = [
	{ href: '#quem-somos', label: 'Quem Somos' },
	{ href: '#processos', label: 'Processos' },
	{ href: '#cases', label: 'Cases' },
	{ href: '#faqs', label: 'FAQs' },
	{ href: '#nosso-time', label: 'Nosso Time' },
];

export default function Header({
	onPortfolioOpen,
}: {
	onPortfolioOpen: () => void;
}) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<motion.header
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
				className='pointer-events-none fixed top-0 left-0 z-50 flex w-full items-start justify-between px-4 pt-1 md:px-8 xl:px-12'
			>
				<div
					className='pointer-events-none absolute inset-x-4 top-1 flex h-16 items-center justify-between rounded-full border border-foreground/10 backdrop-blur-md md:inset-x-8 xl:inset-x-12'
					style={{ background: 'var(--header-bg)' }}
				/>

				{/* Left - Logo */}
				<div className='pointer-events-auto relative z-10 flex h-16 cursor-pointer items-center pl-4 transition-opacity hover:opacity-80 md:pl-6 lg:pl-10'>
					<div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-foreground/5 md:h-14 md:w-14' />
				</div>

				{/* Center - Nav (Desktop only) */}
				<div className='pointer-events-none absolute inset-0 z-10 hidden md:block'>
					{/* Left Links */}
					<div className='pointer-events-auto absolute top-1 right-[calc(50%+3.5rem)] flex h-16 items-center justify-end gap-6 font-black text-[10px] uppercase tracking-widest lg:right-[calc(50%+4rem)] lg:gap-12 xl:gap-16'>
						<a
							href='#quem-somos'
							className='whitespace-nowrap text-foreground/60 transition-colors hover:text-primary'
						>
							Quem Somos
						</a>
						<a
							href='#processos'
							className='text-foreground/60 transition-colors hover:text-primary'
						>
							Processos
						</a>
					</div>
					{/* Right Links */}
					<div className='pointer-events-auto absolute top-1 left-[calc(50%+3.5rem)] flex h-16 items-center justify-start gap-6 font-black text-[10px] uppercase tracking-widest lg:left-[calc(50%+4rem)] lg:gap-12 xl:gap-16'>
						<a
							href='#cases'
							className='whitespace-nowrap text-foreground/60 transition-colors hover:text-primary'
						>
							Cases
						</a>
						<a
							href='#faqs'
							className='text-foreground/60 transition-colors hover:text-primary'
						>
							FAQs
						</a>
						<a
							href='#nosso-time'
							className='whitespace-nowrap text-foreground/60 transition-colors hover:text-primary'
						>
							Nosso Time
						</a>
					</div>
				</div>

				{/* Center Drop Button */}
				<button
					type='button'
					onClick={onPortfolioOpen}
					className='group pointer-events-auto absolute top-17 left-1/2 hidden h-12 w-22 -translate-x-1/2 flex-col items-center justify-end rounded-b-full border-foreground/10 border-x border-b pb-2 outline-none transition-colors hover:border-primary/40 md:flex'
					style={{ background: 'var(--header-bg)' }}
					aria-label='Ver portfólio'
				>
					<span className='-mt-6 mb-3 whitespace-nowrap font-black text-[10px] text-foreground/50 uppercase tracking-widest transition-colors duration-300 group-hover:text-primary'>
						VER MAIS
					</span>
				</button>

				{/* Right Actions */}
				<div className='pointer-events-auto relative z-10 flex h-16 items-center gap-2 pr-3 md:gap-4 md:pr-6'>
					<AnimatedThemeToggle />
					<a
						href='#contato'
						className='hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 font-black text-[11px] text-background uppercase tracking-wider transition-colors duration-300 hover:bg-primary sm:flex'
					>
						Trabalhe Conosco
						<span className='flex h-4 w-4 items-center justify-center rounded-full border border-background/30 text-[8px]'>
							↗
						</span>
					</a>
					{/* Hamburger — mobile only */}
					<button
						type='button'
						onClick={() => setMenuOpen(true)}
						className='flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-foreground/50 md:hidden'
						aria-label='Abrir menu'
					>
						<Menu className='h-5 w-5' />
					</button>
				</div>
			</motion.header>

			{/* Mobile Fullscreen Menu Overlay — cream in light, black in dark */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className='panel-cream fixed inset-0 z-100 flex flex-col items-start justify-center px-8'
					>
						{/* Close Button */}
						<button
							type='button'
							onClick={() => setMenuOpen(false)}
							className='absolute top-8 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-foreground/60'
							aria-label='Fechar menu'
						>
							<X className='h-5 w-5' />
						</button>

						{/* Logo */}
						<div className='absolute top-7 left-6'>
							<div className='h-12 w-12 overflow-hidden rounded-full border border-foreground/15'>
								<Image
									src='/logo-simbolo.png'
									alt='WHYS'
									width={48}
									height={48}
									className='h-full w-full object-cover'
									unoptimized
								/>
							</div>
						</div>

						{/* Nav Links — left-aligned, very large */}
						<nav className='flex w-full flex-col gap-0'>
							{/* Portfolio special button */}
							<motion.button
								onClick={() => {
									setMenuOpen(false);
									onPortfolioOpen();
								}}
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{
									duration: 0.4,
									delay: 0,
									ease: [0.16, 1, 0.3, 1],
								}}
								className='border-foreground/10 border-b py-3 text-left font-black text-5xl text-foreground tracking-tight transition-colors hover:text-primary sm:text-6xl'
							>
								Portfólio
							</motion.button>

							{navLinks.map((link, i) => (
								<motion.a
									key={link.href}
									href={link.href}
									onClick={() => setMenuOpen(false)}
									initial={{ opacity: 0, x: -30 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{
										duration: 0.4,
										delay: (i + 1) * 0.06,
										ease: [0.16, 1, 0.3, 1],
									}}
									className='border-foreground/10 border-b py-3 text-left font-black text-5xl text-foreground tracking-tight transition-colors hover:text-primary sm:text-6xl'
								>
									{link.label}
								</motion.a>
							))}
						</nav>

						{/* CTA at bottom */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4, delay: 0.45 }}
							className='absolute bottom-12'
						>
							<Link
								href='#contato'
								onClick={() => setMenuOpen(false)}
								className='flex items-center gap-3 rounded-full bg-foreground px-6 py-3 font-black text-background text-sm uppercase tracking-widest transition-colors duration-300 hover:bg-primary'
							>
								Iniciar Projeto ↗
							</Link>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
