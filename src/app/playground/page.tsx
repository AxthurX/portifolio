import type { Metadata } from 'next';
import { PlaygroundShell } from '@/components/playground/PlaygroundShell';

export const metadata: Metadata = {
	title: 'Playground',
	description:
		'Demonstrações interativas de componentes: menu de acessibilidade com WCAG 2.2 e editor de conteúdo com TipTap e ProseMirror.',
};

export default function PlaygroundPage() {
	return <PlaygroundShell />;
}
