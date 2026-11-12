'use client';

import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Card } from './ui/card';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCIAS = [
	{
		id: 1,
		cargo: 'Engenheiro de Software',
		empresa: 'Governo de Rondônia',
		tipo: 'Meio período',
		periodo: 'mai. 2024 — o momento',
		duracao: '2 anos 6 meses',
		local: 'Porto Velho, Rondônia · No local',
		setor: 'Secretaria de Estado do Desenvolvimento Ambiental (SEDAM)',
		descricao: [
			'Responsável pelo desenvolvimento e manutenção de portais e sistemas da SEDAM, com destaque para o Portal SEDAM, principal site institucional da Secretaria, responsável por concentrar informações ambientais, regulatórias, sistema de notícias, serviços online e formulários dinâmicos para solicitações de certificados e autorizações.',
			'Participando ativamente da definição de padrões de arquitetura, boas práticas de código e da modernização da infraestrutura.',
			'Utilização de tecnologias como React, Next.js e TypeScript no frontend; Node.js, Prisma ORM e PostgreSQL no backend; além de Docker para conteinerização e padronização dos ambientes de desenvolvimento. Também responsável pela implementação de testes automatizados E2E com Playwright e Cypress.',
		],
		techs: [
			'React',
			'Next.js',
			'TypeScript',
			'Node.js',
			'Prisma ORM',
			'PostgreSQL',
			'Docker',
			'Playwright',
			'Cypress',
		],
		atual: true,
		logo: 'RO',
	},
	{
		id: 2,
		cargo: 'Engenheiro de Software',
		empresa: 'Obter Soluções Tecnológicas NossoERP',
		setor: null,
		tipo: 'Tempo integral',
		periodo: 'mai. 2022 — abr. 2024',
		duracao: '2 anos',
		local: 'Porto Velho, Rondônia · No local',
		descricao: [
			'Desenvolvimento frontend: responsável pelo desenvolvimento de interfaces utilizando Angular Framework e Angular Material, com integração de APIs baseadas em .NET Framework garantindo comunicação eficiente entre frontend e backend.',
			'Desenvolvimento Mobile Cross-Platform: Implementação e manutenção do NossoERP Connect, aplicativo móvel desenvolvido com Ionic Framework, Cordova e Capacitor, totalmente integrado ao NossoERP oferecendo flexibilidade e mais eficiência nas operações de vendas externas e internas, além de contar com outras ferramentas auxiliares ao sistema principal.',
			'Desenvolvimento de sistema ERP Desktop: Manutenção e evolução do NossoERP, um sistema completo projetado para simplificar a gestão empresarial, trabalhando desde o controle de estoque avançado até integrações fiscais, controle financeiro e vendas. Atuação com C#, WinForms e .NET, incluindo integração de APIs e administração de bancos de dados SQL e NoSQL (Firebase).',
		],
		techs: [
			'Angular',
			'Angular Material',
			'Ionic',
			'Cordova',
			'Capacitor',
			'C#',
			'WinForms',
			'.NET',
			'Firebase',
			'SQL',
		],
		atual: false,
		logo: 'OB',
	},
];

