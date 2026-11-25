'use client';

import type { Editor } from '@tiptap/core';
import { ActionButton } from '../../../components/ActionButton';
import { useToggleActive } from '../../../hooks/use-active';
import { useButtonProps } from '../../../hooks/use-button-props';
import { Excalidraw as ExcalidrawExtension } from '../excalidraw';

export function TextExcalidraw({ editor }: { editor: Editor }) {
	const button_props = useButtonProps(ExcalidrawExtension.name);

	const { tooltip_options = {}, is_active = undefined } = button_props?.componentProps ?? {};

	const { editorDisabled } = useToggleActive(is_active);

	return (
		<ActionButton
			disabled={false}
			icon='Excalidraw'
			tooltip='Inserir diagrama'
			className='cursor-pointer'
			tooltipOptions={tooltip_options}
			action={() => {
				if (editorDisabled) return;

				editor.chain().focus().setExcalidraw({}).run();
			}}
		/>
	);
}
