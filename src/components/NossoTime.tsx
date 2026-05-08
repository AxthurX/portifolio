'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const skills = [
	{ name: 'React / Next.js', level: 95 },
	{ name: 'TypeScript', level: 90 },
	{ name: 'Node.js / Fastify', level: 85 },
	{ name: 'TailwindCSS', level: 95 },
	{ name: 'PostgreSQL / Prisma', level: 80 },
	{ name: 'GSAP / Framer Motion', level: 85 },
];

const tools = [
	'VS Code',
	'Figma',
	'Git',
	'Docker',
	'Vercel',
	'GitHub Actions',
	'Linear',
	'Notion',
];

export default function NossoTime() {
	return (
		<section
			id='nosso-time'
			className='mb-8 flex w-full flex-col items-start border-border border-t py-16 md:mb-16 md:py-24'
		>
			{/* Header */}
			<div className='mb-12 w-full px-4 text-left md:mb-16 md:px-0'>
				<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
					Stack
				</span>
				<h3 className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl'>
					Tecnologias{' '}
					<span className='font-serif text-primary italic font-normal'>
						& Ferramentas
					</span>
				</h3>
			</div>

			<div className='grid w-full gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-0'>
				{/* Skills */}
				<div className='rounded-2xl border border-border bg-surface p-6 md:p-8'>
					<h4 className='mb-6 font-medium text-lg'>Principais Skills</h4>
					
					<div className='flex flex-col gap-5'>
						{skills.map((skill, index) => (
							<motion.div
								key={skill.name}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<div className='mb-2 flex items-center justify-between'>
									<span className='text-sm'>{skill.name}</span>
									<span className='text-muted-foreground text-xs'>{skill.level}%</span>
								</div>
								<div className='h-1.5 w-full overflow-hidden rounded-full bg-border'>
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: `${skill.level}%` }}
										viewport={{ once: true }}
										transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
										className='h-full rounded-full bg-gradient-to-r from-primary to-accent'
									/>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Tools */}
				<div className='rounded-2xl border border-border bg-surface p-6 md:p-8'>
					<h4 className='mb-6 font-medium text-lg'>Ferramentas do dia a dia</h4>
					
					<div className='flex flex-wrap gap-3'>
						{tools.map((tool, index) => (
							<motion.span
								key={tool}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className='rounded-full border border-border bg-background px-4 py-2 text-muted-foreground text-sm transition-all hover:border-primary hover:text-primary'
							>
								{tool}
							</motion.span>
						))}
					</div>

					{/* CTA */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
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
