import {
	Bird,
	Cat,
	Coffee,
	Compass,
	Disc3,
	Guitar,
	Heart,
	Leaf,
	type LucideIcon,
	Moon,
	Mountain,
	Rocket,
	Sprout,
	Star,
	Waves,
} from 'lucide-react';

import { CERTIFICADOS } from './certificados.data';

export type PinShape = 'round' | 'hex' | 'shield' | 'squircle';
export type MetalKey = 'gold' | 'silver' | 'copper' | 'nickel';
export type EnamelKey =
	| 'cream'
	| 'terracotta'
	| 'forest'
	| 'mustard'
	| 'ink'
	| 'olive'
	| 'night'
	| 'rust'
	| 'teal'
	| 'honey'
	| 'rose'
	| 'plum'
	| 'sage';
export type IconKey =
	| 'bird'
	| 'coffee'
	| 'mountain'
	| 'vinyl'
	| 'cat'
	| 'sprout'
	| 'moon'
	| 'rocket'
	| 'compass'
	| 'waves'
	| 'guitar'
	| 'heart'
	| 'leaf'
	| 'star';

export interface PinDefinition {
	id: string;
	name: string;
	series: string;
	year: number;
	/** data de conclusão por extenso */
	date: string;
	note: string;
	/** miniatura WebP do certificado (usada no quadro e na caixa) */
	image: string;
	/** conjunto responsivo da miniatura */
	imageSrcSet: string;
	/** certificado original, aberto em nova aba */
	source: string;
	/** largura base do pin, em px */
	diameter: number;
	/** arte esmaltada — usada só quando o pin não tem imagem */
	shape: PinShape;
	enamel: EnamelKey;
	metal: MetalKey;
	icon: IconKey;
}

export interface SeedPlacement {
	id: string;
	x: number;
	y: number;
	rotation: number;
}

/** proporção do quadro (√2): a mesma do papel deitado, como um pin de verdade. */
export const PIN_ASPECT = Math.SQRT2;

/** margem da moldura de papel em volta da foto (relativa à largura do pin). */
export const PIN_MARGIN_RATIO = 0.05;

/** altura da faixa com o título, no estilo polaroid (relativa à largura). */
export const PIN_CAPTION_RATIO = 0.22;

/** Altura total do pin, contando a moldura e (opcionalmente) a legenda. */
export const pinAltura = (size: number, comLegenda = true) => {
	const foto = Math.round(size / PIN_ASPECT);
	if (!comLegenda) return foto;
	const margem = Math.round(size * PIN_MARGIN_RATIO);
	const legenda = Math.max(20, Math.round(size * PIN_CAPTION_RATIO));
	return margem + foto + legenda;
};

const METAL_CYCLE: MetalKey[] = ['gold', 'silver', 'copper', 'nickel'];
const SHAPE_CYCLE: PinShape[] = ['round', 'squircle', 'shield', 'hex'];
const ENAMEL_CYCLE: EnamelKey[] = [
	'cream',
	'forest',
	'terracotta',
	'ink',
	'teal',
	'honey',
	'night',
	'plum',
	'sage',
	'rose',
	'rust',
	'mustard',
	'olive',
];
const ICON_CYCLE: IconKey[] = [
	'bird',
	'coffee',
	'mountain',
	'vinyl',
	'cat',
	'sprout',
	'moon',
	'rocket',
	'compass',
	'waves',
	'guitar',
	'heart',
	'leaf',
	'star',
];

/** Escolhe um item do ciclo de forma estável a partir do id. */
const escolher = <T>(ciclo: T[], id: string, deslocamento = 0): T => {
	let soma = deslocamento;
	for (let i = 0; i < id.length; i++) soma = (soma + id.charCodeAt(i) * (i + 1)) % 9973;
	return ciclo[soma % ciclo.length];
};

export const PINS: PinDefinition[] = CERTIFICADOS.map((certificado, index) => ({
	id: certificado.id,
	name: certificado.titulo,
	series: certificado.emissor,
	year: certificado.ano,
	date: certificado.data,
	note: certificado.nota,
	image: certificado.imagem,
	imageSrcSet: certificado.imagemSrcSet,
	source: certificado.original,
	diameter: 134 + (index % 5) * 9,
	shape: escolher(SHAPE_CYCLE, certificado.id),
	enamel: escolher(ENAMEL_CYCLE, certificado.id),
	metal: escolher(METAL_CYCLE, certificado.id, index),
	icon: escolher(ICON_CYCLE, certificado.id, index),
}));

export const PIN_BY_ID: Record<string, PinDefinition> = PINS.reduce<Record<string, PinDefinition>>(
	(acc, pin) => {
		acc[pin.id] = pin;
		return acc;
	},
	{},
);

export const pinById = (id: string): PinDefinition | undefined => PIN_BY_ID[id];

