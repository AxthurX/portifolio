import BubbleMenu from '@tiptap/extension-bubble-menu';
import { FontFamily } from '@tiptap/extension-font-family';
import HardBreak from '@tiptap/extension-hard-break';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import type { Attrs } from '@tiptap/pm/model';
import StarterKit from '@tiptap/starter-kit';
import { Alert } from '@/lib/utils';
import {
	FileHandler,
	HorizontalRule,
	Image,
	type ImageActionProps,
	Link,
	ListNode,
	ResetMarksOnEnter,
	UnsetAllMarks,
} from '../extensions';
import { AccordionNode } from '../extensions/accordion';
import { BlocoNode } from '../extensions/bloco';
import { TextBold } from '../extensions/bold';
import { DetailsNode } from '../extensions/details';
import { DivNode } from '../extensions/div';
import { Excalidraw } from '../extensions/excalidraw';
import { ExportPdf } from '../extensions/export-pdf/export-pdf';
import { ExportWord } from '../extensions/export-word';
import { File } from '../extensions/file';
import { FonteNode } from '../extensions/fonte';
import { Gallery } from '../extensions/gallery';
import { HeadingNode } from '../extensions/heading';
import { Indent } from '../extensions/indent';
import { Italic } from '../extensions/italic';
import { ParagraphNode } from '../extensions/paragraph';
import PreBlock from '../extensions/pre';
import { Print } from '../extensions/print';
import { SpanNode } from '../extensions/span';
import { Strike } from '../extensions/strike';
import { StrongNode } from '../extensions/strong';
import { SummaryNode } from '../extensions/summary';
import TableNode from '../extensions/table';
import { TextUnderline } from '../extensions/underline';
import { Video } from '../extensions/video';
import { Youtube } from '../extensions/youtube/index';
import { type FileError, fileToBase64, randomID } from '../utils';

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export const fakeUpload = async (file: File) => {
	await new Promise((r) => setTimeout(r, 3000));
	const src = await fileToBase64(file);
	const id = file.name.split('-')[0];
	return { id, src };
};

export const validateFileSize = (file: File, maxSize: number, label: string) => {
	if (file.size > maxSize) {
		Alert(
			`Erro ao enviar ${label}`,
			`O tamanho atual ultrapassa o tamanho máximo permitido: '${(file.size / 1024 / 1024).toFixed(0)} MB', \n Reduza para menos que '${(maxSize / 1024 / 1024).toFixed(0)} MB'`,
			'warning',
		);
		return false;
	}
	return true;
};

export const EXTENSIONS = [
	Link.configure({
		openOnClick: false,
		autolink: true,
		defaultProtocol: 'https',
		protocols: ['http', 'https'],
	}),

	StarterKit.configure({
		link: false,
		bold: false,
		italic: false,
		strike: false,
		heading: false,
		bulletList: false,
		hardBreak: false,
		paragraph: false,
		horizontalRule: false,
		underline: false,
		codeBlock: false,
		undoRedo: {
			depth: 100,
			newGroupDelay: 500,
		},
	}),

	// Base
	Typography,
	BubbleMenu,

	// Nodes
	DivNode,
	SpanNode,
	ParagraphNode,
	HeadingNode,
	StrongNode,
	DetailsNode,
	SummaryNode,
	FonteNode,
	BlocoNode,
	AccordionNode,
	ListNode,
	File,
	PreBlock,
	Print,

	// Marks
	TextBold,
	Italic,
	Strike,
	Subscript,
	Superscript,
	TextUnderline,
	Highlight.configure({ multicolor: true }),
	TextStyleKit.configure({
		fontFamily: false,
	}),
	FontFamily.configure({
		types: ['textStyle'],
	}),

	// Behavior
	HardBreak.configure({ keepMarks: false }),
	Indent,
	UnsetAllMarks,
	ResetMarksOnEnter,

	// Layout
	TextAlign.configure({
		types: ['heading', 'paragraph'],
	}),
	// Column,
	// MultiColumn,

	// Table
	TableNode.configure({
		resizable: true,
		handleWidth: 40,
		cellMinWidth: 48,
		lastColumnResizable: true,
	}),

	// Gallery
	Gallery.configure({
		allowedMimeTypes: ['image/*'],
		maxFileSize: MAX_IMAGE_SIZE,
		allowBase64: true,
		onValidationError(errors: FileError[]) {
			errors.map((e) => Alert('Erro ao validar imagem', e.reason, 'destructive'));
		},
	}),

	// Image
	Image.configure({
		inline: true,
		allowBase64: true,
		maxFileSize: MAX_IMAGE_SIZE,
		onImageRemoved({ id, src }: Attrs) {
			console.log('Imagem removida', { id, src });
		},
		onActionSuccess({ action }: ImageActionProps) {
			const map = {
				copyImage: 'Imagem copiada',
				copyLink: 'Link copiado',
				download: 'Download iniciado',
				toggle: 'Imagem alterada',
			};
			Alert('Sucesso', map[action], 'default');
		},
		onActionError(error, { action }: ImageActionProps) {
			Alert(`Falha ao executar ${action}`, error.message, 'destructive');
		},
	}),

	// Video
	Video,

	// Drag & Paste
	FileHandler.configure({
		allowBase64: false,
		allowedMimeTypes: ['image/*'],
		maxFileSize: MAX_IMAGE_SIZE,
		async onDrop(editor, files, pos) {
			for (const file of files) {
				const id = randomID(12);
				const src = await fileToBase64(file);

				editor.commands.insertContentAt(pos, {
					type: 'image',
					attrs: { src, id },
				});
			}
		},
		async onPaste(editor, files) {
			for (const file of files) {
				const id = randomID(12);
				const src = await fileToBase64(file);

				editor.commands.insertContent({
					type: 'image',
					attrs: { src, id },
				});
			}
		},
	}),

	Youtube.configure({
		width: 640,
		height: 480,
		controls: false,
	}),

	HorizontalRule,
	Excalidraw,
	ExportPdf,
	ExportWord,
];
