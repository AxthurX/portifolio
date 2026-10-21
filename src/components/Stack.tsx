'use client';

import { TECH_LEVELS } from '@/lib/techs';
import { cn } from '@/lib/utils';

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
