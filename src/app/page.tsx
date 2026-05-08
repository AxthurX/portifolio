'use client';

import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import Cases from '../components/Cases';
import Contato from '../components/Contato';
import Faqs from '../components/Faqs';
import Header from '../components/Header';
import Hero from '../components/Hero';
import NossoTime from '../components/NossoTime';
import PortfolioDrawer from '../components/PortfolioDrawer';
import Processos from '../components/Processos';
import QuemSomos from '../components/QuemSomos';

export default function Home() {
	const [portfolioOpen, setPortfolioOpen] = useState<boolean>(false);

	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
		});

		const raf = (time: number) => {
			lenis.raf(time);

			rafRef.current = requestAnimationFrame(raf);
		};

		rafRef.current = requestAnimationFrame(raf);

		return () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}

			lenis.destroy();
		};
	}, []);

	useEffect(() => {
		document.body.style.overflow = portfolioOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [portfolioOpen]);

	return (
		<>
			<main className='relative flex min-h-screen w-full flex-col items-center bg-background text-foreground'>
				<Header onPortfolioOpen={() => setPortfolioOpen(true)} />

				<div className='flex w-full max-w-7xl flex-col'>
					<Hero />
					
					<div className='px-4 md:px-8 lg:px-12'>
						<Cases />
						<QuemSomos />
						<Processos />
						<Faqs />
						<NossoTime />
						<Contato />
					</div>
				</div>

				{/* Footer */}
				<footer className='mt-8 w-full border-border border-t py-8'>
					<div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8 lg:px-12'>
						<p className='text-muted-foreground text-sm'>
							2024 Arthur Martins. Todos os direitos reservados.
						</p>
						<p className='text-muted-foreground text-xs'>
							Feito com Next.js, TailwindCSS e muito cafe
						</p>
					</div>
				</footer>
			</main>

			<PortfolioDrawer
				isOpen={portfolioOpen}
				onClose={() => setPortfolioOpen(false)}
			/>
		</>
	);
}