export const SEED_PLACEMENTS: SeedPlacement[] = [
	{ id: 'alura-html5-e-css3-parte-1-crie-uma-pagina-da-web', x: 0.17, y: 0.19, rotation: -5 },
	{ id: 'coursera-agile-project-management', x: 0.4, y: 0.17, rotation: 6 },
	{ id: 'alura-formacao-front-end', x: 0.63, y: 0.2, rotation: -4 },
	{ id: 'coursera-google-project-management', x: 0.84, y: 0.18, rotation: 5 },
	{ id: 'alura-javascript-explorando-a-linguagem', x: 0.51, y: 0.44, rotation: 7 },
	{ id: 'senai-tecnologia-da-informacao-e-comunicacao', x: 0.74, y: 0.47, rotation: -6 },
	{ id: 'alura-css-grid-simplificando-layouts', x: 0.19, y: 0.75, rotation: 4 },
	{
		id: 'udemy-sql-server-para-desenvolvedores-do-basico-ao-avancado',
		x: 0.43,
		y: 0.77,
		rotation: -3,
	},
];

type MetalRecipe = { light: string; mid: string; dark: string };
type EnamelRecipe = { light: string; base: string; dark: string; line: string };

export const METALS: Record<MetalKey, MetalRecipe> = {
	gold: { light: 'hsl(46 72% 84%)', mid: 'hsl(41 55% 60%)', dark: 'hsl(33 42% 33%)' },
	silver: { light: 'hsl(210 14% 93%)', mid: 'hsl(210 10% 73%)', dark: 'hsl(214 10% 46%)' },
	copper: { light: 'hsl(26 72% 80%)', mid: 'hsl(21 55% 56%)', dark: 'hsl(15 45% 31%)' },
	nickel: { light: 'hsl(220 10% 52%)', mid: 'hsl(220 10% 29%)', dark: 'hsl(222 14% 13%)' },
};

const CREAM_LINE = 'hsl(42 46% 90%)';
const INK_LINE = 'hsl(30 32% 20%)';

export const ENAMELS: Record<EnamelKey, EnamelRecipe> = {
	cream: {
		light: 'hsl(42 48% 95%)',
		base: 'hsl(38 38% 87%)',
		dark: 'hsl(34 28% 72%)',
		line: INK_LINE,
	},
	terracotta: {
		light: 'hsl(18 64% 63%)',
		base: 'hsl(14 52% 48%)',
		dark: 'hsl(10 46% 32%)',
		line: CREAM_LINE,
	},
	forest: {
		light: 'hsl(152 30% 44%)',
		base: 'hsl(152 27% 30%)',
		dark: 'hsl(154 30% 19%)',
		line: CREAM_LINE,
	},
	mustard: {
		light: 'hsl(46 82% 66%)',
		base: 'hsl(43 66% 51%)',
		dark: 'hsl(38 58% 34%)',
		line: INK_LINE,
	},
	ink: {
		light: 'hsl(230 14% 29%)',
		base: 'hsl(230 16% 18%)',
		dark: 'hsl(232 20% 9%)',
		line: CREAM_LINE,
	},
	olive: {
		light: 'hsl(82 28% 47%)',
		base: 'hsl(80 26% 35%)',
		dark: 'hsl(78 28% 22%)',
		line: CREAM_LINE,
	},
	night: {
		light: 'hsl(216 48% 37%)',
		base: 'hsl(218 45% 26%)',
		dark: 'hsl(220 45% 15%)',
		line: CREAM_LINE,
	},
	rust: {
		light: 'hsl(22 66% 55%)',
		base: 'hsl(19 58% 41%)',
		dark: 'hsl(16 52% 26%)',
		line: CREAM_LINE,
	},
	teal: {
		light: 'hsl(186 44% 43%)',
		base: 'hsl(188 42% 31%)',
		dark: 'hsl(190 44% 19%)',
		line: CREAM_LINE,
	},
	honey: {
		light: 'hsl(36 76% 62%)',
		base: 'hsl(33 62% 46%)',
		dark: 'hsl(28 52% 30%)',
		line: CREAM_LINE,
	},
	rose: {
		light: 'hsl(352 68% 76%)',
		base: 'hsl(350 52% 62%)',
		dark: 'hsl(346 40% 44%)',
		line: INK_LINE,
	},
	plum: {
		light: 'hsl(300 24% 42%)',
		base: 'hsl(300 22% 29%)',
		dark: 'hsl(302 24% 17%)',
		line: CREAM_LINE,
	},
	sage: {
		light: 'hsl(120 18% 62%)',
		base: 'hsl(120 15% 49%)',
		dark: 'hsl(122 16% 33%)',
		line: INK_LINE,
	},
};

export const PIN_ICONS: Record<IconKey, LucideIcon> = {
	bird: Bird,
	coffee: Coffee,
	mountain: Mountain,
	vinyl: Disc3,
	cat: Cat,
	sprout: Sprout,
	moon: Moon,
	rocket: Rocket,
	compass: Compass,
	waves: Waves,
	guitar: Guitar,
	heart: Heart,
	leaf: Leaf,
	star: Star,
};
