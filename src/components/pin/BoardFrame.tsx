import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BoardFrameProps {
	count: number;
	total: number;
	gallery?: boolean;
	className?: string;
	children: ReactNode;
}

export const BoardFrame = ({
	count,
	total,
	gallery = false,
	className,
	children,
}: BoardFrameProps) => {
	return (
		<section className={cn('relative flex flex-col', className)}>
			<div className='relative flex flex-1 flex-col overflow-hidden rounded-lg border-2 border-black bg-base-100 shadow-light dark:border-white dark:shadow-dark'>
				<div className='flex items-center justify-between gap-4 border-black border-b-2 bg-base-200/50 px-4 py-3 md:px-6 dark:border-white'>
					<div className='min-w-0'>
						<p className='font-medium text-[10px] text-primary uppercase tracking-[0.2em]'>
							Meu quadro
						</p>
						<p className='font-semibold font-serif text-[15px] text-foreground'>
							Coleção de certificados
						</p>
					</div>

					<span className='shrink-0 rounded-base border-2 border-black bg-base-100 px-3 py-1 text-[11px] text-muted-foreground tabular-nums shadow-light dark:border-white dark:shadow-dark'>
						{count} de {total}
					</span>
				</div>

				<div className='relative flex-1'>
					<div className='absolute inset-4 md:inset-6'>{children}</div>

					<div
						aria-hidden='true'
						className={cn('pointer-events-none absolute inset-0', gallery ? 'animate-glow' : '')}
						style={{
							background:
								'radial-gradient(72% 62% at 30% 0%, hsl(45 92% 80% / 0.16), transparent 70%)',
						}}
					/>
				</div>
			</div>
		</section>
	);
};
