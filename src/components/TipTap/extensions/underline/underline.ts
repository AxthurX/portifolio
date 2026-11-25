import type { Editor } from '@tiptap/core';
import Underline, { type UnderlineOptions } from '@tiptap/extension-underline';
import { ActionButton } from '../../components/ActionButton';
import type { ActionButtonProps } from '../../interfaces/types';

type ExtendedUnderlineOptions = UnderlineOptions & {
	button?: (props: { editor: Editor }) => {
		component: typeof ActionButton;
		componentProps: ActionButtonProps;
	};
};

export const TextUnderline = Underline.extend<ExtendedUnderlineOptions>({
	addOptions() {
		const parent = this.parent?.() as UnderlineOptions;

		return {
			...parent,
			button({ editor }: { editor: Editor }) {
				return {
					component: ActionButton,
					componentProps: {
						action: () => editor.commands.toggleUnderline(),
						isActive: () => editor.isActive('underline') || false,
						disabled: false,
						icon: 'Underline',
						shortcutKeys: ['mod', 'U'],
						tooltip: 'Sublinhado',
					},
				};
			},
		} as ExtendedUnderlineOptions;
	},
});
