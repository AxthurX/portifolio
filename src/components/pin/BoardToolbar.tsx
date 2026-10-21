import {
	LayoutGrid,
	type LucideIcon,
	Maximize2,
	Minimize2,
	PackageOpen,
	Shuffle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BoardToolbarProps {
	boxCount: number;
	gallery: boolean;
	/** mostra a barra só quando o quadro está em tela */
	visivel?: boolean;
	onOpenBox: () => void;
	onOrganize: () => void;
	onShuffle: () => void;
	onToggleGallery: () => void;
}

interface ToolButtonProps {
	icon: LucideIcon;
	label: string;
	onClick: () => void;
	active?: boolean;
	badge?: number;
}

const ToolButton = ({ icon: Icon, label, onClick, active = false, badge }: ToolButtonProps) => (
	<button
		type='button'
		onClick={onClick}
		aria-label={label}
		aria-pressed={active}
		title={label}
		className={cn(
			'flex items-center gap-2 rounded-base px-3 py-2 font-semibold text-[13px] text-muted-foreground transition-colors',
			'hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
			active && 'bg-primary/10 text-primary',
		)}
	>
		<Icon className='h-4 w-4' strokeWidth={1.9} />
		<span className='hidden sm:inline'>{label}</span>
		{typeof badge === 'number' && badge > 0 && (
			<span className='rounded-base bg-primary/10 px-1.5 py-0.5 font-bold text-[10px] text-primary leading-none'>
				{badge}
			</span>
		)}
	</button>
);

export const BoardToolbar = ({
	boxCount,
	gallery,
	visivel = true,
	onOpenBox,
	onOrganize,
	onShuffle,
	onToggleGallery,
}: BoardToolbarProps) => (
	<div
		className={cn(
			'pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-all duration-500 sm:bottom-6',
			visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
		)}
	>
		<div className='pointer-events-auto flex items-center gap-0.5 rounded-base border-2 border-black bg-base-100 p-1.5 shadow-light dark:border-white dark:shadow-dark'>
			<ToolButton icon={PackageOpen} label='Caixa' onClick={onOpenBox} badge={boxCount} />
			<span aria-hidden='true' className='mx-1 h-5 w-0.5 bg-black dark:bg-white' />
			<ToolButton icon={LayoutGrid} label='Organizar' onClick={onOrganize} />
			<ToolButton icon={Shuffle} label='Embaralhar' onClick={onShuffle} />
			<span aria-hidden='true' className='mx-1 h-5 w-0.5 bg-black dark:bg-white' />
			<ToolButton
				icon={gallery ? Minimize2 : Maximize2}
				label={gallery ? 'Sair da exposição' : 'Exposição'}
				onClick={onToggleGallery}
				active={gallery}
			/>
		</div>
	</div>
);
