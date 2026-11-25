import type { Editor } from '@tiptap/core';
import {
	type ItalicOptions,
	Italic as TiptapItalic,
} from '@tiptap/extension-italic';
import { ActionButton } from '../../components/ActionButton';
import type { ActionButtonProps } from '../../interfaces/types';

type ExtendedItalicOptions = ItalicOptions & {
	button?: (props: { editor: Editor }) => {
		component: typeof ActionButton;
		componentProps: ActionButtonProps;
	};
};

export const Italic = TiptapItalic.extend<ExtendedItalicOptions>({
	addOptions() {
		const parent = this.parent?.() as ItalicOptions;

		return {
			...parent,
			button({ editor }: { editor: Editor }) {
				return {
					component: ActionButton,
					componentProps: {
						action: () => editor.commands.toggleItalic(),
						isActive: () => editor.isActive('italic') || false,
						disabled: false,
						shortcutKeys: ['mod', 'I'],
						icon: 'Italic',
						tooltip: 'Itálico',
					},
				};
			},
		} as ExtendedItalicOptions;
	},
});
