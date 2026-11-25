import { type Editor, Extension } from '@tiptap/core';
import {
	AlignmentType,
	BorderStyle,
	Document,
	HeadingLevel,
	ImageRun,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	TextRun,
	WidthType,
} from 'docx';
import type { GeneralOptions } from '../../interfaces/types';
import { downloadFromBlob } from '../../utils/download';
import { extractRuns, fetchImage, getAlign, imgType, runsToDocx } from './components/helpers';
import type { NumberingConfig, ParagraphWithOptions } from './components/types';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		exportWord: {
			exportToWord: () => ReturnType;
		};
	}
}

interface ExportWordOptions extends GeneralOptions<ExportWordOptions> {}

export * from './components/text-export-word';

async function nodeToBlocks(
	el: Element,
	numbering: { config: NumberingConfig[]; counters: Record<string, number> },
): Promise<(Paragraph | Table)[]> {
	const tag = el.tagName?.toUpperCase();

	if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tag)) {
		if (el.classList.contains('excalidraw')) return [];

		const HEADING_MAP: Record<string, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
			H1: HeadingLevel.HEADING_1,
			H2: HeadingLevel.HEADING_2,
			H3: HeadingLevel.HEADING_3,
			H4: HeadingLevel.HEADING_4,
			H5: HeadingLevel.HEADING_5,
			H6: HeadingLevel.HEADING_6,
		};

		const raw_runs = extractRuns(el);
		const children = runsToDocx(raw_runs);

		return [
			new Paragraph({
				heading: HEADING_MAP[tag],
				alignment: getAlign(el as HTMLElement),
				children: children.length ? children : [new TextRun('')],
			}),
		];
	}

	if (tag === 'IMG') {
		const src = el.getAttribute('src') ?? '';
		const buffer = await fetchImage(src);
		const blocks: (Paragraph | Table)[] = [];

		if (buffer) {
			blocks.push(
				new Paragraph({
					alignment: AlignmentType.CENTER,
					children: [
						new ImageRun({
							data: buffer,
							transformation: { width: 400, height: 250 },
							type: imgType(src),
						}),
					],
				}),
			);
		}

		const caption = el.getAttribute('data-caption') || el.getAttribute('title');
		if (caption) {
			blocks.push(
				new Paragraph({
					alignment: AlignmentType.CENTER,
					children: [new TextRun({ text: caption, italics: true, size: 20 })],
				}),
			);
		}

		return blocks;
	}

	if (tag === 'UL' || tag === 'OL') {
		return listToBlocks(el as HTMLElement, tag === 'OL', 0, numbering);
	}

	if (tag === 'TABLE') {
		return [tableToDocx(el as HTMLElement)];
	}

	if (tag === 'BLOCKQUOTE') {
		const blocks: Paragraph[] = [];
		for (const child of Array.from(el.children)) {
			const inner = await nodeToBlocks(child, numbering);
			for (const b of inner) {
				if (b instanceof Paragraph) {
					const b_opts = b as unknown as ParagraphWithOptions;
					blocks.push(
						new Paragraph({
							indent: { left: 720 },
							border: {
								left: {
									style: BorderStyle.SINGLE,
									size: 6,
									color: '999999',
									space: 4,
								},
							},
							children: b_opts.options?.children ?? [],
						}),
					);
				}
			}
		}
		return blocks;
	}

	const blocks: (Paragraph | Table)[] = [];
	for (const child of Array.from(el.children)) {
		blocks.push(...(await nodeToBlocks(child, numbering)));
	}
	return blocks;
}

