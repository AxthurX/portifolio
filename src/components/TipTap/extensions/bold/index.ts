import type { Editor } from '@tiptap/core';
import { Bold, type BoldOptions } from '@tiptap/extension-bold';
import { ActionButton } from '../../components/ActionButton';
import type { ActionButtonProps } from '../../interfaces/types';

type ExtendedBoldOptions = BoldOptions & {
	button?: (props: { editor: Editor }) => {
		component: typeof ActionButton;
		componentProps: ActionButtonProps;
	};
};

export const TextBold = Bold.extend<ExtendedBoldOptions>({
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

	addOptions() {
		const parent = this.parent?.() as BoldOptions;

		return {
			...parent,
			button: ({ editor }: { editor: Editor }) => ({
				component: ActionButton,
				componentProps: {
					action: () => editor.commands.toggleBold(),
					isActive: () => editor.isActive('bold') || false,
					disabled: false,
					icon: 'Bold',
					shortcutKeys: ['mod', 'B'],
					tooltip: 'Negrito',
				},
			}),
		} as ExtendedBoldOptions;
	},
});
