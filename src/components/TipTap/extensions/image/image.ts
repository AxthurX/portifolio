import type { ImageOptions } from '@tiptap/extension-image';
import { Image as TiptapImage } from '@tiptap/extension-image';
import type { Attrs } from '@tiptap/pm/model';
import { ReplaceStep } from '@tiptap/pm/transform';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { type FileError, type FileValidationOptions, filterFiles } from '../../utils';
import { ImageViewBlock } from './components/image-view-block';

type ImageAction = 'download' | 'copyImage' | 'copyLink';

interface DownloadImageCommandProps {
	src: string;
	alt?: string;
}

export interface ImageActionProps extends DownloadImageCommandProps {
	action: ImageAction;
}

export type UploadReturnType =
	| string
	| {
			id: string | number;
			src: string;
	  };

interface CustomImageOptions extends ImageOptions, Omit<FileValidationOptions, 'allowBase64'> {
	onImageRemoved?: (props: Attrs) => void;
	onActionSuccess?: (props: ImageActionProps) => void;
	onActionError?: (error: Error, props: ImageActionProps) => void;
	downloadImage?: (props: ImageActionProps, options: CustomImageOptions) => Promise<void>;
	copyImage?: (props: ImageActionProps, options: CustomImageOptions) => Promise<void>;
	onValidationError?: (errors: FileError[]) => void;
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		setImages: {
			setImages: (
				attrs: {
					id?: string;
					src: string | File;
					alt?: string;
					title?: string;
				}[],
			) => ReturnType;
		};
		downloadImage: {
			downloadImage: (attrs: DownloadImageCommandProps) => ReturnType;
		};
		copyImage: {
			copyImage: (attrs: DownloadImageCommandProps) => ReturnType;
		};
		setImageAlign: {
			setImageAlign: (float: string) => ReturnType;
		};
		setImageTextAlign: {
			setImageTextAlign: (position: string) => ReturnType;
		};
	}
}

const handleError = (
	error: unknown,
	props: ImageActionProps,
	errorHandler?: (error: Error, props: ImageActionProps) => void,
): void => {
	const typedError = error instanceof Error ? error : new Error('Erro desconhecido');
	errorHandler?.(typedError, props);
};

const handleDataUrl = (src: string): { blob: Blob; extension: string } => {
	const [header, base64Data] = src.split(',');
	const mimeType = header.split(':')[1].split(';')[0];
	const extension = mimeType.split('/')[1];
	const byteCharacters = atob(base64Data);
	const byteArray = new Uint8Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteArray[i] = byteCharacters.charCodeAt(i);
	}
	const blob = new Blob([byteArray], { type: mimeType });
	return { blob, extension };
};

const handleImageUrl = async (src: string): Promise<{ blob: Blob; extension: string }> => {
	const response = await fetch(src);
	if (!response.ok) throw new Error('Falha ao buscar a imagem');
	const blob = await response.blob();
	const extension = blob.type.split(/\/|\+/)[1];
	return { blob, extension };
};

const fetchImageBlob = async (src: string): Promise<{ blob: Blob; extension: string }> => {
	return src.startsWith('data:') ? handleDataUrl(src) : handleImageUrl(src);
};

