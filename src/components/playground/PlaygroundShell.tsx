'use client';

import axios from 'axios';
import { ArrowLeft, Asterisk } from 'lucide-react';
import Link from 'next/link';
import { Accessibility } from '../accessibility';
import { AccessibilityProvider } from '../accessibility/components/accessibility-context';
import { VoiceCommand } from '../accessibility/components/VoiceCommand/voice-command';
import { StudioLab } from './StudioLab';

export function PlaygroundShell() {
	const toggleTheme = async () => {
		const current = document.documentElement.getAttribute('data-theme') || 'arthur';
		const next = current === 'arthur' ? 'black' : 'arthur';

		document.documentElement.setAttribute('data-theme', next);
		await axios.post('/api/theme', { theme: next });
	};

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<AccessibilityProvider>
				<Accessibility />
				<VoiceCommand />
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

			<main className='mx-auto flex w-full max-w-430 flex-1 flex-col gap-6 px-4 py-8 md:px-8 lg:py-8'>
				<div className='flex flex-wrap items-end justify-between gap-4'>
					<div className='min-w-0'>
						<p className='text-primary mb-2 text-xs font-medium tracking-[0.24em] uppercase'>
							Estúdio — Sandbox
						</p>

						<h1 className='text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl'>
							Coisas que{' '}
							<span className='text-primary dark:text-primary font-serif font-normal italic'>
								desenvolvi
							</span>
							.
						</h1>

						<p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
							Editor Tiptap, motor de busca (Typesense), menu de acessibilidade. As anotações
							apontam para cada peça — mexa em tudo, quebre, recarregue. Nada aqui é mock travado.
						</p>
					</div>
				</div>

				<div className='rounded-box bg-base-100 shadow-light dark:shadow-dark overflow-hidden border-2 border-black dark:border-white'>
					<div className='bg-base-200/60 flex items-center justify-between gap-3 border-b-2 border-black px-4 py-2 dark:border-white'>
						<div className='flex items-center gap-1.5' aria-hidden>
							<span className='bg-error h-2.5 w-2.5 rounded-full border border-black dark:border-white' />
							<span className='bg-warning h-2.5 w-2.5 rounded-full border border-black dark:border-white' />
							<span className='bg-success h-2.5 w-2.5 rounded-full border border-black dark:border-white' />
						</div>
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
							<StudioLab />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
