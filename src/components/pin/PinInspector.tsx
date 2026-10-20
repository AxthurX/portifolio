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
	'flex items-center gap-1.5 rounded-full border border-[hsl(var(--paper-ink)/0.18)] px-2.5 py-1.5 text-[11px] font-semibold text-[hsl(var(--paper-ink)/0.82)] transition-colors hover:border-[hsl(var(--paper-ink)/0.35)] hover:bg-[hsl(var(--paper-ink)/0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--paper-ink)/0.35)]';

export const PinInspector = ({ pin, onClose, onRotate, onRemove }: PinInspectorProps) => (
	<aside className='fixed inset-x-4 bottom-22 z-40 animate-fade-up sm:inset-x-auto sm:bottom-24 sm:left-8 sm:w-105'>
		<div className='paper-tag relative rounded-2xl p-4 ring-1 ring-[hsl(30_30%_30%/0.12)]'>
			<span
				aria-hidden='true'
				className='absolute -top-2 left-9 h-4 w-14 -rotate-3 rounded-xs bg-[hsl(var(--brass-light)/0.45)] shadow-[0_1px_3px_hsl(20_45%_10%/0.25)]'
			/>

			<button
				type='button'
				onClick={onClose}
				aria-label='Fechar ficha do pin'
				className='absolute top-2.5 right-2.5 rounded-full p-1.5 text-[hsl(var(--paper-muted))] transition-colors hover:bg-[hsl(var(--paper-ink)/0.08)] hover:text-[hsl(var(--paper-ink))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--paper-ink)/0.3)]'
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
					<p className='font-semibold text-[9px] text-[hsl(var(--paper-muted))] uppercase tracking-[0.22em]'>
						{pin.series} · {pin.year}
					</p>
					<h2 className='font-display font-semibold text-[19px] text-[hsl(var(--paper-ink))] leading-tight'>
						{pin.name}
					</h2>
					<p className='mt-0.5 text-[11px] text-[hsl(var(--paper-muted))]'>{pin.date}</p>
					<p className='mt-1 text-[12px] text-[hsl(var(--paper-muted))] leading-snug'>{pin.note}</p>
					<a
						href={pin.source}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-2 inline-flex items-center gap-1 font-semibold text-[11px] text-[hsl(var(--paper-ink)/0.85)] underline decoration-dotted underline-offset-4 transition-colors hover:text-[hsl(var(--paper-ink))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--paper-ink)/0.35)]'
					>
						<ExternalLink className='h-3 w-3' />
						Ver certificado completo
					</a>
				</div>
			</div>

			<div className='mt-3 flex flex-wrap items-center gap-1.5 border-[hsl(var(--paper-ink)/0.12)] border-t pt-3'>
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
