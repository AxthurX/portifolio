import Paragraph from '@tiptap/extension-paragraph';

export const ParagraphNode = Paragraph.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			id: { default: null },
			style: { default: null },
			class: { default: null },
		};
	},
});
