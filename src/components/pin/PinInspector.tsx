import { ExternalLink, PackageOpen, RotateCcw, RotateCw, X } from 'lucide-react';
import { PinArt } from '@/lib/pin-art';
import type { PinDefinition } from '@/lib/pins';

interface PinInspectorProps {
	pin: PinDefinition;
	onClose: () => void;
	onRotate: (delta: number) => void;
	onRemove: () => void;
}

const actionClass =
	'flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 font-semibold text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const PinInspector = ({ pin, onClose, onRotate, onRemove }: PinInspectorProps) => (
	<aside className='fixed inset-x-4 bottom-22 z-40 animate-fade-up sm:inset-x-auto sm:bottom-24 sm:left-8 sm:w-105'>
		<div className='relative rounded-2xl border border-border bg-base-100/95 p-4 shadow-xl backdrop-blur'>
			<button
				type='button'
				onClick={onClose}
				aria-label='Fechar ficha do pin'
				className='absolute top-2.5 right-2.5 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
			>
				<X className='h-4 w-4' />
			</button>

			<div className='flex gap-3'>
				<div className='w-38 shrink-0 -rotate-2'>
					<PinArt
						image={pin.image}
						imageSrcSet={pin.imageSrcSet}
						sizes='152px'
						icon={pin.icon}
						shape={pin.shape}
						enamel={pin.enamel}
						metal={pin.metal}
						size={152}
						className='drop-shadow-[0_6px_6px_hsl(20_45%_10%/0.3)]'
					/>
				</div>
				<div className='min-w-0 pt-0.5 pr-5'>
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

			<div className='mt-3 flex flex-wrap items-center gap-1.5 border-border border-t pt-3'>
				<button
					type='button'
					onClick={() => onRotate(-15)}
					className={actionClass}
					aria-label='Girar 15 graus para a esquerda'
				>
					<RotateCcw className='h-3.5 w-3.5' />
					Girar
				</button>
				<button
					type='button'
					onClick={() => onRotate(15)}
					className={actionClass}
					aria-label='Girar 15 graus para a direita'
				>
					<RotateCw className='h-3.5 w-3.5' />
					Girar
				</button>
				<button type='button' onClick={onRemove} className={`${actionClass} ml-auto`}>
					<PackageOpen className='h-3.5 w-3.5' />
					Guardar
				</button>
			</div>
		</div>
	</aside>
);
