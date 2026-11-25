import type { TooltipContentProps } from '@radix-ui/react-tooltip';
import type { Editor, Extension, JSONContent } from '@tiptap/core';
import type { ReactNode } from 'react';

export interface FormatAction {
	label?: string;
	icon?: ReactNode;
	action: (editor: Editor) => void;
	isActive: (editor: Editor) => boolean;
	canExecute: (editor: Editor) => boolean;
	shortcuts?: string[];
	value: string;
}

export interface ShortcutKeyResult {
	symbol: string;
	readable: string;
}

export type TranslationFunction = (
	path: string,
	params?: Record<string, string | number>,
) => string;

export interface EchoEditorOnChange {
	editor: Editor;
	output: string | JSONContent;
}

export type ExtensionNameKeys =
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike'
	| 'color'
	| 'highlight'
	| 'heading'
	| 'textAlign'
	| 'bulletList'
	| 'orderedList'
	| 'taskList'
	| 'indent'
	| 'link'
	| 'image'
	| 'video'
	| 'table'
	| 'blockquote'
	| 'horizontalRule'
	| 'code'
	| 'codeBlock'
	| 'clear'
	| 'history'
	| 'twitter'
	| 'mermaid'
	| 'drawer';

export interface GeneralOptions<T> {
	divider?: boolean;
	spacer?: boolean;
	button?: ButtonView<T>;
	toolbar?: boolean;
}

export interface ButtonViewReturnComponentProps {
	action?: (value?: unknown) => void;
	isActive?: () => boolean;
	icon?: ReactNode;
	tooltip?: string;
	[x: string]: unknown;
}

export interface ButtonViewReturnComponentSlots {
	dialog: () => ReactNode;
	[x: string]: () => ReactNode;
}

export interface ButtonViewReturn {
	component: unknown;
	componentProps: ButtonViewReturnComponentProps;
	componentSlots?: ButtonViewReturnComponentSlots;
}

export interface ButtonViewParams<T = Record<string, unknown>> {
	editor: Editor;
	extension: Extension<T>;
	t: (path: string) => string;
}

export type ButtonView<T = Record<string, unknown>> = (
	options: ButtonViewParams<T>,
) => ButtonViewReturn | ButtonViewReturn[];

export interface BubbleMenuRenderProps {
	editor: Editor;
	disabled: boolean;
	bubbleMenu: BubbleMenuProps;
	extensionsNames: string[];
}

export interface ActionButtonProps {
	/* Icon name to display */
	icon?: string;
	/* Button title */
	title?: string;
	/* Tooltip text */
	tooltip?: string;
	/* Whether the button is disabled */
	disabled?: boolean;
	/* Keyboard shortcut keys */
	shortcutKeys?: string[];
	/* Custom CSS class */
	className?: string;
	/* Loading state */
	loading?: boolean;
	/* Tooltip options */
	tooltipOptions?: TooltipContentProps;
	/* Button color */
	color?: string;
	/* Click action handler */
	action?: ButtonViewReturnComponentProps['action'];
	/* Active state checker */
	isActive?: ButtonViewReturnComponentProps['isActive'];
	/* Child components */
	children?: React.ReactNode;
	/* Whether to render as child */
	asChild?: boolean;
	/* Whether it's an upload button */
	upload?: boolean;
	/* Initial displayed color */
	initialDisplayedColor?: string;

	dataState?: boolean;
}

export interface BubbleMenuConfig {
	/**
	 * @description Column menu hidden
	 * @default false
	 */
	hidden?: boolean;
	/**
	 * custom menu actions
	 */
	actions?: ActionButtonProps[];
}

