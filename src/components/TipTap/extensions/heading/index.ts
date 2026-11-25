import Heading from '@tiptap/extension-heading';

export const HeadingNode = Heading.extend({
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
				renderHTML: (attrs) => {
					return attrs.style ? { style: attrs.style } : {};
				},
			},
		};
	},
});
