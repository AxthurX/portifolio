'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
	Code,
	FileText,
	LayoutTemplate,
	type LucideIcon,
	Users,
	Wrench,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Step = {
	id: string;
	title: string;
	desc: string;
	Icon: LucideIcon;
};

const STEPS: Step[] = [
	{
		id: '01',
		title: 'Frontend Specialist',
		desc: '5+ anos criando interfaces modernas, performáticas e experiências refinadas com React, Next.js e TypeScript.',
		Icon: LayoutTemplate,
	},
	{
		id: '02',
		title: 'Arquitetura & Clean Code',
		desc: 'Aplicação de princípios como Clean Architecture, componentização e organização escalável de código.',
		Icon: FileText,
	},
	{
		id: '03',
		title: 'Backend & APIs',
		desc: 'Experiência com Node.js, Fastify, Prisma, filas, uploads, integrações e construção de APIs robustas.',
		Icon: Code,
	},
	{
		id: '04',
		title: 'UX & Performance',
		desc: 'Foco em fluidez, acessibilidade, animações avançadas e otimizações para entregar produtos premium.',
		Icon: Users,
	},
	{
		id: '05',
		title: 'Resolução de Problemas',
		desc: 'Transformando ideias complexas em soluções funcionais, escaláveis e fáceis de manter.',
		Icon: Wrench,
	},
];

export default function Processos() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const heading = headingRef.current;

			if (!heading) return;

			const words = heading.innerText.split(' ');

			heading.innerHTML = words
				.map(
					(word) =>
						`<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">
							<span
								class="gsap-proc-word"
								style="display:inline-block;transform:translateY(110%);"
							>
								${word}&nbsp;
							</span>
						</span>`,
				)
				.join('');

			gsap.to('.gsap-proc-word', {
				y: 0,
				duration: 0.9,
				stagger: 0.05,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: heading,
					start: 'top 85%',
					once: true,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='processos'
			className='relative w-full overflow-hidden border-foreground/10 border-t py-16 md:py-40'
		>
			{/* Title — LEFT aligned */}
			<div className='relative z-10 mb-16 px-4 text-left md:mb-32'>
				<h2 className='mb-4 font-black text-foreground/35 text-xs uppercase tracking-[0.35em] md:mb-6'>
					experiências
				</h2>

				<h3
					ref={headingRef}
					className='font-black text-4xl tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl'
				>
					Minhas{' '}
					<span className='font-normal font-serif text-primary italic'>
						experiências
					</span>
				</h3>
			</div>

			{/* Timeline */}
			<div className='relative mx-auto max-w-5xl px-4 md:px-6'>
				<div className='absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-foreground/10 md:block' />

				<div className='relative flex flex-col gap-10 md:gap-40'>
					{STEPS.map((step, index) => {
						const isEven = index % 2 === 0;
						const { Icon } = step;

						return (
							<div
								key={step.id}
								className={`relative flex w-full flex-col items-start md:items-center md:justify-between ${
									isEven ? 'md:flex-row' : 'md:flex-row-reverse'
								}`}
							>
								<motion.div
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									viewport={{ once: true, margin: '-20%' }}
									transition={{
										duration: 0.8,
										ease: [0.16, 1, 0.3, 1],
									}}
									style={{
										transformOrigin: isEven ? 'right' : 'left',
									}}
									className={`absolute top-1/2 hidden h-px w-[calc(50%-2rem)] -translate-y-1/2 bg-primary/40 md:block ${
										isEven ? 'left-8' : 'right-8'
									}`}
								/>

								<motion.div
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true, margin: '-20%' }}
									transition={{
										duration: 0.5,
										delay: 0.1,
									}}
									className='absolute top-1/2 left-1/2 z-20 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background md:block'
								/>

								<div className='z-10 w-full md:w-[calc(50%-4rem)]'>
									<motion.div
										initial={{ opacity: 0, y: 25 }}
										whileInView={{
											opacity: 1,
											y: 0,
										}}
										viewport={{
											once: true,
											margin: '-15%',
										}}
										transition={{
											duration: 0.7,
											delay: 0.15,
											ease: [0.16, 1, 0.3, 1],
										}}
										className='group relative w-full cursor-default overflow-hidden rounded-3xl border border-foreground/8 p-6 transition-colors duration-500 hover:border-primary/40 md:rounded-4xl md:p-8'
										style={{
											background: 'var(--surface)',
										}}
									>
										<div className='pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

										<div className='relative z-10'>
											<div className='mb-6 flex items-center gap-4 md:mb-8'>
												<div className='flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white md:h-14 md:w-14'>
													<Icon className='h-6 w-6' strokeWidth={1.5} />
												</div>

												<span className='font-serif text-2xl text-primary italic md:text-3xl'>
													{step.id}
												</span>
											</div>

											<h4 className='mb-3 text-2xl text-foreground md:mb-4 md:text-3xl'>
												{step.title}
											</h4>

											<p className='text-foreground/60 text-sm leading-relaxed tracking-wide md:text-base'>
												{step.desc}
											</p>
										</div>
									</motion.div>
								</div>

								<div className='hidden w-[calc(50%-4rem)] md:block' />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
