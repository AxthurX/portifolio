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
			'flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-[13px] text-[hsl(var(--brass-ink))] tracking-wide transition-colors',
			'hover:bg-[hsl(var(--brass-light)/0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brass-ink)/0.5)]',
			active && 'bg-[hsl(var(--brass-ink)/0.14)] hover:bg-[hsl(var(--brass-ink)/0.2)]',
		)}
	>
		<Icon className='h-4 w-4' strokeWidth={1.9} />
		<span className='hidden sm:inline'>{label}</span>
		{typeof badge === 'number' && badge > 0 && (
			<span className='rounded-full bg-[hsl(var(--brass-ink)/0.16)] px-1.5 py-0.5 font-bold text-[10px] leading-none'>
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
		<div className='brass-bar pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5 ring-1 ring-[hsl(var(--brass-light)/0.4)]'>
			<ToolButton icon={PackageOpen} label='Caixa' onClick={onOpenBox} badge={boxCount} />
			<span aria-hidden='true' className='mx-1 h-5 w-px bg-[hsl(var(--brass-ink)/0.22)]' />
			<ToolButton icon={LayoutGrid} label='Organizar' onClick={onOrganize} />
			<ToolButton icon={Shuffle} label='Embaralhar' onClick={onShuffle} />
			<span aria-hidden='true' className='mx-1 h-5 w-px bg-[hsl(var(--brass-ink)/0.22)]' />
			<ToolButton
				icon={gallery ? Minimize2 : Maximize2}
				label={gallery ? 'Sair da exposição' : 'Exposição'}
				onClick={onToggleGallery}
				active={gallery}
			/>
		</div>
	</div>
);
