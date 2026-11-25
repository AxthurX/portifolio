import {
	Activity,
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	BookOpenText,
	BookText,
	Brain,
	DropletOff,
	Eye,
	Hand,
	Layers,
	LucidePauseCircle,
	MapIcon,
	Palette,
	SquareDashedMousePointer,
	Type,
	Zap,
} from 'lucide-react';
import type { ElementType } from 'react';
import { BsDroplet, BsDropletHalf, BsFillFileFontFill } from 'react-icons/bs';
import { IoContrast, IoContrastOutline } from 'react-icons/io5';
import { LuImageOff } from 'react-icons/lu';
import { MdFontDownload, MdFormatLineSpacing, MdOutlineTextFields } from 'react-icons/md';
import { PiCursor } from 'react-icons/pi';
import { RiContrastDropFill, RiEye2Line, RiSpeakLine } from 'react-icons/ri';
import { RxFontStyle } from 'react-icons/rx';
import { ReadingGuideIcon } from '../../../../public/accessibility/reading-guide';
import { ReadingMaskIcon } from '../../../../public/accessibility/reading-mask';
import { ReadingMaskWhiteIcon } from '../../../../public/accessibility/reading-mask-white';
import { IconTextSpacing } from '../../../../public/accessibility/spacing';

export type AccessibilityProfile = {
	key: string;
	label: string;
	icon: ElementType;
	settings: { [key: string]: string };
};

export interface AccessibilityItems extends Partial<AccessibilityProfile> {
	option: string;
}

export type Key =
	| 'alignment'
	| 'contrast'
	| 'cursor'
	| 'font'
	| 'height'
	| 'saturation'
	| 'spacing'
	| 'text'
	| 'link-highlight'
	| 'title-highlight'
	| 'hidden-images'
	| 'pause-animation'
	| 'reading-mode'
	| 'enlarge-cursor'
	| 'voice-command'
	| 'site-map'
	| 'page-structure'
	| 'vlibras'
	| 'position';

export type AccessibilityItemsToggle = {
	options: string[];
	labels: string[];
	icons: ElementType[];
	key: Key;
};

export function AccessibilityItems(): AccessibilityItems[] {
	return [
		{
			key: 'cursor',
			label: 'Cursor grande',
			icon: PiCursor,
			option: 'large-cursor',
		},
		{
			key: 'cursor',
			icon: ReadingMaskWhiteIcon,
			label: 'Máscara de leitura',
			option: 'reading-mask',
		},
		{
			key: 'link-highlight',
			label: 'Destacar Links',
			icon: MdFontDownload,
			option: 'enable',
		},
		{
			key: 'saturation',
			label: 'Saturação baixa',
			icon: BsDropletHalf,
			option: '0.5',
		},
		{
			key: 'saturation',
			label: 'Saturação alta',
			icon: BsDroplet,
			option: '3',
		},
		{
			key: 'saturation',
			label: 'Saturação Monocromática',
			icon: DropletOff,
			option: '0',
		},
	];
}

export function AccessibilityProfile(): AccessibilityProfile[] {
	return [
		{
			key: 'adhd',
			label: 'TDAH',
			icon: Zap,
			settings: {
				'pause-animation': 'enable',
				cursor: 'reading-mask',
				'link-highlight': 'enable',
				spacing: '12',
				height: '1.8',
				saturation: '0.5',
			},
		},
		{
			key: 'low-vision',
			label: 'Baixa visão',
			icon: Eye,
			settings: {
				text: '18',
				'pause-animation': 'enable',
				font: "'Arial', sans-serif",
				cursor: 'large-cursor',
				saturation: '3',
			},
		},
		{
			key: 'color-blind',
			label: 'Daltônico',
			icon: Palette,
			settings: { saturation: '3', contrast: 'sedam' },
		},
		{
			key: 'cognitive-learning',
			label: 'Cognitivo e Aprendizagem',
			icon: Brain,
			settings: {
				contrast: 'sedam',
				text: '18',
				'pause-animation': 'enable',
				cursor: 'reading-guide',
			},
		},
		{
			key: 'dyslexia',
			label: 'Dislexia',
			icon: BookText,
			settings: {
				font: "'Open-Dyslexic', sans-serif",
				'pause-animation': 'enable',
			},
		},
		{
			key: 'seizure-epilepsy',
			label: 'Convulsão e epilepsia',
			icon: Activity,
			settings: {
				'pause-animation': 'enable',
				saturation: '0.5',
				contrast: 'black',
			},
		},
	];
}

