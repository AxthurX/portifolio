import { Node } from '@tiptap/core';

export const DetailsNode = Node.create({
	name: 'details',

	group: 'block',

	content: 'block+',

	parseHTML() {
		return [
			{
				tag: 'details',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['details', HTMLAttributes, 0];
	},

	addAttributes() {
		return {
			...this.parent?.(),
			open: {
				default: false,
				parseHTML: (element) => element.hasAttribute('open'),
				renderHTML: (attributes) => {
					return attributes.open ? { open: true } : {};
				},
			},
			class: {
				default: null,
				parseHTML: (element) => element.getAttribute('class'),
				renderHTML: (attributes) => {
					return attributes.class ? { class: attributes.class } : {};
				},
			},
			style: {
				default: null,
				parseHTML: (element) => element.getAttribute('style'),
				renderHTML: (attributes) => {
					return attributes.style ? { style: attributes.style } : {};
				},
			},
		};
	},
});
