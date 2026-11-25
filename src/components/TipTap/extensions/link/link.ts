import type { TooltipContentProps } from '@radix-ui/react-tooltip';
import { type Editor, mergeAttributes } from '@tiptap/core';
import TiptapLink, { type LinkOptions } from '@tiptap/extension-link';
import { Plugin } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import type { ReactNode } from 'react';
import { Link as LinkComponent } from '../../components/Link/link';
import type { ButtonViewReturnComponentProps } from '../../interfaces/types';

type LinkActionValue = {
	url: string;
	text?: string;
	openInNewTab?: boolean;
	className?: string;
};

export interface ActionButtonProps<T = unknown> {
	action?: (value: T) => void;

	icon?: string;
	title?: string;
	tooltip?: string;
	disabled?: boolean;
	shortcutKeys?: string[];
	className?: string;
	loading?: boolean;
	tooltipOptions?: TooltipContentProps;
	color?: string;
	isActive?: ButtonViewReturnComponentProps['isActive'];
	children?: ReactNode;
	asChild?: boolean;
	upload?: boolean;
	initialDisplayedColor?: string;
}

type ExtendedLinkOptions = LinkOptions & {
	button?: (props: { editor: Editor }) => {
		component: typeof LinkComponent;
		componentProps: ActionButtonProps<LinkActionValue>;
	};
};

export const Link = TiptapLink.extend<ExtendedLinkOptions>({
	addAttributes() {
		return {
			...this.parent?.(),
			id: {
				default: null,
				parseHTML: (el) => el.getAttribute('id'),
				renderHTML: (attrs) => (attrs.id ? { id: attrs.id } : {}),
			},
			class: {
				default: null,
				parseHTML: (el) => el.getAttribute('class'),
				renderHTML: (attrs) => (attrs.class ? { class: attrs.class } : {}),
			},
			style: {
				default: null,
				parseHTML: (el) => el.getAttribute('style'),
				renderHTML: (attrs) => (attrs.style ? { style: attrs.style } : {}),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'a',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				class: 'link text-blue-600 cursor-pointer hover:cursor-pointer',
			}),
			0,
		];
	},

	addOptions() {
		const parent = this.parent?.() as LinkOptions;

		return {
			...parent,
			inclusive: false,
			openOnClick: false,
			button: ({ editor }: { editor: Editor }) => {
				return {
					component: LinkComponent,
					componentProps: {
						editor,
						action: (value: {
							url: string;
							text?: string;
							openInNewTab?: boolean;
							className?: string;
						}) => {
							const { url, text, openInNewTab, className } = value;
							if (!text) return;

							const { state } = editor;
							const { from } = state.selection;
							const new_text = text || url;
							const insertedLength = new_text.length;
							const to = from + insertedLength;

							editor
								.chain()
								.extendMarkRange('link')
								.insertContent({
									type: 'text',
									text: new_text,
									marks: [
										{
											type: 'link',
											attrs: {
												href: url,
												class: className,
												target: openInNewTab ? '_blank' : '',
											},
										},
									],
								})
								.setLink({ href: url })
								.setTextSelection({ from, to })
								.run();
						},
						id: 'link',
						isActive: () => editor.isActive('link') || false,
						disabled: !editor.can().setLink({ href: '' }),
						icon: 'Link',
						tooltip: 'Inserir Link',
						toolbar: true,
					},
				};
			},
		};
	},

	addProseMirrorPlugins() {
		const { editor } = this;

		return [
			new Plugin({
				props: {
					handleClick: (_view, _pos, event) => {
						const target = event.target as HTMLElement;

						if (target.tagName === 'A' && editor.isEditable) {
							event.preventDefault();
							return true;
						}

						return false;
					},
					handleKeyDown: (_view: EditorView, event: KeyboardEvent) => {
						const { selection } = editor.state;

						// tecla ESC move cursor para fora do link
						if (event.key === 'Escape' && !selection.empty) {
							editor.commands.focus(selection.to, {
								scrollIntoView: false,
							});

							return true;
						}

						return false;
					},
				},
			}),
		];
	},
});