export interface BubbleMenuProps {
	columnConfig?: {
		/**
		 * @description Column menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	tableConfig?: BubbleMenuConfig;
	floatingMenuConfig?: {
		/**
		 * @description Floating menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	linkConfig?: {
		/**
		 * @description Link menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	textConfig?: {
		/**
		 * @description Text menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	imageConfig?: {
		/**
		 * @description Image menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	imageGifConfig?: {
		/**
		 * @description Image menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	videoConfig?: {
		/**
		 * @description Video menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	katexConfig?: {
		/**
		 * @description katex menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	excalidrawConfig?: {
		/**
		 * @description excalidraw menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	iframeConfig?: {
		/**
		 * @description iframe menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	mermaidConfig?: {
		/**
		 * @description mermaid menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	twitterConfig?: {
		/**
		 * @description twitter menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	drawerConfig?: {
		/**
		 * @description twitter menu hidden
		 * @default false
		 */
		hidden?: boolean;
	};
	render?: (props: BubbleMenuRenderProps, dom: ReactNode) => ReactNode;
}

export interface ToolbarItemProps {
	button: {
		component: React.ComponentType<unknown>;
		componentProps: Record<string, unknown>;
	};
	divider: boolean;
	spacer: boolean;
	type: string;
	name: string;
}

export interface ToolbarRenderProps {
	editor: Editor;
	disabled: boolean;
}
export interface ToolbarProps {
	render?: (
		props: ToolbarRenderProps,
		toolbarItems: ToolbarItemProps[],
		dom: ReactNode[],
		containerDom: (innerContent: ReactNode) => ReactNode,
	) => ReactNode;
}

export interface NameValueOption<T = string> {
	name: string;
	value: T;
}

export type VideoAlignment = 'flex-start' | 'center' | 'flex-end';

export type PaperSize = 'Legal' | 'Letter' | 'Tabloid' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5';

export type PageMargin =
	// Inches (in)
	| '0in'
	| '0.25in'
	| '0.4in'
	| '0.5in'
	| '0.75in'
	| '1in'
	| '1.25in'
	| '1.5in'
	| '1.75in'
	| '2in'
	// Centimeters (cm)
	| '0cm'
	| '0.5cm'
	| '1cm'
	| '1.5cm'
	| '2cm'
	| '2.5cm'
	| '3cm'
	| '4cm'
	| '5cm'
	// Millimeters (mm)
	| '0mm'
	| '5mm'
	| '10mm'
	| '15mm'
	| '20mm'
	| '25mm'
	| '30mm'
	| '40mm'
	| '50mm'
	// Points (pt)
	| '0pt'
	| '18pt'
	| '36pt'
	| '54pt'
	| '72pt'
	| '90pt'
	| '108pt'
	| '144pt';

export interface ColorOption {
	value: string;
	label: string;
}

export interface ColorPalette {
	label: string;
	colors: ColorOption[];
}

export const color_palette: ColorPalette[] = [
	{
		label: '1',
		colors: [
			{ value: '#000000', label: 'Padrão' },
			{ value: '#1a53ff', label: 'Azul escuro' },
			{ value: '#17a2b8', label: 'Verde azulado escuro' },
			{ value: '#218838', label: 'Verde escuro' },
			{ value: '#e05b00', label: 'Laranja escuro' },
			{ value: '#c82333', label: 'Vermelho escuro' },
			{ value: '#6610f2', label: 'Roxo escuro' },
		],
	},
	{
		label: '2',
		colors: [
			{ value: '#adb5bd', label: 'Cinza' },
			{ value: '#3399ff', label: 'Azul' },
			{ value: '#63d2d6', label: 'Verde azulado' },
			{ value: '#51d16e', label: 'Verde' },
			{ value: '#ff9234', label: 'Laranja' },
			{ value: '#e57373', label: 'Vermelho' },
			{ value: '#9a75ff', label: 'Roxo' },
		],
	},
	{
		label: '3',
		colors: [
			{ value: '#ffffff', label: 'Branco' },
			{ value: '#cce4ff', label: 'Azul sutil' },
			{ value: '#ccf2f0', label: 'Verde azulado sutil' },
			{ value: '#ccffcc', label: 'Verde sutil' },
			{ value: '#fff2cc', label: 'Amarelo sutil' },
			{ value: '#ffd6cc', label: 'Vermelho sutil' },
			{ value: '#e6ccff', label: 'Roxo sutil' },
		],
	},
];