export function AccessibilityItemsToggle(): AccessibilityItemsToggle[] {
	return [
		{
			key: 'voice-command',
			labels: ['Comando de voz', 'Comando de voz'],
			icons: [RiSpeakLine, RiSpeakLine],
			options: ['disable', 'enable'],
		},
		{
			key: 'reading-mode',
			labels: ['Modo de leitura', 'Modo de leitura'],
			icons: [BookOpenText, BookOpenText],
			options: ['disable', 'enable'],
		},
		{
			key: 'saturation',
			labels: ['Saturação', 'Baixa saturação', 'Alta saturação', 'Dessaturar'],
			icons: [RiContrastDropFill, BsDropletHalf, BsDroplet, DropletOff],
			options: ['100%', '0.5', '3', '0'],
		},
		{
			key: 'contrast',
			labels: ['Contraste', 'Contraste escuro', 'Contraste claro'],
			icons: [IoContrastOutline, IoContrast, IoContrastOutline],
			options: ['sedam', 'black', 'wireframe'],
		},
		{
			key: 'alignment',
			labels: [
				'Alinhamento de texto',
				'Alinhar à esquerda',
				'Centralizar',
				'Alinhar à direita',
				'Justificar',
			],
			icons: [AlignJustify, AlignLeft, AlignCenter, AlignRight, AlignJustify],
			options: ['none', 'left', 'center', 'right', 'justify'],
		},
		{
			key: 'spacing',
			labels: [
				'Espaçamento de texto',
				'Espaçamento claro',
				'Espaçamento moderado',
				'Espaçamento pesado',
			],
			icons: [IconTextSpacing, IconTextSpacing, IconTextSpacing, IconTextSpacing],
			options: ['normal', '0', '12', '14'],
		},
		{
			key: 'height',
			labels: ['Altura da linha', 'Altura da linha', 'Altura da linha', 'Altura da linha'],
			icons: [MdFormatLineSpacing, MdFormatLineSpacing, MdFormatLineSpacing, MdFormatLineSpacing],
			options: ['normal', '1.8', '2.1', '2.4'],
		},
		{
			key: 'text',
			labels: ['Texto maior', 'Texto maior', 'Texto maior', 'Texto maior', 'Texto maior'],
			icons: [
				MdOutlineTextFields,
				MdOutlineTextFields,
				MdOutlineTextFields,
				MdOutlineTextFields,
				MdOutlineTextFields,
			],
			options: ['16', '18', '20', '22', '24'],
		},
		{
			key: 'font',
			labels: ['Dislexia', 'Dislexia amigável', 'Fontes legíveis'],
			icons: [RxFontStyle, RiEye2Line, Type],
			options: ["'AmsiPro', sans-serif", "'Open-Dyslexic', sans-serif", "'Arial', sans-serif"],
		},
		{
			key: 'cursor',
			labels: ['Cursor', 'Cursor grande', 'Máscara de leitura', 'Guia de leitura'],
			icons: [PiCursor, PiCursor, ReadingMaskIcon, ReadingGuideIcon],
			options: ['cursor', 'large-cursor', 'reading-mask', 'reading-guide'],
		},
		{
			key: 'pause-animation',
			labels: ['Pausar animações', 'Pausar animações'],
			icons: [LucidePauseCircle, LucidePauseCircle],
			options: ['disable', 'enable'],
		},
		{
			key: 'link-highlight',
			labels: ['Destacar links', 'Destacar links'],
			icons: [MdFontDownload, MdFontDownload],
			options: ['disable', 'enable'],
		},
		{
			key: 'title-highlight',
			labels: ['Destacar títulos', 'Destacar títulos'],
			icons: [BsFillFileFontFill],
			options: ['disable', 'enable'],
		},
		{
			key: 'hidden-images',
			labels: ['Ocultar imagens', 'Ocultar imagens'],
			icons: [LuImageOff, LuImageOff],
			options: ['disable', 'enable'],
		},
		{
			key: 'enlarge-cursor',
			labels: ['Ampliar com o cursor', 'Ampliar com o cursor'],
			icons: [SquareDashedMousePointer, SquareDashedMousePointer],
			options: ['disable', 'enable'],
		},
		{
			key: 'site-map',
			labels: ['Mapa do site'],
			icons: [MapIcon],
			options: ['enable'],
		},
		{
			key: 'page-structure',
			labels: ['Estrutura da página', 'Estrutura da página'],
			icons: [Layers, Layers],
			options: ['disable', 'enable'],
		},
		{
			key: 'vlibras',
			labels: ['Tradutor de Libras'],
			icons: [Hand],
			options: ['enable'],
		},
	];
}
