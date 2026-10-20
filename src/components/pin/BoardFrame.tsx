import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BoardFrameProps {
	count: number;
	total: number;
	gallery?: boolean;
	className?: string;
	children: ReactNode;
}

const SCREW_POSITIONS = ['left-2 top-2', 'right-2 top-2', 'bottom-2 left-2', 'bottom-2 right-2'];

export const BoardFrame = ({
	count,
	total,
	gallery = false,
	className,
	children,
}: BoardFrameProps) => {
	return (
		<section className={cn('relative flex flex-col', className)}>
			<div className='wood-frame flex flex-1 flex-col rounded-[26px] p-3 ring-1 ring-[hsl(38_48%_74%/0.18)] sm:rounded-[34px] sm:p-5'>
				{SCREW_POSITIONS.map((position) => (
					<span
						key={position}
						aria-hidden='true'
						className={cn(
							'pointer-events-none absolute z-20 h-3 w-3 rounded-full bg-[linear-gradient(140deg,hsl(45_68%_80%),hsl(34_40%_30%))]',
							'shadow-[inset_0_1px_0_hsl(46_70%_90%/0.7),0_1px_3px_hsl(20_50%_3%/0.7)]',
							position,
						)}
					>
						<span className='absolute top-1/2 left-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 rotate-38 bg-[hsl(28_40%_16%/0.65)]' />
					</span>
				))}

				{/* bisel interno */}
				<div className='relative flex flex-1 flex-col overflow-hidden rounded-2xl shadow-[inset_0_3px_16px_hsl(20_42%_6%/0.75)] ring-1 ring-[hsl(38_48%_72%/0.16)]'>
					<div className='cork-surface relative flex-1'>
						{children}

						{/* luz de fim de tarde */}
						<div
							aria-hidden='true'
							className={cn(
								'pointer-events-none absolute inset-0 z-20',
								gallery ? 'animate-glow' : '',
							)}
							style={{
								background:
									'radial-gradient(78% 68% at 26% 0%, hsl(45 92% 80% / 0.22), transparent 72%)',
							}}
						/>
						{/* vinheta */}
						<div
							aria-hidden='true'
							className='pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_150px_30px_hsl(20_46%_7%/0.52)]'
						/>

						{/* plaqueta de latão */}
						<div className='pointer-events-none absolute top-4 left-4 z-30 sm:top-6 sm:left-6'>
							<div className='brass-plate flex items-center gap-3 rounded-[7px] px-3 py-2 ring-1 ring-[hsl(30_42%_26%/0.35)]'>
								<div>
									<p className='font-semibold text-[9px] uppercase tracking-[0.26em] opacity-70'>
										Coleção de
									</p>
									<p className='font-display font-semibold text-[13px] uppercase tracking-[0.14em]'>
										Certificados
									</p>
								</div>
								<span className='h-8 w-px bg-[hsl(var(--brass-ink)/0.25)]' />
								<div className='text-center'>
									<p className='font-display text-lg leading-none'>{count}</p>
									<p className='text-[9px] uppercase tracking-[0.16em] opacity-70'>de {total}</p>
								</div>
							</div>
						</div>

						{/* etiqueta de papel */}
						{!gallery && (
							<div className='pointer-events-none absolute right-5 bottom-5 z-30 hidden -rotate-2 sm:block'>
								<div className='paper-tag relative rounded-base px-4 py-2.5'>
									<span className='absolute -top-2 -left-5 h-4 w-12 rotate-[-18deg] bg-[hsl(var(--brass-light)/0.4)] shadow-[0_1px_2px_hsl(20_45%_10%/0.25)]' />
									<p className='font-hand text-lg leading-none'>arraste os pins à vontade</p>
									<p className='mt-1 text-[9px] text-paper-muted uppercase tracking-[0.2em]'>
										monte a coleção do seu jeito
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
