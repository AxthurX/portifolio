import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
	BOARD_VERSION,
	clamp,
	clamp01,
	type LayoutMode,
	loadBoard,
	type PlacedPin,
	type PlacementPatch,
	pinsInBox,
	saveBoard,
	seedBoard,
} from '../lib/board-state';
import { PINS } from '../lib/pins';

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
const randomRotation = () => Math.round(randomBetween(-13, 13));

/** Grade com deslocamento: espalha os pins por igual, sem deixar ninguém na diagonal. */
const X_MIN = 0.16;
const X_MAX = 0.84;
const Y_MIN = 0.24;
const Y_MAX = 0.76;

const gridSlot = (index: number, total: number, columns?: number) => {
	const cols = columns ?? Math.min(6, Math.max(2, Math.ceil(Math.sqrt(total * 1.7))));
	const rows = Math.ceil(total / cols);
	const row = Math.floor(index / cols);
	const column = index % cols;
	const offset = row % 2 === 0 ? 0 : 0.5;
	const step = (X_MAX - X_MIN) / Math.max(cols - 1 + offset, 1);
	return {
		x: clamp(X_MIN + (column + offset) * step, X_MIN, X_MAX),
		y: rows === 1 ? 0.5 : clamp(Y_MIN + row * ((Y_MAX - Y_MIN) / (rows - 1)), Y_MIN, Y_MAX),
	};
};

/** Mesmo grid, mas com um empurrão aleatório — usado para dar variedade. */
const freeSpot = (index: number, total: number, columns?: number) => {
	const slot = gridSlot(index, total, columns);
	return {
		x: clamp(slot.x + randomBetween(-0.03, 0.03), X_MIN, X_MAX),
		y: clamp(slot.y + randomBetween(-0.03, 0.03), Y_MIN, Y_MAX),
	};
};

const tidyLayout = (count: number, columns?: number): Array<{ x: number; y: number }> =>
	Array.from({ length: count }, (_, index) => gridSlot(index, count, columns));

export const usePinBoard = (mode: LayoutMode = 'wide') => {
	const columns = mode === 'compact' ? 2 : undefined;
	const [placed, setPlaced] = useState<PlacedPin[]>(() => seedBoard(mode).placed);
	const [pronto, setPronto] = useState(false);
	const zRef = useRef(placed.reduce((max, pin) => Math.max(max, pin.z), 0));

	useEffect(() => {
		const guardado = loadBoard(mode);
		const inicial =
			guardado && guardado.placed.length > 0 ? guardado.placed : seedBoard(mode).placed;
		setPlaced(inicial);
		zRef.current = inicial.reduce((max, pin) => Math.max(max, pin.z), 0);
		setPronto(true);
	}, [mode]);

	useEffect(() => {
		if (!pronto) return;
		zRef.current = placed.reduce((max, pin) => Math.max(max, pin.z), zRef.current);

		const timer = window.setTimeout(() => {
			saveBoard(mode, { version: BOARD_VERSION, placed });
		}, 180);
		return () => window.clearTimeout(timer);
	}, [placed, pronto, mode]);

	const bringToFront = useCallback((id: string) => {
		zRef.current += 1;
		const z = zRef.current;
		setPlaced((prev) => prev.map((pin) => (pin.id === id ? { ...pin, z } : pin)));
	}, []);

	const movePin = useCallback((id: string, x: number, y: number) => {
		setPlaced((prev) => {
			const nx = clamp01(x);
			const ny = clamp01(y);
			const current = prev.find((pin) => pin.id === id);
			if (!current || (Math.abs(current.x - nx) < 0.0005 && Math.abs(current.y - ny) < 0.0005)) {
				return prev;
			}
			return prev.map((pin) => (pin.id === id ? { ...pin, x: nx, y: ny } : pin));
		});
	}, []);

	const placePin = useCallback(
		(id: string) => {
			zRef.current += 1;
			const z = zRef.current;
			setPlaced((prev) => {
				if (prev.some((pin) => pin.id === id)) return prev;
				const spot = freeSpot(prev.length, prev.length + 1, columns);
				return [...prev, { id, x: spot.x, y: spot.y, rotation: randomRotation(), z }];
			});
		},
		[columns],
	);

	const removePin = useCallback((id: string) => {
		setPlaced((prev) => prev.filter((pin) => pin.id !== id));
	}, []);

	const reflow = useCallback((patches: PlacementPatch[]) => {
		if (patches.length === 0) return;
		const byId = new Map(patches.map((patch) => [patch.id, patch]));
		setPlaced((prev) => {
			let changed = false;
			const next = prev.map((pin) => {
				const patch = byId.get(pin.id);
				if (!patch) return pin;
				if (Math.abs(patch.x - pin.x) < 0.0005 && Math.abs(patch.y - pin.y) < 0.0005) return pin;
				changed = true;
				return { ...pin, x: patch.x, y: patch.y };
			});
			return changed ? next : prev;
		});
	}, []);

	const rotatePin = useCallback((id: string, delta: number) => {
		setPlaced((prev) =>
			prev.map((pin) =>
				pin.id === id
					? { ...pin, rotation: ((((pin.rotation + delta + 180) % 360) + 360) % 360) - 180 }
					: pin,
			),
		);
	}, []);

	const organize = useCallback(() => {
		setPlaced((prev) => {
			const slots = tidyLayout(prev.length, columns);
			return prev.map((pin, index) => ({
				...pin,
				x: slots[index]?.x ?? pin.x,
				y: slots[index]?.y ?? pin.y,
			}));
		});
	}, [columns]);

	const shuffle = useCallback(() => {
		setPlaced((prev) => {
			const order = [...prev].sort(() => Math.random() - 0.5);
			return order.map((pin, index) => {
				const spot = freeSpot(index, prev.length, columns);
				return {
					...pin,
					x: spot.x,
					y: spot.y,
					rotation: randomRotation(),
					z: index + 1,
				};
			});
		});
	}, [columns]);

	const reset = useCallback(() => {
		const seeded = seedBoard(mode);
		zRef.current = seeded.placed.reduce((max, pin) => Math.max(max, pin.z), 0);
		setPlaced(seeded.placed);
	}, [mode]);

	const boxPins = useMemo(() => pinsInBox(placed, PINS), [placed]);

	return {
		placed,
		boxPins,
		total: PINS.length,
		count: placed.length,
		placePin,
		removePin,
		movePin,
		reflow,
		rotatePin,
		bringToFront,
		organize,
		shuffle,
		reset,
	};
};

export type PinBoardController = ReturnType<typeof usePinBoard>;
