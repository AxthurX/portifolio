'use client';

import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import BentoGrid from '../components/BentoGrid';
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
		console.log(portfolioOpen);
		document.body.style.overflow = portfolioOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [portfolioOpen]);

	return (
		<>
			<main className='relative flex min-h-screen w-full flex-col items-center bg-background text-foreground'>
				<Header onPortfolioOpen={() => setPortfolioOpen(true)} />

				<div className='flex w-full max-w-450 flex-col gap-12 px-4 pt-30 pb-12 md:px-8 xl:px-12'>
					<Hero />
					<BentoGrid />
					<Cases />
					<QuemSomos />
					<Processos />
					<Faqs />
					<NossoTime />
					<Contato />
				</div>
			</main>

			<PortfolioDrawer
				isOpen={portfolioOpen}
				onClose={() => setPortfolioOpen(false)}
			/>
		</>
	);
}
