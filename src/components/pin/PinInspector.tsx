import { ExternalLink, PackageOpen, RotateCcw, RotateCw, X } from 'lucide-react';
import { PinArt } from '@/lib/pin-art';
import type { PinDefinition } from '@/lib/pins';
import { cn } from '@/lib/utils';

interface PinInspectorProps {
	pin: PinDefinition;
	visivel: boolean;
	onClose: () => void;
	onRotate: (delta: number) => void;
	onRemove: () => void;
}

const action_class =
	'flex items-center gap-1.5 rounded-base border-2 border-black bg-base-100 px-2.5 py-1.5 font-semibold text-[11px] text-muted-foreground shadow-light transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white dark:shadow-dark';

export const PinInspector = ({ pin, visivel, onClose, onRotate, onRemove }: PinInspectorProps) => (
	<aside className='fixed inset-x-4 bottom-22 z-40 animate-fade-up sm:inset-x-auto sm:bottom-24 sm:left-8 sm:w-110'>
		<div
			className={cn(
				'relative rounded-lg border-2 border-black bg-base-100 p-4 shadow-light transition-all duration-500 dark:border-white dark:shadow-dark',
				visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
			)}
		>
			<button
				type='button'
				onClick={onClose}
				aria-label='Fechar ficha do pin'
				className='absolute top-2.5 right-2.5 rounded-base border-2 border-black bg-base-100 p-1.5 text-muted-foreground shadow-light transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white dark:shadow-dark'
			>
				<X className='h-4 w-4' />
			</button>

			<div className='flex gap-3'>
				<div className='w-38 shrink-0 -rotate-2'>
					<PinArt
						image={pin.image}
						sizes='162px'
						icon={pin.icon}
						shape={pin.shape}
						enamel={pin.enamel}
						metal={pin.metal}
						size={160}
						className='drop-shadow-[0_6px_6px_hsl(20_45%_10%/0.3)]'
					/>
				</div>
				<div className='min-w-0 p-5 pt-0.5'>
					<p className='font-semibold text-[9px] text-muted-foreground uppercase tracking-[0.22em]'>
						{pin.series} · {pin.year}
					</p>
					<h2 className='font-semibold font-serif text-[19px] text-foreground leading-tight'>
						{pin.name}
					</h2>
					<p className='mt-0.5 text-[11px] text-muted-foreground'>{pin.date}</p>
					<p className='mt-1 text-[12px] text-muted-foreground leading-snug'>{pin.note}</p>
					<a
						href={pin.source}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-2 inline-flex items-center gap-1 font-semibold text-[11px] text-primary underline decoration-dotted underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
					>
						<ExternalLink className='h-3 w-3' />
						Ver certificado completo
					</a>
				</div>
			</div>

			<div className='mt-3 flex flex-wrap items-center gap-1.5 border-black border-t-2 pt-3 dark:border-white'>
				<button
					type='button'
					onClick={() => onRotate(-15)}
					className={action_class}
					aria-label='Girar 15 graus para a esquerda'
				>
					<RotateCcw className='h-3.5 w-3.5' />
					Girar
				</button>
				<button
					type='button'
					onClick={() => onRotate(15)}
					className={action_class}
					aria-label='Girar 15 graus para a direita'
				>
					<RotateCw className='h-3.5 w-3.5' />
					Girar
				</button>
				<button type='button' onClick={onRemove} className={`${action_class} ml-auto`}>
					<PackageOpen className='h-3.5 w-3.5' />
					Guardar
				</button>
			</div>
		</div>
	</aside>
);
