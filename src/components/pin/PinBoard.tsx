import { PackageOpen } from 'lucide-react';
import { useRef } from 'react';
import type { PlacedPin } from '@/lib/board-state';
import { pinById } from '@/lib/pins';
import { PinItem } from './PinItem';

interface PinBoardProps {
	placed: PlacedPin[];
	selectedId: string | null;
	isMobile: boolean;
	onMove: (id: string, x: number, y: number) => void;
	onBringToFront: (id: string) => void;
	onSelect: (id: string) => void;
	onRemove: (id: string) => void;
	onOpenBox: () => void;
	onDeselect: () => void;
}

export const PinBoard = ({
	placed,
	selectedId,
	isMobile,
	onMove,
	onBringToFront,
	onSelect,
	onRemove,
	onOpenBox,
	onDeselect,
}: PinBoardProps) => {
	const boardRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={boardRef}
			className='absolute inset-0 z-10 touch-manipulation'
			onPointerDown={(event) => {
				if (event.target === event.currentTarget) onDeselect();
			}}
		>
			{placed.map((placement) => {
				const pin = pinById(placement.id);
				if (!pin) return null;
				return (
					<PinItem
						key={placement.id}
						pin={pin}
						placement={placement}
						boardRef={boardRef}
						size={Math.round(pin.diameter * (isMobile ? 0.46 : 1.4))}
						selected={selectedId === placement.id}
						onMove={onMove}
						onBringToFront={onBringToFront}
						onSelect={onSelect}
						onRemove={onRemove}
					/>
				);
			})}

			{placed.length === 0 && (
				<div className='absolute inset-0 z-12 flex items-center justify-center p-6'>
					<div className='flex max-w-sm flex-col items-center gap-3 rounded-[20px] border-2 border-[hsl(var(--paper)/0.42)] border-dashed bg-[hsl(22_38%_18%/0.18)] px-6 py-8 text-center backdrop-blur-[1px]'>
						<span className='grid h-12 w-12 place-items-center rounded-full bg-[hsl(var(--paper)/0.14)] text-[hsl(var(--paper)/0.9)]'>
							<PackageOpen className='h-6 w-6' strokeWidth={1.6} />
						</span>
						<p className='font-display text-[hsl(var(--paper)/0.94)] text-xl'>Quadro vazio</p>
						<p className='text-[hsl(var(--paper)/0.7)] text-sm leading-snug'>
							A coleção está guardada na caixa. Pendure o primeiro pin e comece a montar.
						</p>
						<button
							type='button'
							onClick={onOpenBox}
							className='mt-1 rounded-full bg-[hsl(var(--paper)/0.92)] px-4 py-2 font-semibold text-[hsl(var(--paper-ink))] text-sm transition hover:bg-[hsl(var(--paper))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brass-light))]'
						>
							Abrir a caixa
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
