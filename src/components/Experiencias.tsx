'use client';

import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCIAS = [
	{
		id: 1,
		cargo: 'Software Engineer',
		empresa: 'Governo de Rondônia',
		tipo: 'Meio período',
		periodo: 'mai. 2024 — o momento',
		duracao: '2 anos 1 mês',
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
		cargo: 'Software Engineer',
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
			id='experiencias'
			className='relative w-full overflow-hidden border-border border-t py-16 md:py-32'
		>
			<div className='relative z-10 mb-16 px-4 text-left md:mb-12'>
				<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
					Habilidades
				</span>

				<h3
					ref={headingRef}
					className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
				>
					Minhas{' '}
					<span className='font-normal font-serif text-primary italic'>
						experiencias
					</span>
				</h3>
			</div>

			<div className='relative mx-auto px-4'>
				<div className='absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-border md:block' />

				<div className='relative flex flex-col gap-8'>
					{EXPERIENCIAS.map((exp, index) => {
						const isEven = index % 2 === 0;

						return (
							<div
								key={exp.id}
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
									className={`absolute top-1/2 hidden h-px w-[calc(50%-2rem)] -translate-y-1/2 bg-linear-to-r ${
										isEven
											? 'left-8 from-transparent to-primary/50'
											: 'right-8 from-primary/50 to-transparent'
									} md:block`}
								/>

								{/* Center dot */}
								<motion.div
									className='absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center md:flex'
									style={{ width: '42px' }}
								>
									<div
										className={
											'relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-primary font-bold text-primary-content text-xs'
										}
									>
										{exp.atual ? 'Atual' : exp.periodo.split(' ')[1]}
									</div>
								</motion.div>

								{/* Card */}
								<div className='z-10 w-full md:w-[calc(50%-3rem)]'>
									<motion.div
										key={exp.cargo}
										variants={itemVariants}
										className='relative flex flex-col gap-6 md:flex-row md:gap-10'
									>
										<div
											className={`mb-10 flex-1 rounded-2xl border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(94,234,212,0.06)] md:p-8 ${exp.atual ? 'border-primary/20' : 'border-border'}`}
										>
											<div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
												<div>
													<div className='mb-1 flex items-center gap-2'>
														<div
															className={
																'flex h-8 w-8 items-center justify-center rounded-full border font-bold text-[10px] md:hidden'
															}
														>
															{exp.logo}
														</div>
														<h3 className='font-bold text-foreground text-lg leading-tight'>
															{exp.cargo}
														</h3>
														{exp.atual && (
															<span className='rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-[10px] text-primary uppercase tracking-wider'>
																Atual
															</span>
														)}
													</div>
													<p className='font-medium text-foreground/80 text-sm'>
														{exp.empresa}
														<span className='font-normal text-muted-foreground'>
															{' '}
															· {exp.tipo}
														</span>
													</p>
												</div>

												<div className='shrink-0 text-right'>
													<p className='font-medium text-foreground/70 text-xs tabular-nums'>
														{exp.periodo}
													</p>
													<p className='text-muted-foreground text-xs'>
														{exp.duracao}
													</p>
													<p className='mt-0.5 text-muted-foreground text-xs'>
														{exp.local}
													</p>
												</div>
											</div>

											<div className='mb-5 h-px bg-border' />

											<ul className='mb-6 flex flex-col gap-3'>
												{exp.setor && (
													<p className='mt-0.5 text-muted-foreground text-sm'>
														{exp.setor}
													</p>
												)}
												{exp.descricao.map((item) => (
													<li
														key={item}
														className='flex gap-3 text-muted-foreground text-sm leading-relaxed'
													>
														<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60' />
														{item}
													</li>
												))}
											</ul>

											{/* Tech badges */}
											<div className='flex flex-wrap gap-2'>
												{exp.techs.map((tech) => (
													<span
														key={tech}
														className='rounded-full border border-border bg-foreground/5 px-3 py-1 text-foreground/70 text-xs transition-colors hover:border-primary/40 hover:text-primary'
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									</motion.div>
								</div>

								<div className='hidden w-[calc(50%-3rem)] md:block' />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
