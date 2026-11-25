import type { Editor } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';
import { BubbleMenu } from '@tiptap/react/menus';
import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { type BubbleMenuItem, getBubbleText } from '../bubble';

export interface BubbleMenuTextProps {
	editor: Editor;
	disabled?: boolean;
}

function ItemA({ item, disabled, editor }: { item: any; disabled?: boolean; editor: Editor }) {
	const Comp = item.component;

	if (!Comp) return null;

	return <Comp {...item.componentProps} disabled={disabled} editor={editor} />;
}

export function BubbleMenuText({ editor, disabled }: BubbleMenuTextProps) {
	const shouldShow = ({ editor }: { editor: Editor }) => {
		const { selection } = editor.view.state;
		const { $from, to } = selection;

		if ($from.pos === to) return false;

		return selection instanceof TextSelection;
	};

	const items: BubbleMenuItem[] = useMemo(() => {
		if (disabled || !editor) return [];
		return getBubbleText(editor);
	}, [disabled, editor]);

	return (
		<BubbleMenu editor={editor} shouldShow={shouldShow}>
			{items.length && (
				<div className='border-beige-800/60 pointer-events-auto w-auto gap-0.5 rounded-lg border bg-white px-1 py-2 shadow-sm transition-all select-none'>
					<div className='relative flex h-6.5 flex-nowrap items-center justify-start gap-1 whitespace-nowrap'>
						{items.map((item: BubbleMenuItem, key: number) => {
							if (item.type === 'divider') {
								return (
									<Separator
										orientation='vertical'
										key={`${item.type}`}
										className='mx-1! my-2! h-4!'
									/>
								);
							}

							return (
								<ItemA
									item={item}
									editor={editor}
									disabled={disabled}
									key={`${item.type}-${key}`}
								/>
							);
						})}
					</div>
				</div>
			)}
		</BubbleMenu>
	);
}
