'use client';

import { motion } from 'framer-motion';
import {
	Eye,
	Globe,
	type LucideIcon,
	MoveDown,
	Plus,
	Share2,
} from 'lucide-react';
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

	const floatingIcons: LucideIcon[] = [Eye, Share2];

	return (
		<motion.section
			ref={sectionRef}
			initial='hidden'
			animate='visible'
			className='relative flex w-full flex-col justify-end overflow-hidden pt-28 pb-8 md:pt-40 md:pb-12'
		>
			{/* TOP METADATA */}
			<motion.div
				{...fadeIn(0.3)}
				className='absolute top-0 left-0 mt-8 hidden w-full items-start justify-between px-4 sm:flex md:px-0'
			>
				<p className='max-w-[220px] font-medium text-[12px] text-foreground/50 leading-snug md:max-w-[280px] md:text-[13px]'>
					nosso estúdio é dedicado a criar
					<br />
					experiências digitais visualmente
					<br />
					deslumbrantes e envolventes
				</p>

				<div className='text-right font-medium text-[12px] text-foreground/50 leading-snug md:text-[13px]'>
					<p>design criativo</p>
					<p>branding</p>

					<p className='flex items-center justify-end gap-2'>
						ux/ui
						<span className='mt-0.5 block h-2 w-2 rounded-full bg-foreground/60' />
					</p>
				</div>
			</motion.div>

			{/* GLOBE */}
			<motion.div
				{...fadeIn(0.4)}
				className='absolute top-[10%] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center md:flex'
			>
				<span className='mb-3 font-black text-[11px] text-foreground/40 uppercase tracking-widest'>
					explorar
				</span>

				<div className='group flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-full border border-foreground/15 p-2 transition-all duration-300 hover:scale-105 hover:border-primary/40'>
					<div className='flex h-full w-full items-center justify-center rounded-full border border-foreground/5 bg-foreground/5 transition-colors group-hover:bg-primary/10'>
						<Globe
							strokeWidth={1}
							className='h-8 w-8 text-foreground/60 transition-all duration-500 group-hover:rotate-45 group-hover:text-primary'
						/>
					</div>
				</div>
			</motion.div>

			{/* FLOATING ICONS */}
			<motion.div
				{...fadeIn(0.5)}
				className='absolute bottom-[75%] left-[3%] hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:text-white md:flex'
			>
				<Plus className='h-6 w-6' strokeWidth={1.5} />
			</motion.div>

			<motion.div
				{...fadeIn(0.55)}
				className='absolute bottom-[70%] left-[20%] hidden gap-4 md:flex'
			>
				{floatingIcons.map((Icon, index) => (
					<div
						key={index}
						className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:text-white'
					>
						<Icon className='h-6 w-6' strokeWidth={1.5} />
					</div>
				))}
			</motion.div>

			{/* RIGHT TEXT */}
			<motion.div
				{...fadeIn(0.5)}
				className='absolute right-4 bottom-[70%] hidden text-right font-medium text-[12px] text-foreground/50 leading-snug sm:block md:right-0 md:text-[13px]'
			>
				conquiste os lugares
				<br />
				mais altos <span className='font-black text-primary'>conosco</span>
			</motion.div>

			{/* MAIN TYPOGRAPHY */}
			<div className='relative z-0 mt-8 flex w-full flex-col px-4 md:mt-16 md:px-0'>
				{/* MOBILE */}
				<div className='flex flex-col leading-[0.85] md:hidden'>
					{['Creative', 'Design', 'Digital'].map((word, index) => (
						<div key={word} className='overflow-hidden'>
							<motion.span
								{...wordReveal(0.1 + index * 0.12)}
								className='block font-black text-[14vw] text-foreground uppercase tracking-[-0.03em]'
							>
								{word}
							</motion.span>
						</div>
					))}

					<div className='overflow-hidden'>
						<motion.span
							{...wordReveal(0.46)}
							className='block font-serif text-[15vw] text-foreground/80 italic tracking-tight'
						>
							Studio
						</motion.span>
					</div>

					{/* MOBILE PROJECTS */}
					<motion.div
						{...fadeIn(0.7)}
						className='group mt-8 flex cursor-pointer flex-col items-start'
					>
						<div className='flex items-center gap-2 font-black text-foreground/70 text-sm uppercase tracking-tighter transition-colors group-hover:text-foreground'>
							NOSSOS
							<div className='flex h-5 w-5 items-center justify-center rounded-full border-2 border-foreground/40 transition-colors group-hover:border-foreground group-hover:bg-foreground'>
								<MoveDown
									strokeWidth={3}
									className='h-3 w-3 text-foreground/40 transition-colors group-hover:text-background'
								/>
							</div>
						</div>

						<div className='font-black text-foreground/70 text-sm uppercase tracking-tighter transition-colors group-hover:text-foreground'>
							PROJETOS
						</div>
					</motion.div>
				</div>

				{/* DESKTOP */}
				<div className='hidden flex-col items-start md:flex'>
					{/* LINE 1 */}
					<div className='flex w-full items-end justify-between overflow-hidden leading-[0.85]'>
						<motion.h1
							{...wordReveal(0.1)}
							className='whitespace-nowrap font-black text-[8vw] text-foreground uppercase tracking-[-0.035em]'
						>
							Creative
						</motion.h1>

						<motion.h1
							{...wordReveal(0.2)}
							className='whitespace-nowrap font-black text-[8vw] text-foreground uppercase tracking-[-0.035em]'
						>
							Design
						</motion.h1>
					</div>

					{/* LINE 2 */}
					<div className='relative mt-4 flex w-full items-end overflow-hidden leading-[0.85]'>
						{/* PROJECTS */}
						<motion.div
							{...fadeIn(0.6)}
							className='group absolute bottom-4 left-0 flex cursor-pointer flex-col items-start'
						>
							<div className='flex items-center gap-2 font-black text-foreground/60 text-lg uppercase tracking-tighter transition-colors group-hover:text-primary xl:text-xl'>
								NOSSOS
								<div className='mb-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-foreground/30 transition-colors group-hover:border-primary group-hover:bg-primary'>
									<MoveDown
										strokeWidth={3}
										className='h-4 w-4 text-foreground/40 transition-colors group-hover:text-white'
									/>
								</div>
							</div>

							<div className='font-black text-foreground/60 text-lg uppercase tracking-tighter transition-colors group-hover:text-primary xl:text-xl'>
								PROJETOS
							</div>
						</motion.div>

						{/* STAR */}
						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 30,
								repeat: Number.POSITIVE_INFINITY,
								ease: 'linear',
							}}
							className='absolute bottom-1 left-[10%]'
						>
							<svg
								width='120'
								height='120'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='0.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='text-foreground/25'
							>
								<title>Star</title>
								<path d='M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z' />
							</svg>
						</motion.div>

						{/* WORDS */}
						<div className='flex pt-2 pb-6'>
							<motion.h1
								{...wordReveal(0.3)}
								className='whitespace-nowrap font-black text-[8vw] text-foreground uppercase tracking-[-0.035em]'
							>
								Digital
							</motion.h1>

							<motion.h1
								{...wordReveal(0.4)}
								className='whitespace-nowrap pl-8 font-serif text-[8.5vw] text-foreground/75 italic tracking-tight'
							>
								Studio
							</motion.h1>
						</div>

						{/* DOTS */}
						<motion.div
							{...fadeIn(0.7)}
							className='absolute right-0 bottom-6 flex gap-2'
						>
							<span className='block h-3.5 w-3.5 rounded-full bg-foreground' />
							<span className='block h-3.5 w-3.5 rounded-full border-2 border-foreground/30' />
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
