import { Accessibility, PenLine, type LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import { AccessibilityLab } from './AccessibilityLab';
import { TiptapLab } from './TiptapLab';

export interface PlaygroundDemo {
	id: string;
	index: string;
	title: string;
	kicker: string;
	description: string;
	tags: string[];
	icon: LucideIcon;
	Demo: ComponentType;
}

export const PLAYGROUND_DEMOS: PlaygroundDemo[] = [
	{
		id: 'acessibilidade',
		index: '01',
		title: 'Menu de acessibilidade',
		kicker: 'Accessibility & Design System',
		description:
			'Barra de recursos com contraste, escala de texto, espaçamento, saturação, régua de leitura e comandos de voz. As mudanças ficam escopadas na área de leitura.',
		tags: ['React', 'Radix UI', 'WCAG 2.2', 'Speech API'],
		icon: Accessibility,
		Demo: AccessibilityLab,
	},
	{
		id: 'tiptap',
		index: '02',
		title: 'Editor de conteúdo',
		kicker: 'Headless Editor & CMS',
		description:
			'Editor rico com TipTap 3 e ProseMirror: títulos, listas, citações, código, links, imagens por URL, atalhos de Markdown e inspeção do HTML gerado.',
		tags: ['TipTap 3', 'ProseMirror', 'TypeScript', 'HTML'],
		icon: PenLine,
		Demo: TiptapLab,
	},
];
