'use client';

import { motion } from 'framer-motion';

const experiencias = [
	{
		cargo: 'Software Engineer',
		empresa: 'Governo de Rondônia',
		setor: 'Secretaria de Estado do Desenvolvimento Ambiental (SEDAM)',
		tipo: 'Meio período',
		periodo: 'mai. 2024 — o momento',
		duracao: '2 anos 1 mês',
		local: 'Porto Velho, Rondônia · No local',
		descricao: [
			'Responsável pelo desenvolvimento e manutenção de portais e sistemas da SEDAM, com destaque para o Portal SEDAM, principal site institucional da Secretaria, responsável por concentrar informações ambientais, regulatórias, sistema de notícias, serviços online e formulários dinâmicos para solicitações de certificados e autorizações.',
			'Participando ativamente da definição de padrões de arquitetura, boas práticas de código e da modernização da infraestrutura.',
			'Utilização de tecnologias como React, Next.js e TypeScript no frontend; Node.js, Prisma ORM e PostgreSQL no backend; além de Docker para conteinerização e padronização dos ambientes de desenvolvimento. Também responsável pela implementação de testes automatizados E2E com Playwright e Cypress.',
		],
		techs: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Prisma ORM', 'PostgreSQL', 'Docker', 'Playwright', 'Cypress'],
		atual: true,
		logo: 'RO',
		logoColor: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/40',
	},
	{
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
		techs: ['Angular', 'Angular Material', 'Ionic', 'Cordova', 'Capacitor', 'C#', 'WinForms', '.NET', 'Firebase', 'SQL'],
		atual: false,
		logo: 'OB',
		logoColor: 'bg-blue-900/40 text-blue-400 border-blue-700/40',
	},
];

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.15 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 32 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
};

export default function Experiencias() {
	return (
		<section id='experiencias' className='py-24'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className='mb-14'
			>
				<div className='mb-3 flex items-center gap-3'>
					<span className='h-px w-8 bg-primary' />
					<span className='text-primary text-xs font-medium uppercase tracking-widest'>
						Trajetória
					</span>
				</div>
				<h2 className='font-serif font-bold text-4xl italic leading-tight text-foreground md:text-5xl'>
					Experiência<br />
					<span className='text-gradient'>profissional</span>
				</h2>
			</motion.div>

			{/* Timeline */}
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-80px' }}
				className='relative'
			>
				{/* Vertical line */}
				<div className='absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block' />

				<div className='flex flex-col gap-0'>
					{experiencias.map((exp, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className='relative flex flex-col gap-6 md:flex-row md:gap-10'
						>
							{/* Timeline dot */}
							<div className='hidden shrink-0 flex-col items-center md:flex' style={{ width: '42px' }}>
								<div className={`relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold ${exp.logoColor}`}>
									{exp.logo}
									{exp.atual && (
										<span className='absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary ring-2 ring-background' />
									)}
								</div>
							</div>

							{/* Card */}
							<div className={`mb-10 flex-1 rounded-2xl border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(94,234,212,0.06)] md:p-8 ${exp.atual ? 'border-primary/20' : 'border-border'}`}>
								{/* Header */}
								<div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
									<div>
										<div className='mb-1 flex items-center gap-2'>
											{/* Mobile logo */}
											<div className={`flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold md:hidden ${exp.logoColor}`}>
												{exp.logo}
											</div>
											<h3 className='font-bold text-foreground text-lg leading-tight'>
												{exp.cargo}
											</h3>
											{exp.atual && (
												<span className='rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider'>
													Atual
												</span>
											)}
										</div>
										<p className='font-medium text-foreground/80 text-sm'>
											{exp.empresa}
											<span className='text-muted-foreground font-normal'> · {exp.tipo}</span>
										</p>
										{exp.setor && (
											<p className='mt-0.5 text-muted-foreground text-xs'>
												{exp.setor}
											</p>
										)}
									</div>

									<div className='shrink-0 text-right'>
										<p className='text-foreground/70 text-xs font-medium tabular-nums'>
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

								{/* Divider */}
								<div className='mb-5 h-px bg-border' />

								{/* Description */}
								<ul className='mb-6 flex flex-col gap-3'>
									{exp.descricao.map((item, i) => (
										<li key={i} className='flex gap-3 text-muted-foreground text-sm leading-relaxed'>
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
											className='rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary'
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
