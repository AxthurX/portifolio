import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
	BOARD_VERSION,
	clamp,
	clamp01,
	loadBoard,
	type PlacedPin,
	pinsInBox,
	saveBoard,
	seedBoard,
} from '../lib/board-state';
import { PINS } from '../lib/pins';

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
const randomRotation = () => Math.round(randomBetween(-13, 13));

/** Grade com deslocamento: espalha os pins por igual, sem deixar ninguém na diagonal. */
const gridSlot = (index: number, total: number) => {
	const columns = Math.min(6, Math.max(2, Math.ceil(Math.sqrt(total * 1.7))));
	const rows = Math.ceil(total / columns);
	const row = Math.floor(index / columns);
	const column = index % columns;
	const offset = row % 2 === 0 ? 0 : 0.5;
	const usable = 0.68;
	const step = usable / Math.max(columns - 1 + offset, 1);
	return {
		x: clamp(0.17 + (column + offset) * step, 0.1, 0.9),
		y: rows === 1 ? 0.5 : clamp(0.22 + row * (0.56 / (rows - 1)), 0.14, 0.86),
	};
};

/** Mesmo grid, mas com um empurrão aleatório — usado para dar variedade. */
const freeSpot = (index: number, total: number) => {
	const slot = gridSlot(index, total);
	return {
		x: clamp(slot.x + randomBetween(-0.035, 0.035), 0.1, 0.9),
		y: clamp(slot.y + randomBetween(-0.035, 0.035), 0.14, 0.86),
	};
};

const tidyLayout = (count: number): Array<{ x: number; y: number }> =>
	Array.from({ length: count }, (_, index) => gridSlot(index, count));

export const usePinBoard = () => {
	const [placed, setPlaced] = useState<PlacedPin[]>(() => seedBoard().placed);
	const [pronto, setPronto] = useState(false);
	const zRef = useRef(placed.reduce((max, pin) => Math.max(max, pin.z), 0));

	useEffect(() => {
		const guardado = loadBoard();
		if (guardado && guardado.placed.length > 0) {
			setPlaced(guardado.placed);
			zRef.current = guardado.placed.reduce((max, pin) => Math.max(max, pin.z), 0);
		}
		setPronto(true);
	}, []);

	useEffect(() => {
		if (!pronto) return;
		zRef.current = placed.reduce((max, pin) => Math.max(max, pin.z), zRef.current);

		const timer = window.setTimeout(() => {
			saveBoard({ version: BOARD_VERSION, placed });
		}, 180);
		return () => window.clearTimeout(timer);
	}, [placed, pronto]);

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

	const placePin = useCallback((id: string) => {
		zRef.current += 1;
		const z = zRef.current;
		setPlaced((prev) => {
			if (prev.some((pin) => pin.id === id)) return prev;
			const spot = freeSpot(prev.length, prev.length + 1);
			return [...prev, { id, x: spot.x, y: spot.y, rotation: randomRotation(), z }];
		});
	}, []);

	const removePin = useCallback((id: string) => {
		setPlaced((prev) => prev.filter((pin) => pin.id !== id));
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
			const slots = tidyLayout(prev.length);
			return prev.map((pin, index) => ({
				...pin,
				x: slots[index]?.x ?? pin.x,
				y: slots[index]?.y ?? pin.y,
			}));
		});
	}, []);

	const shuffle = useCallback(() => {
		setPlaced((prev) => {
			const order = [...prev].sort(() => Math.random() - 0.5);
			return order.map((pin, index) => {
				const spot = freeSpot(index, prev.length);
				return {
					...pin,
					x: spot.x,
					y: spot.y,
					rotation: randomRotation(),
					z: index + 1,
				};
			});
		});
	}, []);

	const reset = useCallback(() => {
		const seeded = seedBoard();
		zRef.current = seeded.placed.reduce((max, pin) => Math.max(max, pin.z), 0);
		setPlaced(seeded.placed);
	}, []);

	const boxPins = useMemo(() => pinsInBox(placed, PINS), [placed]);

	return {
		placed,
		boxPins,
		total: PINS.length,
		count: placed.length,
		placePin,
		removePin,
		movePin,
		rotatePin,
		bringToFront,
		organize,
		shuffle,
		reset,
	};
};

export type PinBoardController = ReturnType<typeof usePinBoard>;
