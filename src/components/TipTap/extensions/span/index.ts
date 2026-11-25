import { Mark, mergeAttributes } from '@tiptap/core';

export const SpanNode = Mark.create({
	name: 'span',

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
				tag: 'span',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['span', mergeAttributes(HTMLAttributes), 0];
	},
});
