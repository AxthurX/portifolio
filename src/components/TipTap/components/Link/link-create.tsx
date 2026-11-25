import type { Editor } from '@tiptap/core';
import {
	type FormEvent,
	type HTMLAttributes,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const LINKS = {
	none: {
		label: 'Sem estilo',
		className: '',
	},
	small: {
		label: 'Botão pequeno',
		className:
			'p-3 w-fit btn-blog bg-calpolygreen-800 text-white text-center flex justify-center items-center hover:bg-opacity-65 rounded-md transition-colors duration-300 ease-in-out',
	},
	middle: {
		label: 'Botão médio',
		className:
			'p-6 w-fit btn-blog bg-calpolygreen-800 text-white text-center flex justify-center items-center hover:bg-opacity-65 rounded-md transition-colors duration-300 ease-in-out',
	},
	'middle-large': {
		label: 'Botão médio largo',
		className: 'p-6 w-full btn-blog bg-calpolygreen-800 text-white rounded-md',
	},
	big: {
		label: 'Botão grande',
		className: 'p-12 text-2xl btn-blog bg-calpolygreen-800 text-white rounded-md',
	},
	'big-large': {
		label: 'Botão grande largo',
		className: 'p-12 w-full text-2xl btn-blog bg-calpolygreen-800 text-white rounded-md',
	},
	'accent-20': {
		label: 'Beige 20%',
		className:
			'group dark:border! flex h-full flex-row gap-4 border-accent border-t bg-accent/60 p-4 transition-all duration-200 ease-in-out last:border-b odd:bg-accent/20 hover:bg-accent/60 hover:shadow-sm max-md:flex-col max-md:gap-2 max-md:px-8 md:mx-5 dark:rounded-lg! dark:border-white! dark:bg-black! dark:hover:bg-neutral-950!',
	},
} as const;

type Style = keyof typeof LINKS;

export interface LinkCreateProps extends HTMLAttributes<HTMLDivElement> {
	editor: Editor;
	defaultUrl?: string;
	defaultText?: string;
	defaultIsNewTab?: boolean;
	onSave: (
		url: string,
		text?: string,
		isNewTab?: boolean,
		className?: string,
		isIcon?: boolean,
	) => void;
}

export const LinkCreate = ({
	editor,
	onSave,
	defaultIsNewTab = true,
	defaultUrl,
	defaultText,
	className,
}: LinkCreateProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	const [url, setUrl] = useState(defaultUrl);
	const [text, setText] = useState(defaultText);
	const [isNewTab, setIsNewTab] = useState<boolean>(defaultIsNewTab);
	const [style, setStyle] = useState<Style>('none');

	useEffect(() => {
		if (!editor.isActive('link')) return;

		const attrs = editor.getAttributes('link');
		const { from, to } = editor.state.selection;

		const link_text = editor.state.doc.textBetween(from, to, ' ');

		setUrl(attrs.href);
		setText(attrs.text || link_text);
		setIsNewTab(attrs.target === '_blank');
		setStyle(attrs.class);
	}, [editor]);

	const handleSave = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			if (!formRef.current) return;

			if (!url) return;

			if (!url.trim()) return;

			const new_text = text ? text.trim() : url.trim();

			onSave(url, new_text, isNewTab, LINKS[style].className);
		},
		[onSave, url, text, isNewTab, style],
	);

	return (
		<form ref={formRef} onSubmit={handleSave} className={cn('space-y-4 rounded p-4', className)}>
			<div>
				<Label className='font-medium'>URL</Label>

				<Input
					required
					type='text'
					value={url}
					placeholder='Inserir URL'
					onChange={(e) => setUrl(e.target.value)}
					onPaste={(e) => {
						if (!text) {
							const text = e.clipboardData.getData('text');
							setText(text);
						}
					}}
				/>
			</div>

			<div>
				<Label className='font-medium'>Texto de visualização (opcional)</Label>

				<Input
					type='text'
					value={text}
					placeholder='Texto a ser exibido'
					onChange={(e) => setText(e.target.value)}
				/>
			</div>

			<div>
				<Label className='font-medium'>Estilo do link</Label>

				<Select defaultValue='none' onValueChange={(value) => setStyle(value as Style)}>
					<SelectTrigger>
						<SelectValue placeholder='Selecione um estilo' />
					</SelectTrigger>

					<SelectContent>
						{Object.entries(LINKS).map(([key, link]) => (
							<SelectItem key={key} value={key}>
								{link.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className='flex items-center space-x-2'>
				<Label htmlFor='new-tab'>Abrir em uma nova janela</Label>

				<Switch id='new-tab' checked={isNewTab} onCheckedChange={setIsNewTab} />
			</div>

			<div className='flex justify-end space-x-2'>
				<Button type='submit'>Salvar</Button>
			</div>
		</form>
	);
};

export default LinkCreate;
