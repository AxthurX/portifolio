import { PackageOpen } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	type BoardSize,
	clampToBoard,
	type PlacedPin,
	type PlacementPatch,
	pinPad,
} from '@/lib/board-state';
import { pinAltura, pinById } from '@/lib/pins';
import { PinItem } from './PinItem';

interface PinBoardProps {
	placed: PlacedPin[];
	selectedId: string | null;
	onMove: (id: string, x: number, y: number) => void;
	onBringToFront: (id: string) => void;
	onSelect: (id: string) => void;
	onRemove: (id: string) => void;
	onOpenBox: () => void;
	onDeselect: () => void;
	onReflow: (patches: PlacementPatch[]) => void;
}

const PIN_SCALES: Array<{ min: number; scale: number }> = [
	{ min: 1024, scale: 1.75 },
	{ min: 640, scale: 1.32 },
	{ min: 0, scale: 0.86 },
];

const scaleFor = (width: number) =>
	(PIN_SCALES.find((step) => width >= step.min) ?? PIN_SCALES[PIN_SCALES.length - 1]).scale;

export const PinBoard = ({
	placed,
	selectedId,
	onMove,
	onBringToFront,
	onSelect,
	onRemove,
	onOpenBox,
	onDeselect,
	onReflow,
}: PinBoardProps) => {
	const boardRef = useRef<HTMLDivElement>(null);
	const [board, setBoard] = useState<BoardSize>({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const el = boardRef.current;
		if (!el) return;

		const sync = () => {
			const rect = el.getBoundingClientRect();
			setBoard((prev) =>
				Math.abs(prev.width - rect.width) < 1 && Math.abs(prev.height - rect.height) < 1
					? prev
					: { width: rect.width, height: rect.height },
			);
		};

		sync();
		const observer = new ResizeObserver(sync);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const scale = scaleFor(board.width);

	useEffect(() => {
		if (board.width <= 0 || board.height <= 0) return;

		const patches: PlacementPatch[] = [];

		for (const placement of placed) {
			const pin = pinById(placement.id);
			if (!pin) continue;

			const size = Math.round(pin.diameter * scale);
			const pad = pinPad(size, pinAltura(size), placement.rotation, board);
			const next = clampToBoard(placement.x, placement.y, pad);

			if (Math.abs(next.x - placement.x) > 0.0005 || Math.abs(next.y - placement.y) > 0.0005) {
				patches.push({ id: placement.id, ...next });
			}
		}

		if (patches.length > 0) onReflow(patches);
	}, [board, scale, placed, onReflow]);

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
						size={Math.round(pin.diameter * scale)}
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
