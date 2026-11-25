import type {
    AlignmentType,
    ExternalHyperlink,
    Paragraph,
    TextRun,
} from 'docx';

export type Alignment = (typeof AlignmentType)[keyof typeof AlignmentType];

export type NumberingLevelConfig = {
	level: number;
	format: 'decimal' | 'bullet';
	text: string;
	alignment: Alignment;
	style: {
		paragraph: {
			indent: { left: number; hanging: number };
		};
	};
};

export type NumberingConfig = {
	reference: string;
	levels: NumberingLevelConfig[];
};

export type TextRunProps = {
	text?: string;
	bold?: boolean;
	italics?: boolean;
	underline?: Record<string, unknown>;
	strike?: boolean;
	font?: string;
	color?: string;
	size?: number;
	break?: number;
};

export type ParsedRun = TextRunProps & {
	_link?: string;
	children?: ParsedRun[];
};

export type ParagraphWithOptions = Paragraph & {
	options?: { children?: (TextRun | ExternalHyperlink)[] };
};
