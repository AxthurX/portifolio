'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const skills = [
	{
		name: 'React / Next.js',
		category: 'Frontend',
		description: 'Aplicações web, SSR, componentes reutilizáveis e arquitetura frontend.',
		level: 'Especialidade',
	},
	{
		name: 'TypeScript',
		category: 'Linguagem',
		description: 'Desenvolvimento tipado, APIs, componentes e aplicações escaláveis.',
		level: 'Especialidade',
	},
	{
		name: 'Angular',
		category: 'Frontend',
		description: 'Aplicações corporativas, Angular Material e integração com APIs .NET.',
		level: 'Experiência profissional',
	},
	{
		name: 'C# / .NET',
		category: 'Backend',
		description: 'APIs, sistemas corporativos, WinForms e integrações com serviços.',
		level: 'Experiência profissional',
	},
	{
		name: 'Node.js / Fastify',
		category: 'Backend',
		description: 'APIs REST, serviços, integrações e processamento de dados.',
		level: 'Experiência profissional',
	},
	{
		name: 'PostgreSQL / Prisma',
		category: 'Dados',
		description: 'Modelagem, ORM, consultas e integração com aplicações.',
		level: 'Experiência profissional',
	},
	{
		name: 'Ionic / Capacitor',
		category: 'Mobile',
		description: 'Aplicações mobile cross-platform com Ionic, Cordova e Capacitor.',
		level: 'Experiência profissional',
	},
	{
		name: 'Playwright / Cypress / Jest',
		category: 'Testing',
		description: 'Testes E2E, integração e testes unitários automatizados.',
		level: 'Experiência profissional',
	},
	{
		name: 'Docker / AWS',
		category: 'DevOps',
		description: 'Conteinerização, ambientes de desenvolvimento e serviços em nuvem.',
		level: 'Experiência prática',
	},
];

const tools = ['Git', 'GitLab', 'VS Code', 'Postman', 'Docker', 'AWS', 'Vercel', 'Argo CD'];

export default function Stack() {
	return (
		<section
			id='stack'
			className='mb-8 flex w-full flex-col items-start border-border border-t py-16 md:mb-16 md:py-24'
		>
			<div className='mb-12 w-full px-4 text-left md:mb-16 md:px-0'>
				<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
					Stack
				</span>

				<h3 className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl'>
					Tecnologias{' '}
					<span className='font-normal font-serif text-primary italic'>& Ferramentas</span>
				</h3>
			</div>

			<div className='grid w-full gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-0'>
				<div className='rounded-2xl border border-border bg-surface p-6 md:p-8'>
					<div className='mb-8'>
						<h4 className='font-medium text-lg text-primary'>Stack & Experiência</h4>

						<p className='mt-1 max-w-xl text-muted-foreground text-sm leading-relaxed'>
							Tecnologias utilizadas na construção de aplicações web, APIs, sistemas corporativos e
							experiências digitais.
						</p>
					</div>

					<div className='grid gap-3 sm:grid-cols-2'>
						{skills.map((skill, index) => (
							<motion.div
								key={skill.name}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{
									once: true,
									margin: '-50px',
								}}
								transition={{
									duration: 0.45,
									delay: index * 0.06,
									ease: [0.16, 1, 0.3, 1],
								}}
								className='group rounded-xl border border-border bg-background/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/3 hover:shadow-[4px_4px_0_0_rgba(94,234,212,0.06)]'
							>
								{/* <div className='mb-2 flex items-start justify-between gap-3'>
									<div className='min-w-0'>
										<span className='font-medium text-[10px] text-primary uppercase tracking-wider'>
											{skill.category}
										</span>

										<h5 className='mt-0.5 font-medium text-sm'>{skill.name}</h5>
									</div>

									<span className='shrink-0 rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] text-primary'>
										{skill.level}
									</span>
								</div>

								<p className='text-muted-foreground text-xs leading-relaxed'>{skill.description}</p> */}
							</motion.div>
						))}
					</div>
				</div>

				<div className='rounded-2xl border border-border bg-surface p-6 md:p-8'>
					<div>
						<p className='mb-2 font-medium text-primary text-xs uppercase tracking-[0.2em]'>
							Workflow
						</p>

						<h4 className='font-medium text-lg'>Ferramentas do dia a dia</h4>

						<p className='mt-2 max-w-xl text-muted-foreground text-sm leading-relaxed'>
							Ferramentas que fazem parte do meu fluxo de desenvolvimento, versionamento, testes e
							deploy.
						</p>
					</div>

					<div className='mt-8 flex flex-wrap gap-3'>
						{tools.map((tool, index) => (
							<motion.span
								key={tool}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{
									opacity: 1,
									scale: 1,
								}}
								viewport={{ once: true }}
								transition={{
									duration: 0.4,
									delay: index * 0.05,
								}}
								className='rounded-full border border-border bg-background px-4 py-2 text-muted-foreground text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
							>
								{tool}
							</motion.span>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.4,
						}}
						className='mt-8 border-border border-t pt-8'
					>
						<p className='mb-4 text-muted-foreground text-sm'>
							Interessado em trabalhar juntos? Vamos conversar sobre seu projeto.
						</p>

						<a
							href='#contato'
							className='group inline-flex items-center gap-2 font-medium text-primary text-sm transition-all hover:gap-3'
						>
							Entrar em contato
							<ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
