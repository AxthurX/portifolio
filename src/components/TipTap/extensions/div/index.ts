import { mergeAttributes, Node } from '@tiptap/core';

export const DivNode = Node.create({
	name: 'div',

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
				tag: 'div',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['div', mergeAttributes(HTMLAttributes), 0];
	},
});
