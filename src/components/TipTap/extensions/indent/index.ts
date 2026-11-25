import type { Command, Editor } from '@tiptap/core';
import { Extension, isList } from '@tiptap/core';
import type { Transaction } from '@tiptap/pm/state';
import { AllSelection, TextSelection } from '@tiptap/pm/state';

export enum IndentProps {
	max = 7,
	min = 0,

	more = 1,
	less = -1,
}

export function clamp(val: number, min: number, max: number): number {
	if (val < min) {
		return min;
	}
	if (val > max) {
		return max;
	}
	return val;
}

type IndentOptions = {
	/**
	 @default ["paragraph", "heading"]
	 */
	types: string[];
	/**
	 * Amount of margin to increase and decrease the indent
	 *
	 * @default 40
	 */
	margin: number;
};

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		indent: {
			indent: () => ReturnType;
			outdent: () => ReturnType;
		};
	}
}

export const Indent = Extension.create<IndentOptions>({
	name: 'indent',

	addOptions() {
		return {
			types: ['listItem', 'paragraph', 'heading'],
			margin: 40,
		};
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					indent: {
						renderHTML: (attrs) => ({
							style: `margin-left: ${(attrs.indent || 0) * this.options.margin}px;`,
						}),
						parseHTML: (attrs) =>
							Number.parseInt(attrs.style.marginLeft, 10) || 0,
					},
				},
			},
		];
	},

	addCommands() {
		return {
			indent:
				() =>
				({ editor, chain, commands }) => {
					// check for a list
					if (editor.isActive('bulletList') || editor.isActive('listItem')) {
						return chain().sinkListItem('listItem').run();
					}

					return this.options.types
						.map((type: string) => {
							const attrs = editor.getAttributes(type).indent;
							const indent = (attrs || 0) + 1;
							return commands.updateAttributes(type, { indent });
						})
						.every(Boolean);
				},
			outdent:
				() =>
				({ editor, chain, commands }) => {
					// Check for a list
					if (editor.isActive('bulletList') || editor.isActive('listItem')) {
						return chain().liftListItem('listItem').run();
					}

					const result = this.options.types
						.filter((type: string) => {
							const attrs = editor.getAttributes(type).indent;
							return attrs > 0;
						})
						.map((type: string) => {
							const attrs = editor.getAttributes(type).indent;
							const indent = (attrs || 0) - 1;
							return commands.updateAttributes(type, { indent });
						});

					return result.every(Boolean) && result.length > 0;
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			Tab: ({ editor }) => {
				return editor.commands.indent();
			},
			'Shift-Tab': ({ editor }) => {
				return editor.commands.outdent();
			},
			Backspace: ({ editor }) => {
				const { selection } = editor.state;

				// Make sure we are at the start of the node
				if (
					selection.$anchor.parentOffset > 0 ||
					selection.from !== selection.to
				) {
					return false;
				}

				return editor.commands.outdent();
			},
		};
	},
});
function updateIndentLevel(
	tr: Transaction,
	delta: number,
	types: string[],
	editor: Editor,
): Transaction {
	const { doc, selection } = tr;

	if (!doc || !selection) return tr;

	if (
		!(selection instanceof TextSelection || selection instanceof AllSelection)
	)
		return tr;

	const { from, to } = selection;
	let transaction = tr;

	doc.nodesBetween(from, to, (node, pos) => {
		const nodeType = node.type;

		if (types.includes(nodeType.name)) {
			transaction = setNodeIndentMarkup(transaction, pos, delta);
			return false;
		} else if (isList(node.type.name, editor.extensionManager.extensions)) {
			return false;
		}
		return true;
	});

	return transaction;
}

export function setNodeIndentMarkup(
	tr: Transaction,
	pos: number,
	delta: number,
): Transaction {
	if (!tr.doc) {
		return tr;
	}

	const node = tr.doc.nodeAt(pos);
	if (!node) {
		return tr;
	}

	const minIndent = IndentProps.min;
	const maxIndent = IndentProps.max;

	const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent);

	if (indent === node.attrs.indent) {
		return tr;
	}

	const nodeAttrs = {
		...node.attrs,
		indent,
	};

	return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

export function createIndentCommand({
	delta,
	types,
}: {
	delta: number;
	types: string[];
}): Command {
	return ({ state, dispatch, editor }) => {
		const { selection } = state;
		let { tr } = state;
		tr = tr.setSelection(selection);
		tr = updateIndentLevel(tr, delta, types, editor);

		if (tr.docChanged) {
			if (dispatch) dispatch(tr);
			return true;
		}

		return false;
	};
}
