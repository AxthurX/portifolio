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
						size={Math.round(pin.diameter * (isMobile ? 0.46 : 1.753))}
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
					<div className='flex max-w-sm flex-col items-center gap-3 rounded-lg border-2 border-black border-dashed bg-muted/40 px-6 py-8 text-center shadow-light dark:border-white dark:shadow-dark'>
						<span className='grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary'>
							<PackageOpen className='h-6 w-6' strokeWidth={1.6} />
						</span>
						<p className='font-serif text-foreground text-xl'>Quadro vazio</p>
						<p className='text-muted-foreground text-sm leading-snug'>
							A coleção está guardada na caixa. Pendure o primeiro pin e comece a montar.
						</p>
						<button
							type='button'
							onClick={onOpenBox}
							className='mt-1 rounded-base border-2 border-black bg-primary px-4 py-2 font-semibold text-primary-foreground text-sm shadow-light transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none dark:border-white dark:shadow-dark'
						>
							Abrir a caixa
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
