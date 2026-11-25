import type { Editor } from '@tiptap/core';
import {
	type StrikeOptions,
	Strike as TiptapStrike,
} from '@tiptap/extension-strike';
import { ActionButton } from '../../components/ActionButton';
import type { ActionButtonProps } from '../../interfaces/types';

type ExtendedStrikeOptions = StrikeOptions & {
	button?: (props: { editor: Editor }) => {
		component: typeof ActionButton;
		componentProps: ActionButtonProps;
	};
};

export const Strike = TiptapStrike.extend<ExtendedStrikeOptions>({
	addOptions() {
		const parent = this.parent?.() as StrikeOptions;

		return {
			...parent,
			button: ({ editor }: { editor: Editor }) => ({
				component: ActionButton,
				componentProps: {
					action: () => editor.commands.toggleStrike(),
					isActive: () => editor.isActive('strike') || false,
					disabled: false,
					icon: 'Strikethrough',
					shortcutKeys: ['shift', 'mod', 'S'],
					tooltip: 'Riscado',
				},
			}),
		} as ExtendedStrikeOptions;
	},
});
