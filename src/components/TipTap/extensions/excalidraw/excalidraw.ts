import { isNodeSelection, mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import NodeViewExcalidraw from './components/NodeViewExcalidraw/node-view-excalidraw';

export * from './components/text-excalidraw';

const DEFAULT_MIND_DATA = { elements: [] };

export interface IExcalidrawAttrs {
	defaultShowPicker?: boolean;
	createUser?: any;
	width?: number | string;
	height?: number;
	data?: Record<string, unknown>;
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		excalidraw: {
			setExcalidraw: (attrs?: IExcalidrawAttrs) => ReturnType;
		};
	}
}

export const Excalidraw = Node.create({
	name: 'excalidraw',
	priority: 100,
	group: 'block',
	selectable: true,
	atom: true,
	draggable: true,
	inline: false,

	addAttributes() {
		return {
			defaultShowPicker: {
				default: false,
			},
			createUser: {
				default: null,
			},
			width: {
				default: '100%',
			},
			height: {
				default: 240,
			},
			zoom: {
				default: 100,
				parseHTML: (element) => {
					const parsedZoom = element.getAttribute('data-zoom');
					return parsedZoom ? Number.parseInt(parsedZoom, 10) : 100;
				},
			},
			data: {
				default: DEFAULT_MIND_DATA,
				parseHTML: (element) => {
					const parsed = element.getAttribute('data');
					if (!parsed || parsed === '[object Object]') {
						return DEFAULT_MIND_DATA;
					}
					try {
						return JSON.parse(parsed);
					} catch (e) {
						console.error('Erro ao converter Excalidraw:', e);
						return DEFAULT_MIND_DATA;
					}
				},
			},
		};
	},

	addOptions() {
		return {
			...this.parent?.(),
			HTMLAttributes: {
				class: 'excalidraw',
			},
			excalidrawProps: {},
			button: () => ({
				componentProps: {},
			}),
		};
	},

	parseHTML() {
		return [
			{
				tag: 'div.excalidraw',
				priority: 100,
			},
			{
				tag: 'div[class="excalidraw"]',
				priority: 100,
			},
		];
	},

	renderHTML({ HTMLAttributes, node }: any) {
		const clean_attrs = { ...HTMLAttributes };
		delete clean_attrs.data;

		return [
			'div',
			mergeAttributes(this.options.HTMLAttributes, clean_attrs, {
				data: JSON.stringify(node.attrs.data || DEFAULT_MIND_DATA),
				width: node.attrs.width,
				height: node.attrs.height,
				'data-zoom': node.attrs.zoom,
			}),
		];
	},

	addCommands() {
		return {
			setExcalidraw:
				(options) =>
				({ tr, commands, chain }) => {
					const attrs = {
						...(options || {}),
						data: options?.data || DEFAULT_MIND_DATA,
					};

					if (isNodeSelection(tr.selection) && tr.selection.node.type.name === this.name) {
						return commands.updateAttributes(this.name, attrs);
					}

					return chain()
						.insertContent({
							type: this.name,
							attrs,
						})
						.run();
				},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(NodeViewExcalidraw);
	},

	addInputRules() {
		return [
			nodeInputRule({
				find: /^\$excalidraw\$$/,
				type: this.type,
				getAttributes: () => {
					return { width: '100%' };
				},
			}),
		];
	},
});
