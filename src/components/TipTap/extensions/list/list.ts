import type { ChainedCommands } from '@tiptap/core';
import { BulletList } from '@tiptap/extension-list';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		toggleClass: {
			toggleClass: (className: string) => ReturnType;
		};
	}
}

export const ListNode = BulletList.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			class: { default: 'list-disc' },
			style: {
				default: null,
				parseHTML: (el) => el.getAttribute('style'),
				renderHTML: (attrs) => (attrs.style ? { style: attrs.style } : {}),
			},
		};
	},

	addCommands() {
		return {
			toggleClass:
				(className: string) =>
				({ chain }: { chain: () => ChainedCommands }) => {
					// Se o editor já está ativo e usa a classe passada, remove a classe
					if (this.editor.isActive(this.name, { class: className })) {
						return chain()
							.toggleBulletList()
							.updateAttributes(this.name, { class: '' })
							.run();
					}

					// Se o editor não está ativo ou tem uma classe diferente, define a classe
					return chain()
						.toggleBulletList()
						.updateAttributes(this.name, { class: className })
						.run();
				},
		};
	},
});
