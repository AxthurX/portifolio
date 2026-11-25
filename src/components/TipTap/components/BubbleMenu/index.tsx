import type { Editor } from '@tiptap/core';
import type { BubbleMenuProps } from '../../interfaces/types';
import { BubbleMenuText } from './components/BubbleMenuText';
import { ColumnsBubbleMenu } from './components/ColumnsBubbleMenu';
import { ContentMenu } from './components/ContentMenu';
import { TableBubbleMenu } from './components/TableBubbleMenu';

export interface BubbleMenuComponentProps {
	editor: Editor;
	disabled?: boolean;
	bubbleMenu?: BubbleMenuProps;
}

/**
 * Bubble Menu Component
 * @param editor Editor instance
 * @param disabled Whether the menu is disabled
 * @param bubbleMenu Bubble menu configuration
 * @returns Bubble menu component
 */

export function BubbleMenu({ editor, disabled, bubbleMenu }: BubbleMenuComponentProps) {
	const extensions = editor.extensionManager.extensions.map((ext) => ext.name);

	const renderMenuItems = () => [
		<ContentMenu disabled={disabled} editor={editor} key='content' />,
		extensions.includes('columns') && <ColumnsBubbleMenu editor={editor} key='columns' />,
		extensions.includes('table') && <TableBubbleMenu editor={editor} key='table' />,
		extensions.includes('text') && (
			<BubbleMenuText disabled={disabled} editor={editor} key='text' />
		),
	];

	if (bubbleMenu?.render) {
		return bubbleMenu.render(
			{
				editor,
				disabled: disabled || false,
				extensionsNames: extensions,
				bubbleMenu,
			},
			renderMenuItems(),
		);
	}

	return renderMenuItems().filter(Boolean);
}