export default function Experiencias() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 32 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
		},
	};

	useEffect(() => {
		const ctx = gsap.context(() => {
			const heading = headingRef.current;
			if (!heading) return;

			const palavras = heading.querySelectorAll<HTMLElement>('.gsap-exp-word');
			if (palavras.length === 0) return;

			gsap.fromTo(
				palavras,
				{ yPercent: 110 },
				{
					yPercent: 0,
					duration: 0.9,
					stagger: 0.05,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						once: true,
					},
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='experiencias'
			className='relative w-full overflow-hidden border-black border-t-2 py-16 md:py-32 dark:border-white'
		>
			<div className='relative z-10 mb-10 px-4 text-left sm:mb-16 md:mb-12'>
				<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest dark:text-primary'>
					Habilidades
				</span>

				<h3
					ref={headingRef}
					className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
				>
					<span className='inline-block overflow-hidden align-bottom'>
						<span className='gsap-exp-word inline-block'>Minhas&nbsp;</span>
					</span>

					<span className='inline-block overflow-hidden align-bottom'>
						<span className='gsap-exp-word inline-block font-normal font-serif text-primary italic dark:text-primary'>
							experiencias
						</span>
					</span>
				</h3>
			</div>

			<div data-presentation-track='experiencias' className='relative mx-auto px-4'>
				<div className='absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-black lg:block dark:bg-white/20' />

				<div className='relative flex min-w-full snap-x snap-mandatory flex-col gap-6 sm:gap-8'>
					{EXPERIENCIAS.map((exp, index) => {
						const isEven = index % 2 === 0;

						return (
							<div
								key={exp.id}
								data-presentation-item='experiencia'
								data-presentation-label={exp.empresa}
								className={`relative flex w-full flex-col items-start lg:items-center lg:justify-between ${
									isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
								}`}
							>
								<motion.div
									initial='hidden'
									whileInView='visible'
									viewport={{ once: true, margin: '-20%' }}
									className={`absolute top-1/2 hidden h-0.5 w-[calc(50%-1rem)] -translate-y-1/2 lg:block ${
										isEven ? 'left-10' : 'right-10'
									}`}
								>
									<motion.div
										variants={{
											hidden: { scaleX: 0 },
											visible: {
												scaleX: 1,
												transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
											},
										}}
										style={{ transformOrigin: isEven ? 'right' : 'left' }}
										className={`h-full w-full ${
											isEven
												? 'bg-linear-to-r from-transparent to-base-content/70'
												: 'bg-linear-to-r from-base-content/70 to-transparent'
										}`}
									/>
								</motion.div>

								<motion.div
									className='absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex'
									style={{ width: '42px' }}
								>
									<div
										className={
											'relative z-10 mt-1 flex size-12 items-center justify-center rounded-base border-2 border-black bg-primary font-bold text-primary-content text-xs shadow-light dark:border-white dark:shadow-dark'
										}
									>
										{exp.atual ? 'Atual' : exp.periodo.split(' ')[1]}
									</div>
								</motion.div>

								<div className='z-10 w-full lg:w-[calc(50%-3rem)]'>
									<motion.div
										key={exp.cargo}
										variants={itemVariants}
										className='relative flex flex-col lg:flex-row lg:gap-10'
									>
										<Card className='mb-0 flex-1 rounded-lg border-2 bg-surface p-4 shadow-light transition-all duration-300 hover:border-primary hover:shadow-[4px_4px_0_0_rgba(32,91,255,0.6)] sm:p-6 lg:mb-10 lg:p-8 dark:shadow-dark dark:hover:shadow-[4px_4px_0_0_rgba(32,91,255,0.6)]'>
											<div className='mb-4 flex flex-col gap-2 max-sm:gap-0 sm:mb-5 xl:flex-row xl:items-start xl:justify-between xl:gap-3'>
												<div className='min-w-0'>
													<div className='flex items-center gap-2'>
														<div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-base border-2 border-black bg-primary font-bold text-[10px] text-primary-content shadow-light sm:h-8 sm:w-8 lg:hidden dark:border-white dark:shadow-dark'>
															{exp.logo}
														</div>

														<h3 className='min-w-0 flex-1 font-bold text-base text-foreground leading-tight max-lg:ml-1 sm:text-lg dark:text-base-content'>
															{exp.cargo}
														</h3>

														{exp.atual && (
															<span className='shrink-0 rounded-base border-2 border-black bg-primary/10 px-1.5 py-0.5 font-semibold text-[9px] text-primary uppercase tracking-wider sm:px-2 sm:text-[10px] dark:border-white dark:text-primary'>
																Atual
															</span>
														)}
													</div>

													<p className='mt-2 font-medium text-[13px] text-foreground/80 max-md:mt-1 sm:mt-4 sm:text-sm dark:text-base-content/85'>
														{exp.empresa}
														<span className='font-normal text-muted-foreground dark:text-muted-foreground'>
															{' '}
															· {exp.tipo}
														</span>
													</p>
												</div>

												<div className='shrink-0 space-y-0.5 xl:text-right'>
													<p className='font-medium text-[11px] text-foreground/70 tabular-nums sm:text-xs dark:text-base-content/70'>
														{exp.periodo}
													</p>
													<p className='text-[11px] text-muted-foreground sm:text-xs'>
														{exp.duracao}
													</p>
													<p className='text-[11px] text-muted-foreground sm:text-xs'>
														{exp.local}
													</p>
												</div>
											</div>

											<div className='mb-4 h-0.5 bg-black sm:mb-5 dark:bg-white/20' />

											{exp.setor && (
												<p className='mb-4 border-primary border-l-2 pl-3 text-[13px] text-foreground/80 leading-snug sm:text-sm dark:text-base-content/75'>
													{exp.setor}
												</p>
											)}

											<ul className='mb-5 flex flex-col gap-2.5 sm:mb-6 sm:gap-3'>
												{exp.descricao.map((item) => (
													<li
														key={item}
														className='flex gap-2.5 text-[13px] text-foreground/80 leading-relaxed sm:gap-3 sm:text-sm dark:text-base-content/75'
													>
														<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60' />
														{item}
													</li>
												))}
											</ul>

											<div className='flex flex-wrap gap-1.5 sm:gap-2'>
												{exp.techs.map((tech) => (
													<span
														key={tech}
														className='rounded-base border-2 border-black bg-base-100 px-2.5 py-1 text-[11px] text-foreground shadow-light transition-colors hover:bg-primary hover:text-primary-content sm:px-3 sm:text-xs dark:border-white dark:shadow-dark'
													>
														{tech}
													</span>
												))}
											</div>
										</Card>
									</motion.div>
								</div>

								<div className='hidden w-[calc(50%-3rem)] lg:block' />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
