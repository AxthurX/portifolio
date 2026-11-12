'use client';

import axios from 'axios';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Asterisk, Info } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { PLAYGROUND_DEMOS } from './registry';
import { Accessibility } from '../Accessibility';
import { AccessibilityProvider } from '../Accessibility/components/accessibility-context';

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

			<header className='sticky top-0 z-50 w-full border-black border-b-2 bg-base-100/85 backdrop-blur-xl dark:border-white'>
				<div className='mx-auto flex w-full max-w-430 items-center justify-between gap-4 px-4 py-3 md:px-8'>
					<Link href='/' className='group flex items-center gap-3'>
						<span className='flex h-9 w-9 items-center justify-center rounded-base border-2 border-black bg-primary font-bold text-primary-content text-xs shadow-light transition-transform group-hover:-translate-y-0.5 dark:border-white dark:shadow-dark'>
							AM
						</span>

						<span>
							<span className='block font-medium text-sm leading-none'>Playground</span>
							<span className='mt-1 block font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]'>
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
							className='flex h-9 w-9 items-center justify-center rounded-base border-2 border-black bg-base-100 text-foreground shadow-light transition-all hover:bg-primary hover:text-primary-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none dark:border-white dark:shadow-dark'
						>
							<Asterisk className='h-4 w-4' />
						</button>

						<Link
							href='/'
							className='flex h-9 items-center gap-1.5 rounded-base border-2 border-black bg-base-100 px-3 font-medium text-xs shadow-light transition-all hover:bg-primary hover:text-primary-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none dark:border-white dark:shadow-dark'
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
						<p className='mb-2 font-medium text-primary text-xs uppercase tracking-[0.24em]'>
							Laboratório
						</p>

						<h1 className='font-bold text-4xl leading-[1.05] tracking-tight md:text-5xl'>
							Coisas que{' '}
							<span className='font-normal font-serif text-primary italic dark:text-primary'>
								rodam
							</span>
							.
						</h1>

						<p className='mt-3 text-muted-foreground text-sm leading-relaxed'>
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
										'group flex min-w-[248px] shrink-0 items-start gap-3 rounded-base border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:w-full lg:min-w-0',
										isActive
											? 'border-black bg-primary text-primary-content shadow-light dark:border-white dark:shadow-dark'
											: 'border-black/15 bg-base-100 text-foreground hover:-translate-y-0.5 hover:border-black hover:shadow-light dark:border-white/15 dark:hover:border-white dark:hover:shadow-dark',
									)}
								>
									<span
										className={cn(
											'flex h-10 w-10 shrink-0 items-center justify-center rounded-base border-2',
											isActive
												? 'border-white/40 bg-white/15'
												: 'border-black/10 bg-base-200 dark:border-white/15 dark:bg-white/5',
										)}
									>
										<Icon className='h-4 w-4' />
									</span>

									<span className='min-w-0 flex-1'>
										<span className='flex items-center gap-2'>
											<span className='font-mono text-[10px] opacity-60'>{demo.index}</span>
											<span className='truncate font-semibold text-sm'>{demo.title}</span>
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

					<div className='hidden rounded-base border border-black/10 bg-base-200/50 p-4 text-muted-foreground text-xs leading-relaxed dark:border-white/15'>
						<p className='mb-1 flex items-center gap-1.5 font-medium text-foreground'>
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
							<p className='font-mono text-[10px] text-muted-foreground uppercase tracking-[0.22em]'>
								{active.index} — {active.kicker}
							</p>

							<h2
								id='demo-title'
								className='mt-1 font-bold text-2xl tracking-tight md:text-3xl'
							>
								{active.title}
							</h2>

							<p className='mt-1 max-w-2xl text-muted-foreground text-sm leading-relaxed'>
								{active.description}
							</p>
						</div>

						<div className='flex flex-wrap gap-1.5'>
							{active.tags.map((tag) => (
								<span
									key={tag}
									className='rounded-full border border-black/15 px-2.5 py-1 text-[10px] text-muted-foreground uppercase tracking-wider dark:border-white/20'
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div className='overflow-hidden rounded-box border-2 border-black bg-base-100 shadow-light dark:border-white dark:shadow-dark'>
						<div className='flex items-center justify-between gap-3 border-black border-b-2 bg-base-200/60 px-4 py-2 dark:border-white'>
							<div className='flex items-center gap-1.5' aria-hidden>
								<span className='h-2.5 w-2.5 rounded-full border border-black bg-error dark:border-white' />
								<span className='h-2.5 w-2.5 rounded-full border border-black bg-warning dark:border-white' />
								<span className='h-2.5 w-2.5 rounded-full border border-black bg-success dark:border-white' />
							</div>

							<span className='truncate font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]'>
								/{active.id} — preview ao vivo
							</span>

							<span className='flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground uppercase tracking-wider'>
								<span className='h-1.5 w-1.5 animate-pulse rounded-full bg-success' />
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

					<p className='flex items-start gap-1.5 text-[11px] text-muted-foreground leading-snug'>
						<Info className='mt-0.5 h-3 w-3 shrink-0' />
						<span>
							Demos reais sem dependência de servidor. A demo de acessibilidade persiste preferências
							em <code className='font-mono'>localStorage</code>; o editor vive na sessão.
						</span>
					</p>
				</section>
			</main>
		</div>
	);
}
