import { NodeViewWrapper } from '@tiptap/react';
import { PenTool } from 'lucide-react';

function NodeViewExcalidraw({ node }: any) {
	const { width, height, data } = node.attrs;

	const element_count = Array.isArray(data?.elements) ? data.elements.length : 0;

	return (
		<NodeViewWrapper className='excalidraw-block my-3'>
			<div className='flex items-center gap-3 rounded-md border-2 border-dashed border-black/20 bg-black/[0.02] px-4 py-5 dark:border-white/25 dark:bg-white/[0.03]'>
				<PenTool className='h-4 w-4 opacity-60' />

				<div className='flex flex-col'>
					<span className='font-mono text-[10px] tracking-[0.18em] uppercase opacity-60'>
						diagrama
					</span>

					<span className='text-xs opacity-70'>
						{element_count > 0 ? `${element_count} elemento(s)` : 'sem traços ainda'}
					</span>
				</div>

				<span className='ml-auto font-mono text-[10px] opacity-40'>
					{width} × {height}
				</span>
			</div>
		</NodeViewWrapper>
	);
}

export default NodeViewExcalidraw;
