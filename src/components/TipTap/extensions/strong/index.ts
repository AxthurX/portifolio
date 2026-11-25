import { Node } from '@tiptap/core';

export const StrongNode = Node.create({
	name: 'strong',

	addAttributes() {
		return {
			...this.parent?.(),
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
				tag: 'strong',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['strong', HTMLAttributes, 0];
	},
});
