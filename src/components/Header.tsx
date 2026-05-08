'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
	{ href: '#quem-somos', label: 'Sobre' },
	{ href: '#processos', label: 'Skills' },
	{ href: '#cases', label: 'Projetos' },
	{ href: '#faqs', label: 'FAQ' },
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
				className='pointer-events-none fixed top-0 left-0 z-50 flex w-full items-start justify-between px-4 pt-4 md:px-8 lg:px-12'
			>
				{/* Backdrop */}
				<div
					className='pointer-events-none absolute inset-x-4 top-4 flex h-14 items-center justify-between rounded-full border border-border backdrop-blur-xl md:inset-x-8 lg:inset-x-12'
					style={{ background: 'var(--header-bg)' }}
				/>

				{/* Left - Logo */}
				<div className='pointer-events-auto relative z-10 flex h-14 cursor-pointer items-center pl-5'>
					<Link href='/' className='flex items-center gap-3 transition-opacity hover:opacity-80'>
						<div className='flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10'>
							<span className='text-gradient font-bold text-xs'>AM</span>
						</div>
						<span className='hidden font-medium text-sm md:block'>
							Arthur Martins
						</span>
					</Link>
				</div>

				{/* Center - Nav (Desktop only) */}
				<nav className='pointer-events-auto absolute inset-x-0 top-4 z-10 hidden h-14 items-center justify-center md:flex'>
					<div className='flex items-center gap-1 rounded-full border border-border bg-surface/50 p-1'>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className='rounded-full px-4 py-2 text-muted-foreground text-xs font-medium transition-all hover:bg-foreground/5 hover:text-foreground'
							>
								{link.label}
							</a>
						))}
					</div>
				</nav>

				{/* Right Actions */}
				<div className='pointer-events-auto relative z-10 flex h-14 items-center gap-3 pr-3'>
					<button
						type='button'
						onClick={onPortfolioOpen}
						className='hidden items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary text-xs font-medium transition-all hover:bg-primary hover:text-primary-foreground sm:flex'
					>
						Portfolio
					</button>

					<a
						href='#contato'
						className='hidden items-center gap-2 rounded-full bg-foreground px-5 py-2 text-background text-xs font-medium transition-all hover:bg-primary hover:text-primary-foreground md:flex'
					>
						Contato
					</a>

					{/* Hamburger - mobile only */}
					<button
						type='button'
						onClick={() => setMenuOpen(true)}
						className='flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground md:hidden'
						aria-label='Abrir menu'
					>
						<Menu className='h-4 w-4' />
					</button>
				</div>
			</motion.header>

			{/* Mobile Fullscreen Menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className='fixed inset-0 z-100 flex flex-col bg-background px-6 py-8'
					>
						{/* Header */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10'>
									<span className='text-gradient font-bold text-sm'>AM</span>
								</div>
								<span className='font-medium'>Arthur Martins</span>
							</div>

							<button
								type='button'
								onClick={() => setMenuOpen(false)}
								className='flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground'
								aria-label='Fechar menu'
							>
								<X className='h-4 w-4' />
							</button>
						</div>

						{/* Nav Links */}
						<nav className='flex flex-1 flex-col justify-center gap-2'>
							<motion.button
								onClick={() => {
									setMenuOpen(false);
									onPortfolioOpen();
								}}
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0, ease: [0.16, 1, 0.3, 1] }}
								className='border-border border-b py-4 text-left font-bold text-4xl tracking-tight transition-colors hover:text-primary'
							>
								Portfolio
							</motion.button>

							{navLinks.map((link, i) => (
								<motion.a
									key={link.href}
									href={link.href}
									onClick={() => setMenuOpen(false)}
									initial={{ opacity: 0, x: -30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.4,
										delay: (i + 1) * 0.06,
										ease: [0.16, 1, 0.3, 1],
									}}
									className='border-border border-b py-4 text-left font-bold text-4xl tracking-tight transition-colors hover:text-primary'
								>
									{link.label}
								</motion.a>
							))}
						</nav>

						{/* CTA */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.4 }}
						>
							<Link
								href='#contato'
								onClick={() => setMenuOpen(false)}
								className='flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-medium text-primary-foreground transition-all hover:scale-[1.02]'
							>
								Entre em contato
							</Link>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
