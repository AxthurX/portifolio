'use client';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Asterisk, Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const LINKS = [
	{ href: '#sobre-mim', label: 'Sobre' },
	{ href: '#projetos', label: 'Projetos' },
	{ href: '#experiencias', label: 'Experiências' },
	{ href: '#certificados', label: 'Licenças & Certificados' },
	{ href: '#contato', label: 'Contato' },
] as const;

export const CURRICULUM_URL = '/arthur-martins.pdf';

export default function Header({ onPortfolioOpen }: { onPortfolioOpen: () => void }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const [hash, setHash] = useState('');

	useEffect(() => {
		const updateActiveHash = () => {
			setHash(window.location.hash);
		};

		updateActiveHash();

		window.addEventListener('hashchange', updateActiveHash);

		return () => {
			window.removeEventListener('hashchange', updateActiveHash);
		};
	}, []);

	const handleThemeChange = async () => {
		const data_theme = document.documentElement.getAttribute('data-theme') || 'arthur';
		const theme = data_theme === 'arthur' ? 'black' : 'arthur';

		document.documentElement.setAttribute('data-theme', theme);

		await axios.post('/api/theme', { theme });
	};

	return (
		<>
			<motion.header
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
				className='fixed top-0 z-50 flex w-full max-w-400 justify-between px-4 pt-4 md:px-8 lg:px-12'
			>
				<div
					className='rounded-base shadow-light dark:shadow-dark absolute inset-x-4 top-4 flex h-16 items-center justify-between border-2 border-black backdrop-blur-xl md:inset-x-8 lg:inset-x-12 dark:border-white'
					style={{ background: 'var(--header-bg)' }}
				/>

				<div className='z-50 flex h-15 items-center gap-6 pl-5'>
					<Link
						href='/'
						className='text-base-content dark:text-primary flex items-center gap-3 transition-opacity hover:opacity-80'
					>
						<div className='rounded-base bg-primary shadow-light dark:shadow-dark flex h-8 w-8 items-center justify-center border-2 border-black dark:border-white'>
							<span className='text-primary-content text-xs font-bold'>AM</span>
						</div>

						<span className='dark:text-primary text-sm font-medium md:hidden lg:block'>
							<p className='text-foreground dark:text-base-content font-medium'>Arthur Martins</p>
							<p className='text-muted-foreground dark:text-base-content/70 text-xs'>
								Fullstack Developer
							</p>
						</span>
					</Link>

					<a
						id='curriculo'
						href={CURRICULUM_URL}
						download='Arthur-Martins-Curriculo.pdf'
						title='Baixar Currículo'
						className='rounded-base bg-base-100 text-foreground shadow-light hover:bg-primary hover:text-primary-foreground active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark hidden items-center gap-1.5 border-2 border-black px-3 py-1.5 text-xs font-medium transition-all active:shadow-none min-[1220px]:flex dark:border-white dark:bg-black/40'
					>
						<Download className='h-3 w-3' /> Currículo
					</a>
				</div>

				<nav className='absolute inset-x-0 top-4 z-10 hidden h-15 items-center justify-center py-3 md:flex'>
					<div className='rounded-base bg-base-100 shadow-light dark:shadow-dark flex items-center gap-1 border-2 border-black p-1 dark:border-white dark:bg-black/20'>
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={cn(
									'rounded-base text-base-content px-4 py-2 text-xs font-normal transition-all',
									hash === link.href && 'border-2 border-black dark:border-white',
								)}
							>
								{link.label}
							</a>
						))}

						<Link
							href='/playground'
							className='rounded-base text-base-content hover:bg-primary hover:text-primary-content border-2 border-dashed border-black px-4 py-2 text-xs font-normal transition-all hover:border-solid dark:border-white'
						>
							Playground
						</Link>
					</div>
				</nav>

				<div className='relative z-10 flex h-15 items-center gap-3 pr-3'>
					{/* <Button
						type='button'
						onClick={onPortfolioOpen}
						className='hidden items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-medium text-primary text-xs transition-all hover:bg-primary hover:text-primary-foreground sm:flex'
					>
						Portfolio
					</Button> */}

					<Button
						id='theme'
						onClick={handleThemeChange}
						className='px-6 py-4 font-medium transition-all duration-200 max-sm:px-2'
					>
						<Asterisk className='text-primary-foreground' />
					</Button>

					<Link href='#contato' className='max-lg:hidden'>
						<Button className='px-6 py-4 font-medium transition-all duration-200'>
							Entre em contato
						</Button>
					</Link>

					<button
						type='button'
						onClick={() => setMenuOpen(true)}
						className='rounded-base bg-base-100 text-foreground shadow-light hover:bg-primary hover:text-primary-foreground active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark flex h-10 w-10 items-center justify-center border-2 border-black transition-colors active:shadow-none md:hidden dark:border-white'
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
						className='bg-primary-content fixed inset-0 z-100 flex flex-col px-6 py-8'
					>
						<div className='flex items-center justify-between pb-8'>
							<div className='flex items-center gap-3'>
								<div className='rounded-base bg-primary shadow-light dark:shadow-dark flex h-10 w-10 items-center justify-center border-2 border-black dark:border-white'>
									<span className='text-primary-content text-sm font-bold'>AM</span>
								</div>
								<span className='font-medium'>Arthur Martins</span>
							</div>

							<button
								type='button'
								onClick={() => setMenuOpen(false)}
								className='rounded-base bg-base-100 text-foreground shadow-light hover:bg-primary hover:text-primary-foreground active:translate-x-boxShadowX active:translate-y-boxShadowY flex h-10 w-10 items-center justify-center border-2 border-black transition-colors active:shadow-none'
								aria-label='Fechar menu'
							>
								<X className='h-4 w-4' />
							</button>
						</div>

						<nav className='flex flex-1 flex-col justify-start gap-1'>
							<motion.button
								onClick={() => {
									setMenuOpen(false);
									onPortfolioOpen();
								}}
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.4,
									delay: 0,
									ease: [0.16, 1, 0.3, 1],
								}}
								className='hover:text-primary border-b-2 border-black py-4 text-left text-3xl font-bold tracking-tight transition-colors dark:border-white'
							>
								Portfolio
							</motion.button>

							{LINKS.map((link, i) => (
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
									className='hover:text-primary border-b-2 border-black py-4 text-left text-3xl font-bold tracking-tight transition-colors dark:border-white'
								>
									{link.label}
								</motion.a>
							))}

							<motion.a
								href='/playground'
								onClick={() => setMenuOpen(false)}
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.4,
									delay: (LINKS.length + 1) * 0.06,
									ease: [0.16, 1, 0.3, 1],
								}}
								className='text-primary hover:text-accent border-b-2 border-black py-4 text-left text-3xl font-bold tracking-tight transition-colors dark:border-white'
							>
								Playground
							</motion.a>
						</nav>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.4 }}
							className='hover:text-primary border-b-2 border-black py-4 text-left text-3xl font-bold tracking-tight transition-colors dark:border-white'
						>
							<a
								href={CURRICULUM_URL}
								download='Arthur-Martins-Curriculo.pdf'
								title='Baixar Currículo'
							>
								Baixar Currículo
							</a>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
