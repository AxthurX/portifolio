'use client';

import axios from 'axios';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Asterisk, Info } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Accessibility } from '../Accessibility';
import { AccessibilityProvider } from '../Accessibility/components/accessibility-context';
import { PLAYGROUND_DEMOS } from './registry';

function readHashId() {
	if (typeof window === 'undefined') return null;

	const id = window.location.hash.replace('#', '');

	return PLAYGROUND_DEMOS.some((demo) => demo.id === id) ? id : null;
}

export function PlaygroundShell() {
	const reduceMotion = useReducedMotion();
	const [activeId, setActiveId] = useState(PLAYGROUND_DEMOS[0].id);

	useEffect(() => {
		const sync = () => {
			const id = readHashId();

			if (id) setActiveId(id);
		};

		sync();
		window.addEventListener('hashchange', sync);

		return () => window.removeEventListener('hashchange', sync);
	}, []);

	const handleSelect = (id: string) => {
		setActiveId(id);
		window.history.replaceState(null, '', `#${id}`);
	};

	const toggleTheme = async () => {
		const current = document.documentElement.getAttribute('data-theme') || 'arthur';
		const next = current === 'arthur' ? 'black' : 'arthur';

		document.documentElement.setAttribute('data-theme', next);
		await axios.post('/api/theme', { theme: next });
	};

	const active = PLAYGROUND_DEMOS.find((demo) => demo.id === activeId) ?? PLAYGROUND_DEMOS[0];
	const ActiveDemo = active.Demo;

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<AccessibilityProvider>
				<Accessibility />
			</AccessibilityProvider>

			<header className='bg-base-100/85 sticky top-0 z-50 w-full border-b-2 border-black backdrop-blur-xl dark:border-white'>
				<div className='mx-auto flex w-full max-w-430 items-center justify-between gap-4 px-4 py-3 md:px-8'>
					<Link href='/' className='group flex items-center gap-3'>
						<span className='rounded-base bg-primary text-primary-content shadow-light dark:shadow-dark flex h-9 w-9 items-center justify-center border-2 border-black text-xs font-bold transition-transform group-hover:-translate-y-0.5 dark:border-white'>
							AM
						</span>

						<span>
							<span className='block text-sm leading-none font-medium'>Playground</span>
							<span className='text-muted-foreground mt-1 block font-mono text-[10px] tracking-[0.18em] uppercase'>
								Arthur Martins
							</span>
						</span>
					</Link>

					<div className='flex items-center gap-2'>
						<button
							type='button'
							onClick={toggleTheme}
							aria-label='Alternar tema'
							title='Alternar tema'
							className='rounded-base bg-base-100 text-foreground shadow-light hover:bg-primary hover:text-primary-content focus-visible:ring-primary active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark flex h-9 w-9 items-center justify-center border-2 border-black transition-all focus-visible:ring-2 focus-visible:outline-none active:shadow-none dark:border-white'
						>
							<Asterisk className='h-4 w-4' />
						</button>

						<Link
							href='/'
							className='rounded-base bg-base-100 shadow-light hover:bg-primary hover:text-primary-content focus-visible:ring-primary active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark flex h-9 items-center gap-1.5 border-2 border-black px-3 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:outline-none active:shadow-none dark:border-white'
						>
							<ArrowLeft className='h-3.5 w-3.5' />
							<span className='max-sm:hidden'>Voltar</span>
						</Link>
					</div>
				</div>
			</header>

			<main className='mx-auto grid w-full max-w-430 flex-1 gap-8 px-4 py-8 md:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10 lg:py-12'>
				<aside className='flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start'>
					<div>
						<p className='text-primary mb-2 text-xs font-medium tracking-[0.24em] uppercase'>
							Laboratório
						</p>

						<h1 className='text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl'>
							Coisas que{' '}
							<span className='text-primary dark:text-primary font-serif font-normal italic'>
								rodam
							</span>
							.
						</h1>

						<p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
							Componentes e experimentos que construí, abertos para teste — não são prints. Mexa nos
							controles, quebre as coisas, recarregue.
						</p>
					</div>

					<nav
						aria-label='Demonstrações'
						className='flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0'
					>
						{PLAYGROUND_DEMOS.map((demo) => {
							const isActive = demo.id === active.id;
							const Icon = demo.icon;

							return (
								<button
									key={demo.id}
									type='button'
									onClick={() => handleSelect(demo.id)}
									aria-current={isActive ? 'true' : undefined}
									className={cn(
										'group rounded-base focus-visible:ring-primary flex min-w-62 shrink-0 items-start gap-3 border-2 p-3 text-left transition-all focus-visible:ring-2 focus-visible:outline-none lg:w-full lg:min-w-0',
										isActive
											? 'bg-primary text-primary-content shadow-light dark:shadow-dark border-black dark:border-white'
											: 'bg-base-100 text-foreground hover:shadow-light dark:hover:shadow-dark border-black/15 hover:-translate-y-0.5 hover:border-black dark:border-white/15 dark:hover:border-white',
									)}
								>
									<span
										className={cn(
											'rounded-base flex h-10 w-10 shrink-0 items-center justify-center border-2',
											isActive
												? 'border-white/40 bg-white/15'
												: 'bg-base-200 border-black/10 dark:border-white/15 dark:bg-white/5',
										)}
									>
										<Icon className='h-4 w-4' />
									</span>

									<span className='min-w-0 flex-1'>
										<span className='flex items-center gap-2'>
											<span className='font-mono text-[10px] opacity-60'>{demo.index}</span>
											<span className='truncate text-sm font-semibold'>{demo.title}</span>
										</span>

										<span
											className={cn(
												'mt-0.5 block text-[11px] leading-snug',
												isActive ? 'text-primary-content/80' : 'text-muted-foreground',
											)}
										>
											{demo.kicker}
										</span>
									</span>
								</button>
							);
						})}
					</nav>

					<div className='rounded-base bg-base-200/50 text-muted-foreground hidden border border-black/10 p-4 text-xs leading-relaxed dark:border-white/15'>
						<p className='text-foreground mb-1 flex items-center gap-1.5 font-medium'>
							<Info className='h-3.5 w-3.5' />
							Tudo client-side
						</p>
						Sem backend, sem mock travado: estado real no navegador. Cada demo guarda o que precisa
						durante a sessão.
					</div>
				</aside>

				<section aria-labelledby='demo-title' className='flex min-w-0 flex-col gap-4'>
					<div className='flex flex-wrap items-end justify-between gap-4'>
						<div className='min-w-0'>
							<p className='text-muted-foreground font-mono text-[10px] tracking-[0.22em] uppercase'>
								{active.index} — {active.kicker}
							</p>

							<h2 id='demo-title' className='mt-1 text-2xl font-bold tracking-tight md:text-3xl'>
								{active.title}
							</h2>

							<p className='text-muted-foreground mt-1 max-w-2xl text-sm leading-relaxed'>
								{active.description}
							</p>
						</div>

						<div className='flex flex-wrap gap-1.5'>
							{active.tags.map((tag) => (
								<span
									key={tag}
									className='text-muted-foreground rounded-full border border-black/15 px-2.5 py-1 text-[10px] tracking-wider uppercase dark:border-white/20'
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div className='rounded-box bg-base-100 shadow-light dark:shadow-dark overflow-hidden border-2 border-black dark:border-white'>
						<div className='bg-base-200/60 flex items-center justify-between gap-3 border-b-2 border-black px-4 py-2 dark:border-white'>
							<div className='flex items-center gap-1.5' aria-hidden>
								<span className='bg-error h-2.5 w-2.5 rounded-full border border-black dark:border-white' />
								<span className='bg-warning h-2.5 w-2.5 rounded-full border border-black dark:border-white' />
								<span className='bg-success h-2.5 w-2.5 rounded-full border border-black dark:border-white' />
							</div>

							<span className='text-muted-foreground truncate font-mono text-[10px] tracking-[0.18em] uppercase'>
								/{active.id} — preview ao vivo
							</span>

							<span className='text-muted-foreground flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase'>
								<span className='bg-success h-1.5 w-1.5 animate-pulse rounded-full' />
								on
							</span>
						</div>

						<div className='relative'>
							<div
								aria-hidden
								className='pointer-events-none absolute inset-0 opacity-[0.07]'
								style={{
									backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
									backgroundSize: '18px 18px',
								}}
							/>

							<div className='relative p-3 md:p-5'>
								<AnimatePresence mode='wait' initial={false}>
									<motion.div
										key={active.id}
										initial={reduceMotion ? false : { opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
										transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
									>
										<ActiveDemo />
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</div>

					<p className='text-muted-foreground flex items-start gap-1.5 text-[11px] leading-snug'>
						<Info className='mt-0.5 h-3 w-3 shrink-0' />
						<span>
							Demos reais sem dependência de servidor. A demo de acessibilidade persiste
							preferências em <code className='font-mono'>localStorage</code>; o editor vive na
							sessão.
						</span>
					</p>
				</section>
			</main>
		</div>
	);
}
