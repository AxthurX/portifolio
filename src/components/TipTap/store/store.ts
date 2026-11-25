import { createSignal, useSignalValue } from 'reactjs-signal';

export const editableEditorSignal = createSignal(false);

export function useEditableEditor() {
	return useSignalValue(editableEditorSignal);
}

export function setEditableEditor(value: boolean) {
	editableEditorSignal(value);
}
