'use client';

import { motion, type Variants } from 'framer-motion';
import {
	ArrowUpRight,
	Code2,
	Globe,
	LayoutPanelTop,
	MoveUpRight,
	Sparkles,
} from 'lucide-react';

const stats = [
	{
		title: 'projetos reais',
		value: '24+',
		description:
			'transformando ideias em produtos modernos, rápidos e escaláveis.',
	},
	{
		title: 'anos de experiência',
		value: '5+',
		description: 'atuando com frontend, backend e arquitetura de aplicações.',
	},
];

export default function BentoGrid() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.12,
				delayChildren: 0.2,
			},
		},
	};

	const cardVariants: Variants = {
		hidden: {
			opacity: 0,
			y: 40,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	return (
		<motion.section
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: '-100px' }}
			className='grid w-full grid-cols-1 gap-4 py-16 md:grid-cols-4'
		>
			<motion.div variants={cardVariants} className='flex h-128 flex-col gap-4'>
				<div className='group relative flex h-[65%] flex-col justify-between overflow-hidden rounded-4xl border border-border bg-muted/40 p-7 transition-all duration-300 hover:border-primary/30 hover:bg-muted'>
					<div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

					<div className='relative z-10'>
						<p className='mb-4 text-muted-foreground text-sm'>
							criando experiências digitais modernas com foco em performance,
							motion e usabilidade.
						</p>

						<div className='flex items-center gap-2'>
							<div className='rounded-full border border-border bg-background p-2'>
								<LayoutPanelTop className='h-4 w-4 text-primary' />
							</div>

							<span className='text-muted-foreground text-xs uppercase tracking-[0.25em]'>
								frontend engineer
							</span>
						</div>
					</div>

					<div className='relative z-10 flex items-end justify-between'>
						<div>
							<h3 className='text-6xl tracking-tight'>{stats[0].value}</h3>

							<p className='mt-1 text-muted-foreground text-xs uppercase tracking-[0.2em]'>
								{stats[0].title}
							</p>
						</div>

						<div className='flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground'>
							<ArrowUpRight className='h-4 w-4' />
						</div>
					</div>
				</div>

				<div className='flex h-[35%] items-end rounded-4xl border border-border bg-linear-to-br from-primary to-accent p-7 text-primary-foreground'>
					<div>
						<p className='text-sm opacity-80'>stack principal</p>

						<h3 className='mt-2 font-medium text-2xl leading-tight'>
							Next.js
							<br />
							TypeScript
							<br />
							Node.js
						</h3>
					</div>
				</div>
			</motion.div>

			<motion.div variants={cardVariants} className='flex h-128 flex-col gap-4'>
				<div className='group flex h-[50%] flex-col justify-between rounded-4xl border border-border bg-background p-7 transition-all duration-300 hover:border-primary/30'>
					<div>
						<p className='text-muted-foreground text-sm'>
							especializado em interfaces premium e aplicações fullstack
							escaláveis.
						</p>
					</div>

					<div className='flex items-end justify-between'>
						<div>
							<h3 className='text-6xl tracking-tight'>{stats[1].value}</h3>

							<p className='mt-1 text-muted-foreground text-xs uppercase tracking-[0.2em]'>
								{stats[1].title}
							</p>
						</div>

						<div className='rounded-full border border-border p-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
							<Code2 className='h-4 w-4' />
						</div>
					</div>
				</div>

				<div className='relative flex-1 overflow-hidden rounded-4xl border border-border bg-muted/40 p-7'>
					<div className='absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl' />

					<div className='relative z-10 flex h-full flex-col justify-between'>
						<div>
							<span className='inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-muted-foreground text-xs'>
								<Sparkles className='h-3 w-3' />
								ui animations
							</span>
						</div>

						<h3 className='max-w-48 text-3xl leading-tight tracking-tight'>
							interfaces fluidas com motion e micro interações
						</h3>
					</div>
				</div>
			</motion.div>

			{/* CENTER */}
			<motion.div variants={cardVariants} className='flex h-128'>
				<div className='group relative flex w-full flex-col justify-between overflow-hidden rounded-4xl bg-foreground p-8 text-background'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]' />

					<div className='relative z-10'>
						<span className='inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 px-3 py-1 text-background/70 text-xs uppercase tracking-[0.2em]'>
							<Globe className='h-3 w-3' />
							fullstack developer
						</span>

						<h2 className='mt-8 text-4xl leading-[1.05] tracking-tight'>
							construindo
							<br />
							produtos digitais
							<br />
							com foco em
							<br />
							experiência
						</h2>
					</div>

					<div className='relative z-10 flex items-center justify-between'>
						<div className='flex h-12 w-12 items-center justify-center rounded-full border border-background/10 transition-colors hover:bg-background hover:text-foreground'>
							<MoveUpRight className='h-5 w-5' />
						</div>

						<div className='text-right'>
							<p className='text-background/60 text-sm'>
								disponível para freelas
							</p>

							<p className='text-lg'>2026</p>
						</div>
					</div>
				</div>
			</motion.div>

			{/* RIGHT */}
			<motion.div variants={cardVariants} className='flex h-128 flex-col gap-4'>
				<div className='flex flex-1 flex-col justify-between rounded-4xl border border-border bg-background p-7'>
					<div>
						<p className='text-muted-foreground text-sm'>
							código limpo, arquitetura escalável e foco extremo em performance.
						</p>
					</div>

					<div>
						<h3 className='text-5xl tracking-tight'>100%</h3>

						<p className='mt-2 max-w-40 text-muted-foreground text-xs uppercase tracking-[0.2em]'>
							obsessão por detalhes e qualidade visual
						</p>
					</div>
				</div>

				<div className='rounded-4xl border border-border bg-muted/40 p-7'>
					<p className='text-muted-foreground text-sm'>
						baseado em next.js, react, node.js, prisma, fastify, tailwind e
						motion design.
					</p>
				</div>
			</motion.div>
		</motion.section>
	);
}
