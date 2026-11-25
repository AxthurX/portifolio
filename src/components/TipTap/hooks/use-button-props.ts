import { useMemo } from 'react';
import { useEditorInstance } from '../store/editor';
import { isFunction } from '../utils/utils';
import { useExtension } from './use-extension';

export function useButtonProps(extensionName: string) {
	const editor = useEditorInstance();
	const extension = useExtension(extensionName);

	return useMemo(() => {
		if (!editor || !extension) {
			return null;
		}

		const { button } = extension.options;

		if (!button || !isFunction(button)) {
			return null;
		}

		const button_props = button({
			editor,
			extension,
		});

		return button_props;
	}, [editor, extension]);
}