const saveImage = async (blob: Blob, name: string, extension: string): Promise<void> => {
	if (typeof document !== 'undefined') {
		const image_url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = image_url;
		link.download = `${name}.${extension}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(image_url);
	}
};

const downloadImage = async (
	props: ImageActionProps,
	options: CustomImageOptions,
): Promise<void> => {
	const { src, alt } = props;
	const potentialName = alt || 'image';

	try {
		const { blob, extension } = await fetchImageBlob(src);
		await saveImage(blob, potentialName, extension);
		options.onActionSuccess?.({ ...props, action: 'download' });
	} catch (error) {
		handleError(error, { ...props, action: 'download' }, options.onActionError);
	}
};

const copyImage = async (props: ImageActionProps, options: CustomImageOptions): Promise<void> => {
	const { src } = props;
	try {
		const res = await fetch(src);
		const blob = await res.blob();
		await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
		options.onActionSuccess?.({ ...props, action: 'copyImage' });
	} catch (error) {
		handleError(error, { ...props, action: 'copyImage' }, options.onActionError);
	}
};

export const Image = TiptapImage.extend<CustomImageOptions>({
	name: 'image',

	atom: true,

	draggable: true,

	// isolating: true,

	selectable: true,

	priority: 1000,

	inline() {
		return false;
	},

	group() {
		return 'block';
	},

	addOptions() {
		const parent = this.parent?.() as ImageOptions;

		return {
			...parent,
			HTMLAttributes: {},
			inline: this.parent?.().inline ?? false,
			allowBase64: false,
			allowedMimeTypes: [],
			maxFileSize: 0,
			uploadFn: undefined,
			downloadImage: undefined,
			copyImage: undefined,
		} as CustomImageOptions;
	},

	addAttributes() {
		return {
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
			width: {
				default: '100%',
				parseHTML: (el) => {
					if (el.style && el.style.width) return el.style.width;
					const attrWidth = el.getAttribute('width') || el.getAttribute('data-width');
					if (attrWidth)
						return attrWidth.includes('%') || attrWidth.includes('px')
							? attrWidth
							: `${attrWidth}px`;
					return '100%';
				},
				renderHTML: (attrs) => {
					if (!attrs.width || attrs.width === '100%') return {};

					const w = String(attrs.width);
					const widthValue =
						w.includes('%') || w.includes('px') || w.includes('rem') ? w : `${w}px`;

					return {
						style: `width: ${widthValue}; max-width: 100%;`,
						'data-width': widthValue,
					};
				},
			},
			float: {
				default: 'none',
				parseHTML: (el) => {
					if (el.style && el.style.cssFloat) return el.style.cssFloat;
					const dataFloat = el.getAttribute('data-float');
					if (dataFloat) return dataFloat;
					return 'none';
				},
				renderHTML: (attrs) => {
					if (!attrs.float || attrs.float === 'none') return {};
					return {
						'data-float': attrs.float,
						style: `float: ${attrs.float};`,
					};
				},
			},
			height: {
				default: null,
				parseHTML: (el) => el.getAttribute('height'),
				renderHTML: (attrs) => (attrs.height ? { height: attrs.height } : {}),
			},
			figureClass: {
				default: null,
				parseHTML: (el) => {
					const figure = el.closest('figure');
					if (!figure) return null;

					return figure.className;
				},
			},
			title: {
				default: null,
				parseHTML: (el) => {
					const img = el as HTMLElement;

					const figure = img.closest('figure');

					const caption = figure?.querySelector('figcaption');

					if (caption?.textContent?.trim()) {
						return caption.textContent.trim();
					}

					return img.getAttribute('title');
				},
			},
			caption: {
				default: null,
				parseHTML: (el) => {
					const figure = el.closest('figure');

					if (!figure) {
						return null;
					}

					const caption = figure.querySelector('figcaption');

					if (!caption) {
						return null;
					}

					return {
						text: caption.textContent?.trim() ?? null,
						class: caption.className || null,
					};
				},
			},
			src: { default: null },
			alt: { default: null },
			fileName: { default: null },
			textAlign: { default: 'left' },
			margin: { default: null },
		};
	},

	addCommands() {
		return {
			setImages:
				(attrs) =>
				({ commands }) => {
					const [validImages, errors] = filterFiles(attrs, {
						allowedMimeTypes: this.options.allowedMimeTypes,
						maxFileSize: this.options.maxFileSize,
						allowBase64: this.options.allowBase64,
					});

					if (errors.length > 0 && this.options.onValidationError) {
						this.options.onValidationError(errors);
					}

					if (validImages.length > 0) {
						return commands.insertContent(
							validImages.map((image) => {
								const name = image.src instanceof File ? image.src.name : image.src;
								const id = name.split('-')[0];

								if (image.src instanceof File) {
									const blobUrl = URL.createObjectURL(image.src);

									return {
										type: this.type.name,
										attrs: {
											id: id,
											src: blobUrl,
											alt: image.alt,
											title: image.title,
											fileName: image.src.name,
										},
									};
								} else {
									return {
										type: this.type.name,
										attrs: {
											id: image.id,
											src: image.src,
											alt: image.alt,
											title: image.title,
											fileName: null,
										},
									};
								}
							}),
						);
					}

					return false;
				},
			downloadImage: (attrs) => () => {
				const downloadFunc = this.options.downloadImage || downloadImage;
				void downloadFunc({ ...attrs, action: 'download' }, this.options);
				return true;
			},
			copyImage: (attrs) => () => {
				const copyImageFunc = this.options.copyImage || copyImage;
				void copyImageFunc({ ...attrs, action: 'copyImage' }, this.options);
				return true;
			},
			setImageAlign:
				(alignment: string) =>
				({ commands }) => {
					const attrs =
						alignment === 'center'
							? { float: 'none', margin: '0 auto', display: 'block' }
							: alignment === 'none'
								? { float: 'none', margin: null }
								: { float: alignment, margin: null };

					return commands.updateAttributes('image', attrs);
				},
			setImageTextAlign:
				(alignment: string) =>
				({ commands }) => {
					return commands.updateAttributes('image', {
						textAlign: alignment,
					});
				},
		};
	},

	onTransaction({ transaction }) {
		transaction.steps.forEach((step) => {
			if (step instanceof ReplaceStep && step.slice.size === 0) {
				const deletedPages = transaction.before.content.cut(step.from, step.to);

				deletedPages.forEach((node) => {
					if (node.type.name === 'image') {
						const attrs = node.attrs;

						if (attrs.src.startsWith('blob:')) {
							URL.revokeObjectURL(attrs.src);
						}

						this.options.onImageRemoved?.(attrs);
					}
				});
			}
		});
	},

	parseHTML() {
		return [
			{
				tag: 'figure',
				getAttrs: (figure) => {
					const img = figure.querySelector('img');

					if (!img) {
						return false;
					}

					return {
						src: img.getAttribute('src'),
						id: img.getAttribute('id'),
						alt: img.getAttribute('alt'),
						title: img.getAttribute('title'),
						caption: {
							text: figure.querySelector('figcaption')?.textContent?.trim() ?? null,
							class: figure.querySelector('figcaption')?.className ?? null,
						},
					};
				},
			},
			{
				tag: 'img[src]',
			},
		];
	},

	addNodeView() {
		return ReactNodeViewRenderer(ImageViewBlock, {
			className: 'image',
		});
	},
});
