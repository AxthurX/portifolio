/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */

import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { useEffect, useRef } from 'react';
import { useEditableEditor } from '../../store/store';

export const AccordionComponent = ({ node, updateAttributes }: NodeViewProps) => {
	const { title, description } = node.attrs;

	const disabled = useEditableEditor();

	const titleRef = useRef<HTMLSpanElement>(null);
	const descRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!titleRef.current || !descRef.current) return;

		if (titleRef.current.textContent !== title) {
			titleRef.current.textContent = title;
		}

		if (descRef.current.textContent !== description) {
			descRef.current.textContent = description;
		}
	}, [title, description]);

	const commitTitle = () => {
		if (!titleRef.current) return;

		const value = titleRef.current.textContent ?? '';

		if (value !== title) {
			updateAttributes({ title: value });
		}
	};

	const commitDescription = () => {
		if (!descRef.current) return;

		const value = descRef.current.textContent ?? '';

		if (value !== description) {
			updateAttributes({ description: value });
		}
	};

	return (
		<NodeViewWrapper as='section' className='border-beige-500 rounded border'>
			<details open>
				<summary className='bg-primary/90 flex px-2 py-4 text-sm font-medium text-white'>
					<span
						ref={titleRef}
						contentEditable={disabled}
						suppressContentEditableWarning
						onBlur={commitTitle}
						className='outline-none'
					/>
				</summary>

				<div
					ref={descRef}
					contentEditable={disabled}
					suppressContentEditableWarning
					onBlur={commitDescription}
					className='border-beige-500 min-h-10 border p-2 text-sm outline-none'
				/>
			</details>
		</NodeViewWrapper>
	);
};
