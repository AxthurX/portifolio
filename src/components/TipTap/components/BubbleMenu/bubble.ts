import type { Editor } from '@tiptap/react';
import { BUBBLE_TEXT_LIST } from '../../constants';
import type { ButtonViewParams, ButtonViewReturn, ExtensionNameKeys } from '../../interfaces/types';

type BubbleAllType = ExtensionNameKeys | 'divider' | (string & {});

export type NodeTypeKey = 'image' | 'text' | 'video';

export type BubbleTypeMenu = Partial<Record<NodeTypeKey, BubbleMenuItem[]>>;

export type NodeTypeMenu = Partial<Record<NodeTypeKey, BubbleAllType[]>>;

export interface BubbleMenuItem extends ButtonViewReturn {
	type: BubbleAllType;
}

/**
 * Generates a bubble menu based on the provided options.
 * @param {ButtonViewParams<T>} options - The options for generating the bubble menu.
 * @returns {BubbleTypeMenu} The generated bubble menu.
 */

export function getBubbleText(editor: Editor): BubbleMenuItem[] {
	const result: BubbleMenuItem[] = [];

	for (const type of BUBBLE_TEXT_LIST) {
		if (type === 'divider' && result.length > 0) {
			result.push({
				type: 'divider',
				component: undefined,
				componentProps: {},
			});
		}

		const ext = editor.extensionManager.extensions.find((ext) => ext.name === type);

		if (ext) {
			const button = ext.configure().options.button({
				editor,
				extension: ext,
			});

			result.push(button);
		}
	}

	return result;
}
