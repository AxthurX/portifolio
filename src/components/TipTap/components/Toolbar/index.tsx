import type { Editor } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import SectionAlign from '../Section/align';
import SectionBlock from '../Section/block';
import SectionColor from '../Section/color';
import SectionFile from '../Section/file';
import SectionHeading from '../Section/heading';
import SectionHighlight from '../Section/highlight';
import SectionHistory from '../Section/history';
import SectionIndent from '../Section/indent';
import SectionList from '../Section/list';
import SectionMidia from '../Section/midia';
import SectionStyle from '../Section/style';

const Toolbar = ({ editor, className }: { editor: Editor; className?: string }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className={cn(className, 'bg-primary-content flex flex-wrap items-center p-2')}>
			<SectionHistory editor={editor} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionHeading editor={editor} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionMidia editor={editor} />

			<SectionFile editor={editor} toolbar={true} />

			{/* <SectionColumn editor={editor} toolbar={true} /> */}

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionBlock editor={editor} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionStyle editor={editor} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionColor editor={editor} toolbar={true} />

			<SectionHighlight editor={editor} toolbar={true} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionAlign editor={editor} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionIndent editor={editor} />

			<Separator orientation='vertical' className='mx-2 h-7' />

			<SectionList editor={editor} />
		</div>
	);
};
export default Toolbar;
