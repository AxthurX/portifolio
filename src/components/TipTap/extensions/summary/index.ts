import { mergeAttributes, Node } from '@tiptap/core';

export const SummaryNode = Node.create({
	name: 'summary',

	group: 'block',

	content: 'inline*',

	addAttributes() {
		return {
			...this.parent?.(),
			id: {
				default: null,
				parseHTML: (el) => el.getAttribute('id'),
				renderHTML: (attrs) => (attrs.id ? { id: attrs.id } : {}),
			},
			class: {
				default: null,
				parseHTML: (el) => el.getAttribute('class'),
				renderHTML: (attrs) => (attrs.class ? { class: attrs.class } : {}),
			},
			style: {
				default: null,
				parseHTML: (el) => el.getAttribute('style'),
				renderHTML: (attrs) => (attrs.style ? { style: attrs.style } : {}),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'summary',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['summary', mergeAttributes(HTMLAttributes), 0];
	},
});
