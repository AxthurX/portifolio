import {
	Table as BaseTable,
	TableCell as BaseTableCell,
	TableRow as BaseTableRow,
	type TableCellOptions,
	TableHeader,
	type TableHeaderOptions,
	type TableRowOptions,
} from '@tiptap/extension-table';
import type { GeneralOptions } from '../../interfaces/types';

export interface TableOptions extends GeneralOptions<TableOptions> {
	HTMLAttributes: Record<string, any>;
	resizable: boolean;
	handleWidth?: number;
	cellMinWidth?: number;
	lastColumnResizable: boolean;
	allowTableNodeSelection: boolean;
	tableRow: Partial<TableRowOptions>;
	tableHeader: Partial<TableHeaderOptions>;
	tableCell: Partial<TableCellOptions>;
}

export const TableRow = BaseTableRow.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			style: {
				default: null,
				parseHTML: (el) => el.getAttribute('style'),
				renderHTML: (attrs) => {
					const style = 'border-right: 1px solid #000; padding: 8px 12px';
					return {
						style: [attrs.style, style].filter(Boolean).join('; '),
					};
				},
			},
		};
	},
});

export const TableCell = BaseTableCell.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			style: {
				default: null,
				parseHTML: (el) => el.getAttribute('style'),
				renderHTML: (attrs) => {
					const style = 'border-right: 1px solid #000; padding: 8px 12px;';
					return {
						style: [attrs.style, style].filter(Boolean).join('; '),
					};
				},
			},
			backgroundColor: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-background-color'),
				renderHTML: (attributes) => {
					if (!attributes.backgroundColor) return {};
					return {
						'data-background-color': attributes.backgroundColor,
						style: `background-color: ${attributes.backgroundColor};`,
					};
				},
			},
		};
	},
});

export const TableNode = BaseTable.extend<TableOptions>({
	addAttributes() {
		return {
			...this.parent?.(),
			borderColor: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-border-color'),
				renderHTML: (attributes) => {
					if (!attributes.borderColor) return {};
					return {
						'data-border-color': attributes.borderColor,
						style: `border-color: ${attributes.borderColor};`,
					};
				},
			},
			borderStyle: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-border-style'),
				renderHTML: (attributes) => {
					if (!attributes.borderStyle) return {};
					return {
						'data-border-style': attributes.borderStyle,
						style: `border-style: ${attributes.borderStyle};`,
					};
				},
			},
			borderWidth: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-border-width'),
				renderHTML: (attributes) => {
					if (!attributes.borderWidth) return {};
					return {
						'data-border-width': attributes.borderWidth,
						style: `border-width: ${attributes.borderWidth};`,
					};
				},
			},
			backgroundColor: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-background-color'),
				renderHTML: (attributes) => {
					if (!attributes.backgroundColor) return {};
					return {
						'data-background-color': attributes.backgroundColor,
						style: `background-color: ${attributes.backgroundColor};`,
					};
				},
			},
		};
	},

	addOptions() {
		return {
			...this.parent?.(),
			HTMLAttributes: {
				style: `
          border: 1px solid #000;
          border-collapse: collapse;
          width: 100%;
        `,
			},
			resizable: false,
			lastColumnResizable: true,
			allowTableNodeSelection: false,
			tableRow: {},
			tableHeader: {},
			tableCell: {},
		};
	},

	addExtensions() {
		return [
			...(this.parent?.() || []),
			TableRow.configure(this.options.tableRow),
			TableHeader.configure(this.options.tableHeader),
			TableCell.configure(this.options.tableCell),
		];
	},
});

export default TableNode;
