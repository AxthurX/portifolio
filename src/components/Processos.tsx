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
		desc: '5+ anos criando interfaces modernas, performaticas e experiencias refinadas com React, Next.js e TypeScript.',
		Icon: LayoutTemplate,
	},
	{
		id: '02',
		title: 'Arquitetura & Clean Code',
		desc: 'Aplicacao de principios como Clean Architecture, componentizacao e organizacao escalavel de codigo.',
		Icon: FileText,
	},
	{
		id: '03',
		title: 'Backend & APIs',
		desc: 'Experiencia com Node.js, Fastify, Prisma, filas, uploads, integracoes e construcao de APIs robustas.',
		Icon: Code,
	},
	{
		id: '04',
		title: 'UX & Performance',
		desc: 'Foco em fluidez, acessibilidade, animacoes avancadas e otimizacoes para entregar produtos premium.',
		Icon: Users,
	},
	{
		id: '05',
		title: 'Resolucao de Problemas',
		desc: 'Transformando ideias complexas em solucoes funcionais, escalaveis e faceis de manter.',
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
			className='relative w-full overflow-hidden border-border border-t py-16 md:py-32'
		>
			{/* Title */}
			<div className='relative z-10 mb-16 px-4 text-left md:mb-24'>
				<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest md:mb-6'>
					Habilidades
				</span>

				<h3
					ref={headingRef}
					className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
				>
					Minhas{' '}
					<span className='font-serif text-primary italic font-normal'>
						experiencias
					</span>
				</h3>
			</div>

			{/* Timeline */}
			<div className='relative mx-auto max-w-5xl px-4 md:px-6'>
				{/* Vertical line */}
				<div className='absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-border md:block' />

				<div className='relative flex flex-col gap-8'>
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
								{/* Connection line */}
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
									className={`absolute top-1/2 hidden h-px w-[calc(50%-2rem)] -translate-y-1/2 bg-gradient-to-r ${
										isEven ? 'from-transparent to-primary/50 left-8' : 'from-primary/50 to-transparent right-8'
									} md:block`}
								/>

								{/* Center dot */}
								<motion.div
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true, margin: '-20%' }}
									transition={{
										duration: 0.5,
										delay: 0.1,
									}}
									className='absolute top-1/2 left-1/2 z-20 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary md:block'
								/>

								{/* Card */}
								<div className='z-10 w-full md:w-[calc(50%-3rem)]'>
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
										className='group relative h-72 w-full cursor-default overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-primary/40 md:p-8'
									>
										{/* Hover gradient */}
										<div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

										<div className='relative z-10'>
											<div className='mb-6 flex items-center gap-4'>
												<div className='flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground'>
													<Icon className='h-5 w-5' strokeWidth={1.5} />
												</div>

												<span className='font-serif text-2xl text-primary italic'>
													{step.id}
												</span>
											</div>

											<h4 className='mb-3 text-xl font-medium text-foreground md:text-2xl'>
												{step.title}
											</h4>

											<p className='text-muted-foreground text-sm leading-relaxed'>
												{step.desc}
											</p>
										</div>
									</motion.div>
								</div>

								{/* Spacer */}
								<div className='hidden w-[calc(50%-3rem)] md:block' />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
