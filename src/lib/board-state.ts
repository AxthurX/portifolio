import { type PinDefinition, pinById, SEED_PLACEMENTS } from './pins';

export type LayoutMode = 'compact' | 'wide';

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

export const BOARD_VERSION = 6;
const STORAGE_KEY = (mode: LayoutMode) => `quadro-pins:v${BOARD_VERSION}:${mode}`;

export const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export const clamp01 = (value: number) => clamp(value, 0, 1);

export interface BoardSize {
	width: number;
	height: number;
}

export interface PinPad {
	x: number;
	y: number;
}

export interface PlacementPatch {
	id: string;
	x: number;
	y: number;
}

/** meia-extensão visual do pin, já contando a rotação aplicada. */
const halfExtents = (size: number, altura: number, rotation: number) => {
	const rad = (rotation * Math.PI) / 180;
	const cos = Math.abs(Math.cos(rad));
	const sin = Math.abs(Math.sin(rad));
	return { x: (size * cos + altura * sin) / 2, y: (size * sin + altura * cos) / 2 };
};

/** folga normalizada para o centro do pin nunca deixar o pin sair do quadro. */
export const pinPad = (
	size: number,
	altura: number,
	rotation: number,
	board: BoardSize,
): PinPad => {
	if (board.width <= 0 || board.height <= 0) return { x: 0, y: 0 };
	const half = halfExtents(size, altura, rotation);
	return {
		x: clamp(half.x / board.width, 0, 0.45),
		y: clamp(half.y / board.height, 0, 0.45),
	};
};

export const clampToBoard = (x: number, y: number, pad: PinPad) => ({
	x: clamp(x, pad.x, 1 - pad.x),
	y: clamp(y, pad.y, 1 - pad.y),
});

/** no celular o quadro é estreito: duas colunas cabem, quatro não. */
const COMPACT_COLUMNS = 2;

const compactSeed = (): typeof SEED_PLACEMENTS => {
	const rows = Math.ceil(SEED_PLACEMENTS.length / COMPACT_COLUMNS);

	return SEED_PLACEMENTS.map((seed, index) => {
		const row = Math.floor(index / COMPACT_COLUMNS);
		const column = index % COMPACT_COLUMNS;
		return {
			id: seed.id,
			x: column === 0 ? 0.26 : 0.74,
			y: rows === 1 ? 0.5 : 0.14 + row * (0.72 / (rows - 1)),
			rotation: seed.rotation,
		};
	});
};

export const seedBoard = (mode: LayoutMode = 'wide'): BoardState => {
	const placements: PlacedPin[] = [];
	const seeds = mode === 'compact' ? compactSeed() : SEED_PLACEMENTS;

	seeds.forEach((seed) => {
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

export const loadBoard = (mode: LayoutMode = 'wide'): BoardState | null => {
	if (typeof window === 'undefined') return null;

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY(mode));
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

export const saveBoard = (mode: LayoutMode, state: BoardState) => {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY(mode), JSON.stringify(state));
	} catch {}
};

export const isPlaced = (placed: PlacedPin[], id: string) => placed.some((item) => item.id === id);

export const pinsInBox = (placed: PlacedPin[], all: PinDefinition[]) =>
	all.filter((pin) => !isPlaced(placed, pin.id));