function listToBlocks(
	el: HTMLElement,
	ordered: boolean,
	level: number,
	numbering: { config: NumberingConfig[]; counters: Record<string, number> },
): Paragraph[] {
	const ref = `${ordered ? 'ol' : 'ul'}-lvl${level}`;

	if (!numbering.config.find((c) => c.reference === ref)) {
		numbering.config.push({
			reference: ref,
			levels: [
				{
					level: 0,
					format: ordered ? 'decimal' : 'bullet',
					text: ordered ? '%1.' : '•',
					alignment: AlignmentType.LEFT,
					style: {
						paragraph: { indent: { left: 720 * (level + 1), hanging: 360 } },
					},
				},
			],
		});
	}

	const paragraphs: Paragraph[] = [];

	for (const li of Array.from(el.children)) {
		if (li.tagName !== 'LI') continue;

		const text_nodes = Array.from(li.childNodes).filter(
			(n) => !(n instanceof HTMLElement && ['UL', 'OL'].includes(n.tagName)),
		);

		const temp_div = document.createElement('div');
		text_nodes.forEach((n) => {
			temp_div.appendChild(n.cloneNode(true));
		});
		const raw_runs = extractRuns(temp_div);

		paragraphs.push(
			new Paragraph({
				numbering: { reference: ref, level: 0 },
				children: runsToDocx(raw_runs),
			}),
		);

		for (const child of Array.from(li.children)) {
			if (child.tagName === 'UL' || child.tagName === 'OL') {
				paragraphs.push(
					...listToBlocks(child as HTMLElement, child.tagName === 'OL', level + 1, numbering),
				);
			}
		}
	}

	return paragraphs;
}

function tableToDocx(table: HTMLElement): Table {
	const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
	const borders = { top: border, bottom: border, left: border, right: border };

	const rows: TableRow[] = [];

	for (const tr of Array.from(table.querySelectorAll('tr'))) {
		const cells = Array.from(tr.querySelectorAll('td, th')).map(
			(td) =>
				new TableCell({
					borders,
					margins: { top: 80, bottom: 80, left: 120, right: 120 },
					children: [
						new Paragraph({
							children: runsToDocx(extractRuns(td as HTMLElement)),
						}),
					],
				}),
		);
		if (cells.length) rows.push(new TableRow({ children: cells }));
	}

	return new Table({
		width: { size: 9360, type: WidthType.DXA },
		rows,
	});
}

async function htmlToDocxBlob(html: string): Promise<Blob> {
	const parser = new DOMParser();
	const doc = parser.parseFromString(`<body>${html}</body>`, 'text/html');
	const body = doc.body;

	const numbering: {
		config: NumberingConfig[];
		counters: Record<string, number>;
	} = {
		config: [],
		counters: {},
	};

	const children: (Paragraph | Table)[] = [];

	for (const el of Array.from(body.children)) {
		children.push(...(await nodeToBlocks(el, numbering)));
	}

	if (children.length === 0) {
		children.push(new Paragraph({ children: [new TextRun('')] }));
	}

	const word_doc = new Document({
		numbering: { config: numbering.config },
		sections: [
			{
				properties: {
					page: {
						size: { width: 12240, height: 15840 },
						margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
					},
				},
				children,
			},
		],
	});

	return Packer.toBlob(word_doc);
}

export const ExportWord = /* @__PURE__ */ Extension.create<ExportWordOptions>({
	name: 'exportWord',

	addOptions() {
		return {
			...this.parent?.(),
			button: ({ editor, t }: { editor: Editor; t: (key: string) => string }) => ({
				component: undefined,
				componentProps: {
					icon: 'ExportWord',
					action: () => editor?.commands.exportToWord(),
					tooltip: t('editor.exportWord.tooltip'),
					isActive: () => false,
					disabled: false,
				},
			}),
		};
	},

	addCommands() {
		return {
			exportToWord: () => () => {
				const html = this.editor.getHTML();

				void (async () => {
					try {
						const blob = await htmlToDocxBlob(html);

						downloadFromBlob(
							new Blob([blob], {
								type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
							}),
							'richtext-export-document.docx',
						);
					} catch (error) {
						console.error('Error exporting to Word:', error);
					}
				})();

				return true;
			},
		};
	},
});
