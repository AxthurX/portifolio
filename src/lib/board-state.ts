import { type PinDefinition, pinById, SEED_PLACEMENTS } from './pins';

export interface PlacedPin {
	id: string;
	x: number;
	y: number;
	rotation: number;
	z: number;
}

export interface BoardState {
	version: number;
	placed: PlacedPin[];
}

export const BOARD_VERSION = 5;
const STORAGE_KEY = 'quadro-pins:v5';

export const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export const clamp01 = (value: number) => clamp(value, 0, 1);

export const seedBoard = (): BoardState => {
	const placements: PlacedPin[] = [];

	SEED_PLACEMENTS.forEach((seed) => {
		if (!pinById(seed.id)) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn(`[quadro] pin desconhecido no SEED_PLACEMENTS: "${seed.id}"`);
			}
			return;
		}
		placements.push({
			id: seed.id,
			x: seed.x,
			y: seed.y,
			rotation: seed.rotation,
			z: placements.length + 1,
		});
	});

	return { version: BOARD_VERSION, placed: placements };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

export const loadBoard = (): BoardState | null => {
	if (typeof window === 'undefined') return null;

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed: unknown = JSON.parse(raw);
		if (!isRecord(parsed) || parsed.version !== BOARD_VERSION || !Array.isArray(parsed.placed)) {
			return null;
		}

		const seen = new Set<string>();
		const placed: PlacedPin[] = [];

		for (const entry of parsed.placed) {
			if (!isRecord(entry) || typeof entry.id !== 'string') continue;
			if (seen.has(entry.id) || !pinById(entry.id)) continue;

			const x = Number(entry.x);
			const y = Number(entry.y);
			const rotation = Number(entry.rotation);
			const z = Number(entry.z);

			if (!Number.isFinite(x) || !Number.isFinite(y)) continue;

			seen.add(entry.id);
			placed.push({
				id: entry.id,
				x: clamp01(x),
				y: clamp01(y),
				rotation: Number.isFinite(rotation) ? rotation : 0,
				z: Number.isFinite(z) ? z : placed.length + 1,
			});
		}

		return { version: BOARD_VERSION, placed };
	} catch {
		return null;
	}
};

export const saveBoard = (state: BoardState) => {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {}
};

export const isPlaced = (placed: PlacedPin[], id: string) => placed.some((item) => item.id === id);

export const pinsInBox = (placed: PlacedPin[], all: PinDefinition[]) =>
	all.filter((pin) => !isPlaced(placed, pin.id));
