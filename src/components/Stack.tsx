'use client';

import { motion } from 'framer-motion';
import {
	CATEGORY_COLOR,
	TECH_LEVELS,
	type Tech,
	type TechCategory,
	type TechLevel,
	techsByCategory,
} from '@/lib/techs';
import { cn } from '@/lib/utils';

/** Barra de 3 traços que mostra o nível de experiência. */
const LevelBar = ({ level, className }: { level: TechLevel; className?: string }) => {
	const { steps, short } = TECH_LEVELS[level];

	return (
		<span
			className={cn('flex items-center gap-1', className)}
			title={TECH_LEVELS[level].label}
			role='img'
			aria-label={`Nível: ${TECH_LEVELS[level].label}`}
		>
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					className={cn(
						'h-1.5 w-4 rounded-full transition-colors duration-300',
						i < steps ? 'bg-primary' : 'bg-black/10 dark:bg-white/15',
					)}
				/>
			))}
			<span className='ml-1 text-[10px] text-muted-foreground tracking-wide'>{short}</span>
		</span>
	);
};

const TechCard = ({ tech, index }: { tech: Tech; index: number }) => {
	const Icon = tech.icon;
	const cor = CATEGORY_COLOR[tech.category];

	return (
		<motion.div
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-60px' }}
			transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
			className='group flex flex-col gap-4 rounded-2xl border border-black/10 bg-background/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-26px_hsl(205_90%_35%/0.6)] dark:border-white/10 dark:bg-white/[0.04]'
		>
			<div className='flex items-start justify-between gap-3'>
				<span
					className='grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/10 bg-black/[0.03] transition-colors duration-300 group-hover:border-primary/40 dark:border-white/10 dark:bg-white/[0.06]'
					style={{ color: cor }}
				>
					<Icon className='h-5 w-5' strokeWidth={1.9} />
				</span>

				<LevelBar level={tech.level} />
			</div>

			<div>
				<h5 className='font-semibold text-[15px] text-foreground'>{tech.name}</h5>
				<p className='mt-1.5 text-[12.5px] text-muted-foreground leading-relaxed'>
					{tech.description}
				</p>
			</div>
		</motion.div>
	);
};

const CategoryGroup = ({ categoria, index }: { categoria: TechCategory; index: number }) => {
	const techs = techsByCategory(categoria);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
		>
			<div className='mb-5 flex items-center gap-3'>
				<span
					aria-hidden='true'
					className='h-2.5 w-2.5 shrink-0 rounded-full'
					style={{ background: CATEGORY_COLOR[categoria] }}
				/>
				<h4 className='font-semibold text-[11px] text-foreground uppercase tracking-[0.24em]'>
					{categoria}
				</h4>
				<span aria-hidden='true' className='h-px flex-1 bg-black/10 dark:bg-white/10' />
				<span className='text-[11px] text-muted-foreground tabular-nums'>{techs.length}</span>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{techs.map((tech, i) => (
					<TechCard key={tech.name} tech={tech} index={i} />
				))}
			</div>
		</motion.div>
	);
};

export default function Stack() {
	return (
		<section
			id='stack'
			className='mb-8 flex w-full flex-col items-start border-border border-t py-16 md:mb-16 md:py-24'
		>
			<div className='mb-12 w-full px-4 text-left md:mb-16 md:px-0'>
				<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest dark:text-base-content/70'>
					Stack
				</span>

				<h3 className='font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl'>
					Tecnologias{' '}
					<span className='font-normal font-serif text-primary italic dark:text-base-content/70'>
						& Ferramentas
					</span>
				</h3>

				<p className='mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed md:text-base'>
					O que eu uso no dia a dia para construir aplicações web, APIs, sistemas corporativos e
					experiências digitais — do frontend ao deploy.
				</p>

				<div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2'>
					{Object.entries(TECH_LEVELS).map(([nivel, { label, steps }]) => (
						<span key={nivel} className='flex items-center gap-2 text-[11px] text-muted-foreground'>
							<span className='flex items-center gap-1'>
								{[0, 1, 2].map((i) => (
									<span
										key={i}
										className={cn(
											'h-1.5 w-4 rounded-full',
											i < steps ? 'bg-primary' : 'bg-black/10 dark:bg-white/15',
										)}
									/>
								))}
							</span>
							{label}
						</span>
					))}
				</div>
			</div>

			{/* <div className='flex w-full flex-col gap-14 px-4 md:px-0'>
				{TECH_CATEGORIES.map((categoria, index) => (
					<CategoryGroup key={categoria} categoria={categoria} index={index} />
				))}
			</div> */}
		</section>
	);
}
