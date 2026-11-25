import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { BlocoComponent } from './bloco';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		bloco: {
			setBlocoComponent: ({ text }: { text: string }) => ReturnType;
		};
	}
}

export const BlocoNode = Node.create({
	name: 'bloco',

	atom: true,

	group: 'block',

	content: 'inline*',

	priority: 200,

	addAttributes() {
		return {
			text: {
				default: '',
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'bloco',
			},
			{
				tag: 'div.border-l-4.border-l-slate-500.bg-calpolygreen-800.p-3.text-beige-50',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['bloco', mergeAttributes(HTMLAttributes), 0];
	},

	addNodeView() {
		return ReactNodeViewRenderer(BlocoComponent);
	},

	addCommands() {
		return {
			setBlocoComponent:
				({ text }: { text: string }) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: { text },
						content: [
							{
								type: 'text',
								text: 'Texto',
							},
						],
					});
				},
		};
	},
});
