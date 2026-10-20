import {
	type KeyboardEvent,
	memo,
	type PointerEvent,
	type RefObject,
	useRef,
	useState,
} from 'react';
import { clamp, type PlacedPin } from '@/lib/board-state';
import { PinArt } from '@/lib/pin-art';
import { type PinDefinition, pinAltura } from '@/lib/pins';
import { cn } from '@/lib/utils';

interface PinItemProps {
	pin: PinDefinition;
	placement: PlacedPin;
	boardRef: RefObject<HTMLDivElement | null>;
	size: number;
	selected: boolean;
	onMove: (id: string, x: number, y: number) => void;
	onBringToFront: (id: string) => void;
	onSelect: (id: string) => void;
	onRemove: (id: string) => void;
}

interface DragStart {
	pointerX: number;
	pointerY: number;
	x: number;
	y: number;
	rect: DOMRect;
	moved: boolean;
}

const DRAG_THRESHOLD = 4;

const PinItemBase = ({
	pin,
	placement,
	boardRef,
	size,
	selected,
	onMove,
	onBringToFront,
	onSelect,
	onRemove,
}: PinItemProps) => {
	const dragRef = useRef<DragStart | null>(null);
	const [dragging, setDragging] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [tilt, setTilt] = useState(0);

	const altura = pinAltura(size);

	const paddingFor = (rect: DOMRect) => ({
		x: clamp(size / 2 / rect.width, 0, 0.45),
		y: clamp(altura / 2 / rect.height, 0, 0.45),
	});

	const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		const board = boardRef.current;
		if (!board) return;

		event.currentTarget.setPointerCapture(event.pointerId);
		event.currentTarget.focus({ preventScroll: true });
		dragRef.current = {
			pointerX: event.clientX,
			pointerY: event.clientY,
			x: placement.x,
			y: placement.y,
			rect: board.getBoundingClientRect(),
			moved: false,
		};
		setDragging(true);
		setTilt(0);
		onBringToFront(pin.id);
	};

	const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
		const start = dragRef.current;
		if (!start) return;

		const dx = event.clientX - start.pointerX;
		const dy = event.clientY - start.pointerY;
		if (!start.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
			start.moved = true;
		}

		const pad = paddingFor(start.rect);
		onMove(
			pin.id,
			clamp(start.x + dx / start.rect.width, pad.x, 1 - pad.x),
			clamp(start.y + dy / start.rect.height, pad.y, 1 - pad.y),
		);
		setTilt(clamp(dx / 22, -9, 9));
	};

	const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
		const start = dragRef.current;
		if (!start) return;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		dragRef.current = null;
		setDragging(false);
		setTilt(0);
		if (!start.moved) onSelect(pin.id);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		const board = boardRef.current;
		if (!board) return;

		const rect = board.getBoundingClientRect();
		const pad = paddingFor(rect);
		const step = event.shiftKey ? 24 : 6;
		const moves: Record<string, [number, number]> = {
			ArrowLeft: [-step, 0],
			ArrowRight: [step, 0],
			ArrowUp: [0, -step],
			ArrowDown: [0, step],
		};

		const move = moves[event.key];
		if (move) {
			event.preventDefault();
			onBringToFront(pin.id);
			onMove(
				pin.id,
				clamp(placement.x + move[0] / rect.width, pad.x, 1 - pad.x),
				clamp(placement.y + move[1] / rect.height, pad.y, 1 - pad.y),
			);
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onSelect(pin.id);
		}

		if (event.key === 'Delete' || event.key === 'Backspace') {
			event.preventDefault();
			onRemove(pin.id);
		}
	};

	const scale = dragging ? 1.08 : hovered ? 1.04 : 1;

	return (
		<div
			className='absolute select-none'
			style={{
				left: `${placement.x * 100}%`,
				top: `${placement.y * 100}%`,
				transform: 'translate(-50%, -50%)',
				zIndex: dragging ? 400 : placement.z,
			}}
		>
			<button
				type='button'
				aria-label={`${pin.name}, ${pin.series} de ${pin.year}. Arraste ou use as setas para mover.`}
				aria-pressed={selected}
				draggable={false}
				onDragStart={(event) => event.preventDefault()}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
				onKeyDown={handleKeyDown}
				onPointerEnter={() => setHovered(true)}
				onPointerLeave={() => setHovered(false)}
				className={cn(
					'group block touch-none rounded-[6px] outline-none',
					dragging ? 'cursor-grabbing' : 'cursor-grab',
					'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-transparent',
				)}
				style={{
					transform: `rotate(${placement.rotation + tilt}deg) scale(${scale})`,
					transition: dragging
						? 'none'
						: 'transform 280ms var(--ease-settle), filter 280ms var(--ease-settle)',
					filter: dragging
						? 'drop-shadow(0 24px 18px hsl(20 50% 4% / 0.6))'
						: selected
							? 'drop-shadow(0 14px 12px hsl(20 45% 5% / 0.5))'
							: 'drop-shadow(0 9px 8px hsl(20 45% 5% / 0.42))',
				}}
			>
				<PinArt
					image={pin.image}
					imageSrcSet={pin.imageSrcSet}
					sizes={`${size}px`}
					label={pin.name}
					icon={pin.icon}
					shape={pin.shape}
					enamel={pin.enamel}
					metal={pin.metal}
					size={size}
					selected={selected}
					className='animate-pin-arrive'
				/>
			</button>
		</div>
	);
};

/**
 * Memoizado: arrastar um pin re-renderiza o quadro inteiro, e sem memo cada
 * foto seria reconciliada a cada movimento do ponteiro.
 */
export const PinItem = memo(PinItemBase);
