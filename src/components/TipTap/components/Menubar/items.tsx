import type { Editor } from '@tiptap/core';
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	ChevronsUpDown,
	Clipboard,
	Code,
	Columns2,
	Columns3,
	Copy,
	Cuboid,
	Grid2x2Check,
	Grid2x2X,
	Italic,
	ItalicIcon,
	LetterText,
	Maximize,
	Minus,
	QuoteIcon,
	Redo,
	Rows2,
	Rows3,
	Scissors,
	StrikethroughIcon,
	Subscript,
	SubscriptIcon,
	Superscript,
	SuperscriptIcon,
	TableCellsMerge,
	TableCellsSplit,
	Underline,
	UnderlineIcon,
	Undo,
} from 'lucide-react';
import { FaRegPaste } from 'react-icons/fa6';
import { RiBold } from 'react-icons/ri';
import { TbClearFormatting, TbSelectAll } from 'react-icons/tb';
import { DEFAULT_FONT_FAMILY_LIST } from '../../constants';
import { ExportPdf } from '../../icons/ExportPdf';
import ExportWord from '../../icons/ExportWord';
import { SectionColor } from '../Section/color';
import { SectionHighlight } from '../Section/highlight';
import SectionTable from '../Section/table';
import type { DialogType, MenuItem } from '.';

