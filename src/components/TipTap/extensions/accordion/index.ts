import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { AccordionComponent } from './accordion';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		accordion: {
			setAccordion: ({ title, description }: { title: string; description: string }) => ReturnType;
		};
	}
}

export const AccordionNode = Node.create({
	name: 'accordion',

	group: 'block',

	addAttributes() {
		return {
			title: {
				default: 'Titulo',
				parseHTML: (el) => el.getAttribute('data-title'),
				renderHTML: (attrs) => ({ 'data-title': attrs.title }),
			},
			description: {
				default: 'Descrição',
				parseHTML: (el) => el.getAttribute('data-description'),
				renderHTML: (attrs) => ({ 'data-description': attrs.description }),
			},
		};
	},

	parseHTML() {
		return [{ tag: 'accordion' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['accordion', mergeAttributes(HTMLAttributes, { 'data-type': 'accordion' })];
	},

	addNodeView() {
		return ReactNodeViewRenderer(AccordionComponent);
	},

	addCommands() {
		return {
			setAccordion:
				({ title, description }: { title: string; description: string }) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: { title, description },
					});
				},
		};
	},
});
