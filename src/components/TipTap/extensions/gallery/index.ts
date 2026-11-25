import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import type { GalleryImage } from '../../components/Gallery/gallery-create';
import { filterFiles } from '../../utils';
import { GalleryComponent } from './gallery';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		gallery: {
			setGallery: (gallery: GalleryImage[]) => ReturnType;
		};
	}
}

export const Gallery = Node.create({
	name: 'gallery',

	group: 'block',

	addOptions() {
		return {
			...this.parent?.(),
			allowedMimeTypes: [],
			maxFileSize: 0,
		};
	},

	addAttributes() {
		return {
			width: {
				default: 1020,
				parseHTML: (el) => el.getAttribute('width'),
				renderHTML: (attrs) => (attrs.width ? { width: Number(attrs.width) } : {}),
			},
			height: {
				default: null,
				parseHTML: (el) => el.getAttribute('height'),
				renderHTML: (attrs) => (attrs.height ? { height: Number(attrs.height) } : {}),
			},
			gallery: {
				default: [],
				parseHTML(el) {
					const raw = el.getAttribute('gallery');
					try {
						return JSON.parse(raw || '[]');
					} catch {
						return [];
					}
				},
				renderHTML({ gallery }) {
					return {
						gallery: JSON.stringify(gallery),
					};
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'gallery',
			},
			{
				tag: 'gallery[data-type="gallery"]',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['gallery', mergeAttributes(HTMLAttributes, { 'data-type': 'gallery' })];
	},

	addNodeView() {
		return ReactNodeViewRenderer(GalleryComponent);
	},

	addCommands() {
		return {
			setGallery:
				(gallery: GalleryImage[]) =>
				({ commands }) => {
					const files = gallery.map((img) => img.file);

					const [validFiles, errors] = filterFiles(files, {
						allowedMimeTypes: this.options.allowedMimeTypes,
						maxFileSize: this.options.maxFileSize,
						allowBase64: this.options.allowBase64,
					});

					if (errors.length > 0 && this.options.onValidationError) {
						this.options.onValidationError(errors);
					}

					if (validFiles.length > 0) {
						const validGallery = gallery.filter((img) => validFiles.includes(img.file));

						return commands.insertContent({
							type: this.type.name,
							attrs: {
								gallery: validGallery.map((img) => ({
									id: img.id,
									url: img.url,
									fileName: img.fileName ?? img.file.name,
									file: URL.createObjectURL(img.file),
								})),
							},
						});
					}

					return false;
				},
		};
	},
});