export function Items(
	editor: Editor,
	onOpenDialog: (dialog: Exclude<DialogType, null>) => void,
): MenuItem[] {
	return [
		{
			label: 'Arquivo',
			children: [
				{
					label: 'Exportar para PDF',
					icon: ExportPdf,
					action: () => editor.commands.exportToPdf(),
				},
				{
					label: 'Exportar para Word',
					icon: ExportWord,
					action: () => editor.commands.exportToWord(),
				},
			],
		},
		{
			label: 'Editar',
			children: [
				{
					label: 'Desfazer',
					shortcut: 'Ctrl+Z',
					icon: Undo,
					action: (editor) => editor.chain().focus().undo().run(),
					canExecute: (editor) => editor.can().undo(),
				},
				{
					label: 'Refazer',
					shortcut: 'Ctrl+Y',
					icon: Redo,
					action: (editor) => editor.chain().focus().redo().run(),
					canExecute: (editor) => editor.can().redo(),
				},
				{ separator: true },
				{
					label: 'Recortar',
					shortcut: 'Ctrl+X',
					icon: Scissors,
					action: (editor) => {
						const selected_text = editor.state.doc.textBetween(
							editor.state.selection.from,
							editor.state.selection.to,
						);

						navigator.clipboard.writeText(selected_text).then(() => {
							editor.chain().focus().deleteSelection().run();
						});
					},
					canExecute: (editor) => editor.state.selection.empty === false,
				},
				{
					label: 'Copiar',
					shortcut: 'Ctrl+C',
					icon: Copy,
					action: (editor) => {
						const selected_text = editor.state.doc.textBetween(
							editor.state.selection.from,
							editor.state.selection.to,
						);

						navigator.clipboard.writeText(selected_text);
					},
					canExecute: (editor) => editor.state.selection.empty === false,
				},
				{
					label: 'Colar',
					shortcut: 'Ctrl+V',
					icon: Clipboard,
					action: async (editor) => {
						const text = await navigator.clipboard.readText();
						editor.chain().focus().insertContent(text).run();
					},
				},
				{
					label: 'Colar como texto',
					icon: FaRegPaste,
					action: (editor) => {
						navigator.clipboard.readText().then((text) => {
							editor.chain().focus().insertContent(text).run();
						});
					},
				},
				{ separator: true },
				{
					label: 'Selecionar tudo',
					shortcut: 'Ctrl+A',
					icon: TbSelectAll,
					action: (editor) => editor.chain().focus().selectAll().run(),
					canExecute: (editor) => editor.can().selectAll(),
				},
			],
		},
		{
			label: 'Visualizar',
			children: [
				{
					label: 'Tela cheia',
					icon: Maximize,
					action: () => {
						const editor_element = document.querySelector('.tiptap-editor-group');

						if (editor_element) {
							editor_element.requestFullscreen();
						}
					},
				},
			],
		},
		{
			label: 'Inserir',
			children: [
				{
					label: 'Arquivo',
					action: () => onOpenDialog('file'),
				},
				{
					label: 'Galeria de imagens',
					action: () => onOpenDialog('gallery'),
				},
				{
					label: 'Imagem',
					action: () => onOpenDialog('image'),
				},
				{
					label: 'Link',
					action: () => onOpenDialog('link'),
				},
				{
					label: 'Mídia',
					action: () => onOpenDialog('video'),
				},
				{
					label: 'Tabela',
					component: <SectionTable editor={editor} toolbar={false} />,
				},
				{ separator: true },
				{
					label: 'Acordeão (Accordion)',
					icon: ChevronsUpDown,
					action: (editor) => {
						editor
							.chain()
							.focus()
							.setAccordion({
								title: 'Titulo',
								description: 'Descrição',
							})
							.run();
					},
				},
				{
					label: 'Bloco',
					icon: Cuboid,
					action: (editor) => {
						editor.chain().focus().setBlocoComponent({ text: 'Texto' }).run();
					},
				},
				{
					label: 'Fonte',
					icon: LetterText,
					action: (editor) => {
						editor.chain().focus().setFonteComponent().run();
					},
				},
				{ separator: true },
				{
					label: 'Bloco de citação',
					icon: QuoteIcon,
					action: (editor) => editor.chain().focus().toggleBlockquote().run(),
					canExecute: (editor) => editor.can().chain().focus().toggleBlockquote().run(),
					isActive: (editor) => editor.isActive('blockquote'),
				},
				{
					label: 'Linha horizontal',
					icon: Minus,
					action: (editor) => editor.chain().focus().setHorizontalRule().run(),
					canExecute: (editor) => editor.can().setHorizontalRule(),
					isActive: (editor) => editor.isActive('horizontalRule'),
				},
			],
		},
		{
			label: 'Formatar',
			children: [
				{
					label: 'Negrito',
					icon: RiBold,
					action: (editor) => editor.chain().focus().toggleBold().run(),
					canExecute: (editor) => editor.can().toggleBold(),
					isActive: (editor) => editor.isActive('bold'),
				},
				{
					label: 'Itálico',
					icon: ItalicIcon,
					action: (editor) => editor.chain().focus().toggleItalic().run(),
					canExecute: (editor) => editor.can().toggleItalic(),
					isActive: (editor) => editor.isActive('italic'),
				},
				{
					label: 'Sublinhado',
					icon: UnderlineIcon,
					action: (editor) => editor.chain().focus().toggleUnderline().run(),
					canExecute: (editor) => editor.can().toggleUnderline(),
					isActive: (editor) => editor.isActive('underline'),
				},
				{
					label: 'Riscado',
					icon: StrikethroughIcon,
					action: (editor) => editor.chain().focus().toggleStrike().run(),
					canExecute: (editor) => editor.can().toggleStrike(),
					isActive: (editor) => editor.isActive('strike'),
				},
				{
					label: 'Sobrescrito',
					icon: SuperscriptIcon,
					action: (editor) => editor.chain().focus().toggleSuperscript().run(),
					canExecute: (editor) => editor.can().toggleSuperscript(),
					isActive: (editor) => editor.isActive('superscript'),
				},
				{
					label: 'Subscrito',
					icon: SubscriptIcon,
					action: (editor) => editor.chain().focus().toggleSubscript().run(),
					canExecute: (editor) => editor.can().toggleSubscript(),
					isActive: (editor) => editor.isActive('subscript'),
				},
				{
					label: 'Monoespaçada',
					icon: Code,
					action: (editor) => editor.chain().focus().toggleCode().run(),
					canExecute: (editor) => editor.can().toggleCode(),
					isActive: (editor) => editor.isActive('code'),
				},
				{ separator: true },
				{
					label: 'Formatação',
					children: [
						{
							label: 'Título',
							children: [
								{
									label: 'Simples',
									action: (editor) => editor.chain().focus().setParagraph().run(),
									canExecute: (editor) => editor.can().setParagraph(),
									isActive: (editor) => editor.isActive('paragraph'),
								},
								{
									label: 'Título 1',
									action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
									canExecute: (editor) => editor.can().toggleHeading({ level: 1 }),
									isActive: (editor) => editor.isActive('heading', { level: 1 }),
								},
								{
									label: 'Título 2',
									action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
									canExecute: (editor) => editor.can().toggleHeading({ level: 2 }),
									isActive: (editor) => editor.isActive('heading', { level: 2 }),
								},
								{
									label: 'Título 3',
									action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
									canExecute: (editor) => editor.can().toggleHeading({ level: 3 }),
									isActive: (editor) => editor.isActive('heading', { level: 3 }),
								},
								{
									label: 'Título 4',
									action: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
									canExecute: (editor) => editor.can().toggleHeading({ level: 4 }),
									isActive: (editor) => editor.isActive('heading', { level: 4 }),
								},
								{
									label: 'Título 5',
									action: (editor) => editor.chain().focus().toggleHeading({ level: 5 }).run(),
									canExecute: (editor) => editor.can().toggleHeading({ level: 5 }),
									isActive: (editor) => editor.isActive('heading', { level: 5 }),
								},
								{
									label: 'Título 6',
									action: (editor) => editor.chain().focus().toggleHeading({ level: 6 }).run(),
									canExecute: (editor) => editor.can().toggleHeading({ level: 6 }),
									isActive: (editor) => editor.isActive('heading', { level: 6 }),
								},
							],
						},
						{
							label: 'Fonte',
							children: [
								{
									label: 'Negrito',
									icon: Bold,
									action: (editor) => editor.chain().focus().toggleBold().run(),
									canExecute: (editor) => editor.can().toggleBold(),
									isActive: (editor) => editor.isActive('bold'),
								},
								{
									label: 'Itálico',
									icon: Italic,
									action: (editor) => editor.chain().focus().toggleItalic().run(),
									canExecute: (editor) => editor.can().toggleItalic(),
									isActive: (editor) => editor.isActive('italic'),
								},
								{
									label: 'Sublinhado',
									icon: Underline,
									action: (editor) => editor.chain().focus().toggleUnderline().run(),
									canExecute: (editor) => editor.can().toggleUnderline(),
									isActive: (editor) => editor.isActive('underline'),
								},
								{
									label: 'Riscado',
									icon: StrikethroughIcon,
									action: (editor) => editor.chain().focus().toggleStrike().run(),
									canExecute: (editor) => editor.can().toggleStrike(),
									isActive: (editor) => editor.isActive('strike'),
								},
								{
									label: 'Sobrescrito',
									icon: Superscript,
									action: (editor) => editor.chain().focus().toggleSuperscript().run(),
									canExecute: (editor) => editor.can().toggleSuperscript(),
									isActive: (editor) => editor.isActive('superscript'),
								},
								{
									label: 'Subscrito',
									icon: Subscript,
									action: (editor) => editor.chain().focus().toggleSubscript().run(),
									canExecute: (editor) => editor.can().toggleSubscript(),
									isActive: (editor) => editor.isActive('subscript'),
								},
								{
									label: 'Monoespaçada',
									icon: Code,
									action: (editor) => editor.chain().focus().toggleCode().run(),
									canExecute: (editor) => editor.can().toggleCode(),
									isActive: (editor) => editor.isActive('code'),
								},
							],
						},
						{
							label: 'Parágrafo',
							children: [
								{ label: 'Simples' },
								{
									label: 'Bloco de citação',
									action: (editor) => editor.chain().focus().toggleBlockquote().run(),
									canExecute: (editor) => editor.can().toggleBlockquote(),
									isActive: (editor) => editor.isActive('blockquote'),
								},
								{
									label: 'Pré-formatado',
									action: (editor) => editor.chain().focus().togglePreBlock().run(),
									canExecute: (editor) => editor.can().togglePreBlock(),
									isActive: (editor) => editor.isActive('preBlock'),
								},
							],
						},
						{
							label: 'Alinhamento',
							children: [
								{
									label: 'À esquerda',
									icon: AlignLeft,
									action: (editor) => editor.chain().focus().setTextAlign('left').run(),
									canExecute: (editor) => editor.can().setTextAlign('left'),
									isActive: (editor) => editor.isActive('left'),
								},
								{
									label: 'Centro',
									icon: AlignCenter,
									action: (editor) => editor.chain().focus().setTextAlign('center').run(),
									canExecute: (editor) => editor.can().setTextAlign('center'),
									isActive: (editor) => editor.isActive('center'),
								},
								{
									label: 'À direita',
									icon: AlignRight,
									action: (editor) => editor.chain().focus().setTextAlign('right').run(),
									canExecute: (editor) => editor.can().setTextAlign('right'),
									isActive: (editor) => editor.isActive('right'),
								},
								{
									label: 'Justificar',
									icon: AlignJustify,
									action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
									canExecute: (editor) => editor.can().setTextAlign('justify'),
									isActive: (editor) => editor.isActive('justify'),
								},
							],
						},
					],
				},
				{
					label: 'Parágrafo',
					children: [
						{
							label: 'Simples',
							action: (editor) => editor.chain().focus().setParagraph().run(),
							canExecute: (editor) => editor.can().setParagraph(),
							isActive: (editor) => editor.isActive('paragraph'),
						},
						{
							label: 'Título 1',
							action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
							canExecute: (editor) => editor.can().toggleHeading({ level: 1 }),
							isActive: (editor) => editor.isActive('heading', { level: 1 }),
						},
						{
							label: 'Título 1',
							action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
							canExecute: (editor) => editor.can().toggleHeading({ level: 2 }),
							isActive: (editor) => editor.isActive('heading', { level: 2 }),
						},
						{
							label: 'Título 3',
							action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
							canExecute: (editor) => editor.can().toggleHeading({ level: 3 }),
							isActive: (editor) => editor.isActive('heading', { level: 3 }),
						},
						{
							label: 'Título 4',
							action: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
							canExecute: (editor) => editor.can().toggleHeading({ level: 4 }),
							isActive: (editor) => editor.isActive('heading', { level: 4 }),
						},
						{
							label: 'Título 5',
							action: (editor) => editor.chain().focus().toggleHeading({ level: 5 }).run(),
							canExecute: (editor) => editor.can().toggleHeading({ level: 5 }),
							isActive: (editor) => editor.isActive('heading', { level: 5 }),
						},
						{
							label: 'Título 6',
							action: (editor) => editor.chain().focus().toggleHeading({ level: 6 }).run(),
							canExecute: (editor) => editor.can().toggleHeading({ level: 6 }),
							isActive: (editor) => editor.isActive('heading', { level: 6 }),
						},
						{
							label: 'Pré-formatado',
							action: (editor) => editor.chain().focus().togglePreBlock().run(),
							canExecute: (editor) => editor.can().togglePreBlock(),
							isActive: (editor) => editor.isActive('preBlock'),
						},
					],
				},
				{
					label: 'Fonte',
					children: [
						{
							label: 'Remover Fonte',
							action: (editor) => editor.chain().focus().unsetFontFamily().run(),
							canExecute: (editor) => editor.can().unsetFontFamily(),
						},

						...DEFAULT_FONT_FAMILY_LIST.map((font) => ({
							label: font.label,
							action: (editor: Editor) => editor.chain().focus().setFontFamily(font.value).run(),
							canExecute: (editor: Editor) => editor.can().setFontFamily(font.value),
							isActive: (editor: Editor) =>
								editor.isActive('textStyle', { fontFamily: font.value }),
						})),
					],
				},
				{
					label: 'Alinhamento',
					children: [
						{
							label: 'À esquerda',
							icon: AlignLeft,
							action: (editor) => editor.chain().focus().setTextAlign('left').run(),
							isActive: (editor) => editor.isActive({ textAlign: 'left' }),
							canExecute: (editor) => editor.can().chain().focus().setTextAlign('left').run(),
						},
						{
							label: 'Centro',
							icon: AlignCenter,
							action: (editor) => editor.chain().focus().setTextAlign('center').run(),
							isActive: (editor) => editor.isActive({ textAlign: 'center' }),
							canExecute: (editor) => editor.can().chain().focus().setTextAlign('center').run(),
						},
						{
							label: 'À direita',
							icon: AlignRight,
							action: (editor) => editor.chain().focus().setTextAlign('right').run(),
							isActive: (editor) => editor.isActive({ textAlign: 'right' }),
							canExecute: (editor) => editor.can().chain().focus().setTextAlign('right').run(),
						},
						{
							label: 'Justificar',
							icon: AlignJustify,
							action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
							isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
							canExecute: (editor) => editor.can().chain().focus().setTextAlign('justify').run(),
						},
					],
				},
				{ separator: true },
				{
					label: 'Cor do texto',
					component: <SectionColor editor={editor} toolbar={false} />,
				},
				{
					label: 'Cor de fundo',
					component: <SectionHighlight editor={editor} toolbar={false} />,
				},
				{ separator: true },
				{
					label: 'Limpar formatação',
					icon: TbClearFormatting,
					action: (editor) => editor.chain().focus().unsetAllMarks().clearNodes().run(),
					canExecute: (editor) => editor.can().unsetAllMarks(),
				},
			],
		},
		{
			label: 'Tabela',
			children: [
				{
					label: 'Tabela',
					component: <SectionTable editor={editor} toolbar={false} />,
				},
				{ separator: true },
				{
					label: 'Célula',
					children: [
						{
							label: 'Agrupar células',
							icon: TableCellsMerge,
							action: (editor) => editor.chain().focus().mergeCells().run(),
							canExecute: (editor) => editor.can().mergeCells(),
						},
						{
							label: 'Dividir células',
							icon: TableCellsSplit,
							action: (editor) => editor.chain().focus().splitCell().run(),
							canExecute: (editor) => editor.can().splitCell(),
						},
						{
							label: 'Trocar cabeçalho na célula',
							icon: Grid2x2Check,
							action: (editor) => editor.chain().focus().toggleHeaderCell().run(),
							canExecute: (editor) => editor.can().toggleHeaderCell(),
						},
					],
				},
				{
					label: 'Linha',
					children: [
						{
							label: 'Inserir linha antes',
							icon: Rows2,
							action: (editor) => editor.chain().focus().addRowBefore().run(),
							canExecute: (editor) => editor.can().addRowBefore(),
						},
						{
							label: 'Inserir linha depois',
							icon: Rows3,
							action: (editor) => editor.chain().focus().addRowAfter().run(),
							canExecute: (editor) => editor.can().addRowAfter(),
						},
						{
							label: 'Excluir linha',
							icon: Grid2x2X,
							action: (editor) => editor.chain().focus().deleteRow().run(),
							canExecute: (editor) => editor.can().deleteRow(),
						},
						{
							label: 'Trocar cabeçalho na linha',
							icon: Grid2x2Check,
							action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
							canExecute: (editor) => editor.can().toggleHeaderRow(),
						},
					],
				},
				{
					label: 'Coluna',
					children: [
						{
							label: 'Inserir coluna antes',
							icon: Columns2,
							action: (editor) => editor.chain().focus().addColumnBefore().run(),
							canExecute: (editor) => editor.can().addColumnBefore(),
						},
						{
							label: 'Inserir coluna depois',
							icon: Columns3,
							action: (editor) => editor.chain().focus().addColumnAfter().run(),
							canExecute: (editor) => editor.can().addColumnAfter(),
						},
						{
							label: 'Excluir coluna',
							icon: Grid2x2X,
							action: (editor) => editor.chain().focus().deleteColumn().run(),
							canExecute: (editor) => editor.can().deleteColumn(),
						},
						{
							label: 'Trocar cabeçalho na coluna',
							icon: Grid2x2Check,
							action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
							canExecute: (editor) => editor.can().toggleHeaderColumn(),
						},
					],
				},
				{ separator: true },
				{
					label: 'Excluir tabela',
					icon: Grid2x2X,
					action: (editor) => editor.chain().focus().deleteTable().run(),
					canExecute: (editor) => editor.can().deleteTable(),
				},
			],
		},
	];
}
