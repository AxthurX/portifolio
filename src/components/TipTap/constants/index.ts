export const IMAGE_MIN_SIZE = 20;

export const IMAGE_MAX_SIZE = 100_000;

export const IMAGE_THROTTLE_WAIT_TIME = 16;

export const TABLE_INIT_GRID_SIZE = 10;

export const TABLE_MAX_GRID_SIZE = 10;

export const TABLE_DEFAULT_SELECTED_GRID_SIZE = 2;

export const DEFAULT_COLOR = '#262626';

export const COLORS_LIST = [
	'#000000',
	'#262626',
	'#595959',
	'#8C8C8C',
	'#BFBFBF',
	'#D9D9D9',
	'#E9E9E9',
	'#F5F5F5',
	'#FAFAFA',
	'#FFFFFF',
	'#F5222D',
	'#FA541C',
	'#FA8C16',
	'#FADB14',
	'#52C41A',
	'#13C2C2',
	'#1890FF',
	'#2F54EB',
	'#722ED1',
	'#EB2F96',
	'#FFE8E6',
	'#FFECE0',
	'#FFEFD1',
	'#FCFCCA',
	'#E4F7D2',
	'#D3F5F0',
	'#D4EEFC',
	'#DEE8FC',
	'#EFE1FA',
	'#FAE1EB',
	'#FFA39E',
	'#FFBB96',
	'#FFD591',
	'#FFFB8F',
	'#B7EB8F',
	'#87E8DE',
	'#91D5FF',
	'#ADC6FF',
	'#D3ADF7',
	'#FFADD2',
	'#FF4D4F',
	'#FF7A45',
	'#FFA940',
	'#FFEC3D',
	'#73D13D',
	'#36CFC9',
	'#40A9FF',
	'#597EF7',
	'#9254DE',
	'#F759AB',
	'#CF1322',
	'#D4380D',
	'#D46B08',
	'#D4B106',
	'#389E0D',
	'#08979C',
	'#096DD9',
	'#1D39C4',
	'#531DAB',
	'#C41D7F',
	'#820014',
	'#871400',
	'#873800',
	'#614700',
	'#135200',
	'#00474F',
	'#003A8C',
	'#061178',
	'#22075E',
	'#780650',
] as const;

export const DEFAULT_FONT_FAMILY_LIST = [
	{ label: 'Inter', value: 'Inter, sans-serif' },
	{ label: 'Andale Mono', value: '"Andale Mono", monospace' },
	{ label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
	{ label: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
	{ label: 'Book Antiqua', value: '"Book Antiqua", Palatino, serif' },
	{ label: 'Comic Sans MS', value: '"Comic Sans MS", "Comic Sans", cursive' },
	{ label: 'Courier New', value: '"Courier New", Courier, monospace' },
	{ label: 'Exo 2', value: '"Exo 2", sans-serif' },
	{ label: 'Georgia', value: 'Georgia, serif' },
	{ label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
	{ label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
	{ label: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
	{ label: 'Monaco', value: 'Monaco, monospace' },
	{ label: 'Monospace', value: 'monospace' },
	{ label: 'Serif', value: 'serif' },
	{ label: 'Symbol', value: 'Symbol' },
	{ label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
	{ label: 'Terminal', value: 'Terminal, monospace' },
	{ label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
	{ label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
	{ label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
	{ label: 'Webdings', value: 'Webdings' },
	{ label: 'Wingdings', value: 'Wingdings' },
];

export const DEFAULT_FONT_SIZE_LIST = [
	'10px',
	'11px',
	'12px',
	'14px',
	'16px',
	'18px',
	'20px',
	'22px',
	'24px',
	'26px',
	'28px',
	'36px',
	'48px',
	'72px',
] as const;

export const DEFAULT_FONT_SIZE_VALUE = 'default';

export enum IMAGE_SIZE {
	'size-small' = 200,
	'size-medium' = 500,
	'size-large' = '100%',
}

export enum VIDEO_SIZE {
	'size-small' = 480,
	'size-medium' = 640,
	'size-large' = '100%',
}

export const BUBBLE_TEXT_LIST = [
	'bold',
	'italic',
	'underline',
	'strike',
	'link',
];

export const BORDER_STYLE_LIST = [
	{ value: 'none', label: 'Nenhum(a)' },
	{ value: 'solid', label: 'Sólida' },
	{ value: 'dotted', label: 'Pontilhada' },
	{ value: 'dashed', label: 'Tracejada' },
	{ value: 'double', label: 'Dupla' },
	{ value: 'groove', label: 'Chanfrada' },
	{ value: 'ridge', label: 'Ressaltada' },
	{ value: 'inset', label: 'Baixo relevo' },
	{ value: 'outset', label: 'Alto relevo' },
	{ value: 'hidden', label: 'Oculta' },
];

export const TEXT_ALIGN_LIST = [
	{ value: 'none', label: 'Nenhum(a)' },
	{ value: 'left', label: 'À esquerda' },
	{ value: 'center', label: 'Centro' },
	{ value: 'right', label: 'À direita' },
];

export const ALIGN_VALUES = ['left', 'center', 'right', 'justify'] as const;
