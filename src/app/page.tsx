'use client';

import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { PortfolioPresentation } from '@/components/PortfolioPresentation';
import Certificados from '../components/Certificados';
import Contato from '../components/Contato';
import Experiencias from '../components/Experiencias';
import Header from '../components/Header';
import Main from '../components/Main';
import Projetos from '../components/Projetos';
import SobreMim from '../components/SobreMim';

export default function Home() {
	const [lenis, setLenis] = useState<Lenis | null>(null);
	const [portfolioOpen, setPortfolioOpen] = useState<boolean>(false);

	useEffect(() => {
		const instance = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
		});

		let raf_id = 0;

		const animate = (time: number) => {
			instance.raf(time);
			raf_id = requestAnimationFrame(animate);
		};

		raf_id = requestAnimationFrame(animate);

		setLenis(instance);

		return () => {
			if (raf_id) cancelAnimationFrame(raf_id);

			instance.destroy();
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
			<main className='relative flex min-h-screen w-full grow flex-col items-center'>
				{lenis && <PortfolioPresentation lenis={lenis} />}

				<Header onPortfolioOpen={() => setPortfolioOpen(true)} />

				<div className='w-full flex-col'>
					<Main />

					<div className='mx-auto max-w-430 px-4 md:px-8 lg:px-12'>
						<SobreMim />
						<Projetos />
						<Experiencias />
						<Certificados />
						{/* <Stack /> */}
						<Contato />
					</div>
				</div>

				<footer className='mt-8 w-full border-black border-t-2 py-8 dark:border-white'>
					<div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8 lg:px-12'>
						<p className='text-muted-foreground text-sm dark:text-primary-content'>
							© Todos os Direitos Reservados - 2026
						</p>
						<p className='text-muted-foreground text-xs dark:text-primary-content'>
							Arthur Martins LTDA. Feito com Next.js e muito cafe
						</p>
					</div>
				</footer>
			</main>

			{/* <PortfolioDrawer isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} /> */}
		</>
	);
}
