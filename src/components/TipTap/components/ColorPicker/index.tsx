import { CaretDownIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import { CheckIcon, Slash } from 'lucide-react';
import type { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { color_palette } from '../../interfaces/types';
import ToolbarButton from '../toolbar-button';

type ColorPickerProps = {
	editor: Editor;
	icon: ReactNode;
	tooltip: string;
	toolbar: boolean;
	className?: string;
	attribute: string;
	handleApply: (editor: Editor, value: string) => void;
	handleUnset: (editor: Editor) => void;
};

const UnsetButton = ({
	editor,
	handleUnset,
}: {
	editor: Editor;
	handleUnset: (editor: Editor) => void;
}) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>
				<ToggleGroupItem
					value='unset'
					aria-label='Remover cor'
					className='size-7 max-w-7 rounded-none p-0'
					onClick={() => handleUnset(editor)}
				>
					<Slash className='size-5 text-red-600' />
				</ToggleGroupItem>
			</TooltipTrigger>
			<TooltipContent side='bottom'>
				<p>Remover cor</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

const ColorPickerInput = ({
	editor,
	attribute,
	onColorChange,
}: {
	editor: Editor;
	attribute: string;
	onColorChange: (value: string) => void;
}) => {
	const current_color = editor.getAttributes(attribute)?.color || '#000000';

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<ToggleGroupItem
						asChild
						value='custom'
						className='size-7 rounded-none border-0 p-0'
						aria-label='Cor personalizada'
					>
						<Input
							type='color'
							value={current_color}
							aria-label='Cor personalizada'
							onChange={(event) => onColorChange(event.currentTarget.value)}
							className='max-w-7'
						/>
					</ToggleGroupItem>
				</TooltipTrigger>
				<TooltipContent side='bottom'>
					<p>Cor personalizada</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export const ColorPicker = ({
	icon,
	editor,
	toolbar,
	tooltip,
	attribute,
	className,
	handleApply,
	handleUnset,
}: ColorPickerProps) => {
	const current_color = editor.getAttributes(attribute)?.color || '';

	const handleColorChange = (value: string) => {
		handleApply(editor, value);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<ToolbarButton
					label={tooltip}
					className={cn(
						'flex min-w-max',
						!toolbar &&
						'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
						className,
					)}
				>
					{icon}
					{toolbar ? <CaretDownIcon className='size-5' /> : tooltip}
				</ToolbarButton>
			</PopoverTrigger>
			<PopoverContent align='start' className='w-full p-0'>
				<div className='space-y-0'>
					{color_palette.map((palette) => (
						<ToggleGroup
							key={palette.label}
							type='single'
							className='gap-0'
							value={current_color}
							onValueChange={(value) => {
								if (value) handleColorChange(value);
							}}
						>
							{palette.colors.map((color) => (
								<TooltipProvider key={color.label}>
									<Tooltip>
										<TooltipTrigger asChild>
											<ToggleGroupItem
												value={color.value}
												data-color={color.value}
												aria-label={color.label}
												style={{ backgroundColor: color.value }}
												className='relative size-7 rounded-none p-0'
												onClick={() => handleColorChange(color.value)}
											>
												{current_color === color.value && (
													<CheckIcon className='absolute inset-0 m-auto size-6 text-white' />
												)}
											</ToggleGroupItem>
										</TooltipTrigger>
										<TooltipContent side='bottom'>
											<b>{color.label}</b>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))}
						</ToggleGroup>
					))}
					<ToggleGroup
						type='single'
						value={editor.getAttributes(attribute).color || 'unset'}
						onValueChange={(value) => {
							if (value === 'unset') {
								handleUnset(editor);
							} else if (value) {
								handleColorChange(value);
							}
						}}
						className='flex w-full flex-1 justify-between'
					>
						<UnsetButton editor={editor} handleUnset={handleUnset} />
						<ColorPickerInput
							editor={editor}
							attribute={attribute}
							onColorChange={handleColorChange}
						/>
					</ToggleGroup>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ColorPicker;
