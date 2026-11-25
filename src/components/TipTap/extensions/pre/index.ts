import { mergeAttributes, Node } from '@tiptap/core';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		togglePreBlock: {
			togglePreBlock: () => ReturnType;
		};
	}
}

const PreBlock = Node.create({
	name: 'preBlock',

	group: 'block',

	content: 'text*',

	parseHTML() {
		return [{ tag: 'pre' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['pre', mergeAttributes(HTMLAttributes), 0];
	},

	addCommands() {
		return {
			togglePreBlock:
				() =>
				({ state, commands }) => {
					const { $from } = state.selection;
					const node = $from.node();

					if (node.type.name === 'preBlock') {
						return commands.setNode('paragraph');
					}

					return commands.setNode('preBlock');
				},
		};
	},
});

export default PreBlock;
