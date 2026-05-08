'use client';

import { motion, type Transition } from 'framer-motion';
import { ArrowDownRight, Code2, MoveDown } from 'lucide-react';
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
			className='relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-secondary/70 py-6 md:p-10'
		>
			{/* TOP */}
			<motion.div
				{...fadeIn(0.2)}
				className='flex items-center justify-between'
			>
				<div className='flex items-center gap-2'>
					<div className='flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur'>
						<Code2 className='h-5 w-5 text-primary' />
					</div>

					<div>
						<p className='font-semibold text-primary text-sm'>Arthur Martins</p>
						<p className='text-primary/50 text-xs'>
							Frontend • Fullstack Developer
						</p>
					</div>
				</div>
			</motion.div>

			{/* CENTER */}
			<div className='relative z-10 flex flex-1 flex-col justify-center py-16'>
				{/* MOBILE */}
				<div className='flex flex-col md:hidden'>
					{['Interfaces', 'Modernas', 'Experiências'].map((word, index) => (
						<div key={word} className='overflow-hidden'>
							<motion.h1
								{...wordReveal(0.1 + index * 0.12)}
								className='font-black text-[15vw] text-white uppercase leading-[0.85] tracking-[-0.05em]'
							>
								{word}
							</motion.h1>
						</div>
					))}

					<div className='overflow-hidden'>
						<motion.h1
							{...wordReveal(0.48)}
							className='font-serif text-[16vw] text-primary italic leading-[0.9]'
						>
							Digitais
						</motion.h1>
					</div>

					<motion.p
						{...fadeIn(0.7)}
						className='mt-8 max-w-md text-base text-white/60 leading-relaxed'
					>
						Desenvolvedor frontend com foco em experiências premium, performance
						e animações modernas.
					</motion.p>

					<motion.div {...fadeIn(0.9)} className='mt-10 flex gap-4'>
						<Link
							href='#projetos'
							className='flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-white transition-transform hover:scale-105'
						>
							Ver projetos
							<ArrowDownRight className='h-4 w-4' />
						</Link>

						<Link
							href='#contato'
							className='rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10'
						>
							Contato
						</Link>
					</motion.div>
				</div>

				{/* DESKTOP */}
				<div className='hidden flex-col md:flex'>
					{/* LINE 1 */}
					<div className='flex items-end justify-between overflow-hidden'>
						<motion.h1
							{...wordReveal(0.1)}
							className='font-black text-[8vw] text-white uppercase leading-[0.82] tracking-[-0.06em]'
						>
							Frontend
						</motion.h1>
					</div>

					{/* LINE 2 */}
					<div className='relative flex items-end overflow-hidden'>
						<motion.h1
							{...wordReveal(0.2)}
							className='font-black text-[8vw] text-white uppercase leading-[0.82] tracking-[-0.06em]'
						>
							Developer
						</motion.h1>
					</div>

					{/* LINE 3 */}
					<div className='relative mt-2 flex items-end justify-between overflow-hidden'>
						<div className='flex items-end gap-6'>
							<motion.h1
								{...wordReveal(0.3)}
								className='font-black text-[8vw] text-white uppercase leading-[0.82] tracking-[-0.06em]'
							>
								Creating
							</motion.h1>

							<motion.h1
								{...wordReveal(0.4)}
								className='pb-2 font-serif text-[8.2vw] text-primary italic leading-none'
							>
								Experiences
							</motion.h1>
						</div>

						{/* PROJECT CTA */}
						<motion.div {...fadeIn(0.8)} className='group mb-10'>
							<Link href='#projetos' className='flex flex-col items-start'>
								<div className='flex items-center gap-3 font-black text-lg text-white/60 uppercase tracking-tight transition-colors group-hover:text-white'>
									VER
									<div className='flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-primary group-hover:bg-primary'>
										<MoveDown className='h-4 w-4' />
									</div>
								</div>

								<span className='font-black text-lg text-white/60 uppercase tracking-tight transition-colors group-hover:text-primary'>
									PROJETOS
								</span>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
