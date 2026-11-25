import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import type { NewFile } from '../../components/Image/image-create';
import { FileComponent } from './file';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		file: {
			setFiles: (files: NewFile[], type: string) => ReturnType;
		};
	}
}

export const File = Node.create({
	name: 'file',

	group: 'block',

	addAttributes() {
		return {
			files: {
				default: [],
				parseHTML(el) {
					const raw = el.getAttribute('files');
					try {
						return JSON.parse(raw || '[]');
					} catch {
						return [];
					}
				},
				renderHTML({ files }) {
					return {
						files: JSON.stringify(files),
					};
				},
			},
			id: {
				default: null,
				parseHTML: (el) => el.getAttribute('id'),
				renderHTML: (attrs) => (attrs.id ? { id: attrs.id } : {}),
			},
			class: {
				default: null,
				parseHTML: (el) => el.className,
				renderHTML: (attrs) => (attrs.class ? { class: attrs.class } : {}),
			},
			type: {
				default: null,
				parseHTML: (el) => el.getAttribute('type'),
				renderHTML: (attrs) => (attrs.type ? { type: attrs.type } : {}),
			},
			width: {
				default: 450,
				parseHTML: (el) => el.getAttribute('width'),
				renderHTML: (attrs) => (attrs.width ? { width: attrs.width } : {}),
			},
			height: {
				default: null,
				parseHTML: (el) => el.getAttribute('height'),
				renderHTML: (attrs) => (attrs.height ? { height: attrs.height } : {}),
			},
			title: {
				default: 'Título',
				parseHTML: (el) => el.getAttribute('data-title'),
				renderHTML: (attrs) => ({ 'data-title': attrs.title }),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'file',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['file', mergeAttributes(HTMLAttributes, { 'data-type': 'file' })];
	},

	addNodeView() {
		return ReactNodeViewRenderer(FileComponent);
	},

	addCommands() {
		return {
			setFiles:
				(files: NewFile[], type: string) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: { files, type },
					});
				},
		};
	},
});
