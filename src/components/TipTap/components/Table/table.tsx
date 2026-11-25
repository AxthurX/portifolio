/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import type { Editor } from '@tiptap/core';
import { useState } from 'react';

export default function Tables({ editor }: { editor: Editor }) {
	const [rows, setRows] = useState(1);
	const [cols, setCols] = useState(1);

	const insertTable = (rows: number, cols: number) => {
		if (editor) {
			editor
				.chain()
				.focus()
				.insertTable({ rows, cols, withHeaderRow: false })
				.run();
		}
	};

	return (
		<>
			<div className='grid w-fit grid-cols-8 justify-items-center gap-1'>
				{Array.from({ length: 64 }).map((_, index) => {
					const row = Math.floor(index / 8) + 1;
					const col = (index % 8) + 1;

					return (
						<button
							type='button'
							key={index}
							className={`size-4 cursor-pointer rounded ${
								col <= cols && row <= rows ? 'bg-primary' : 'bg-secondary'
							}`}
							onMouseEnter={() => {
								setRows(row);
								setCols(col);
							}}
							onClick={() => insertTable(row, col)}
						/>
					);
				})}
			</div>
			<div className='py-1 text-center font-medium text-xs'>
				{cols} x {rows}
			</div>
		</>
	);
}
