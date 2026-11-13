'use client';

import ImageExtension from '@tiptap/extension-image';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	Bold,
	Check,
	Code,
	Code2,
	Copy,
	Eraser,
	Heading1,
	Heading2,
	Heading3,
	ImagePlus,
	Italic,
	Link2,
	List,
	ListOrdered,
	Minus,
	Pilcrow,
	Quote,
	Redo2,
	SquareCode,
	Strikethrough,
	Undo2,
	Unlink,
	X,
} from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const INITIAL_CONTENT = `<h2>Notas de produto — release 3.2</h2>
<p>Este editor é real: <strong>TipTap 3</strong> com <em>ProseMirror</em> por baixo. Você pode escrever, formatar e inserir mídia — o HTML abaixo é gerado a partir do documento, não de um textarea.</p>
<h3>O que testar</h3>
<ul>
  <li>Selecione um trecho e aplique <strong>negrito</strong>, <em>itálico</em> ou <s>riscado</s>.</li>
  <li>Use o botão de link para transformar a seleção em âncora.</li>
  <li>Insira uma imagem por URL e veja o nó ser criado no documento.</li>
</ul>
<blockquote><p>“Acessibilidade e edição rica compartilham a mesma regra: o conteúdo precisa continuar navegável por teclado.”</p></blockquote>
<h3>Atalhos</h3>
<p>Digite <code>## </code> para virar título, <code>- </code> para lista e <code>&gt; </code> para citação. <kbd>Ctrl</kbd> + <kbd>B</kbd> aplica negrito.</p>
<pre><code>npm i @tiptap/react @tiptap/starter-kit</code></pre>`;

const EXTENSIONS = [
	StarterKit.configure({
		heading: { levels: [1, 2, 3] },
		link: {
			openOnClick: false,
			autolink: true,
			HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
		},
	}),
	ImageExtension.configure({ allowBase64: false, inline: false }),
	Placeholder.configure({
		placeholder: 'Comece a escrever… use ## para título, - para lista e > para citação.',
	}),
	CharacterCount,
];

function ToolbarButton({
	label,
	active,
	disabled,
	onClick,
	children,
}: {
	label: string;
	active?: boolean;
	disabled?: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type='button'
			title={label}
			aria-label={label}
			aria-pressed={active ?? undefined}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				'rounded-base text-foreground hover:bg-base-200 focus-visible:ring-primary flex h-8 w-8 items-center justify-center border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-white/10',
				active &&
					'bg-primary text-primary-content shadow-light dark:shadow-dark border-black dark:border-white',
			)}
		>
			{children}
		</button>
	);
}

function Separator() {
	return <span className='mx-1 h-6 w-px shrink-0 bg-black/15 dark:bg-white/20' />;
}

export function TiptapLab() {
	const [showHtml, setShowHtml] = useState(false);
	const [copied, setCopied] = useState(false);
	const [linkOpen, setLinkOpen] = useState(false);
	const [linkValue, setLinkValue] = useState('');
	const [imageOpen, setImageOpen] = useState(false);
	const [imageValue, setImageValue] = useState('');
	const copyTimer = useRef<number | null>(null);

	const editor = useEditor({
		extensions: EXTENSIONS,
		content: INITIAL_CONTENT,
		immediatelyRender: false,
		shouldRerenderOnTransaction: true,
		editorProps: {
			attributes: {
				class: 'tiptap',
				'aria-label': 'Editor de conteúdo',
			},
		},
	});

	useEffect(() => {
		return () => {
			if (copyTimer.current) window.clearTimeout(copyTimer.current);
		};
	}, []);

	const html = editor?.getHTML() ?? '';
	const words = editor?.storage.characterCount.words() ?? 0;
	const characters = editor?.storage.characterCount.characters() ?? 0;

	const handleCopy = async () => {
		if (!editor) return;

		try {
			await navigator.clipboard.writeText(editor.getHTML());
			setCopied(true);

			if (copyTimer.current) window.clearTimeout(copyTimer.current);

			copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	};

	const openLink = () => {
		if (!editor) return;

		const href = (editor.getAttributes('link').href as string | undefined) ?? '';

		setLinkValue(href);
		setLinkOpen((open) => !open);
		setImageOpen(false);
	};

	const applyLink = () => {
		if (!editor) return;

		const raw = linkValue.trim();

		if (!raw) {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
		} else {
			const href = /^(https?:\/\/|mailto:|\/)/i.test(raw) ? raw : `https://${raw}`;

			editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
		}

		setLinkOpen(false);
	};

	const applyImage = () => {
		if (!editor) return;

		const src = imageValue.trim();

		if (src) editor.chain().focus().setImage({ src }).run();

		setImageOpen(false);
		setImageValue('');
	};

	return (
		<div className='rounded-base bg-base-100 shadow-light dark:shadow-dark overflow-hidden border-2 border-black dark:border-white'>
			<div
				role='toolbar'
				aria-label='Formatação de texto'
				className='bg-base-100 flex flex-wrap items-center gap-0.5 border-b-2 border-black p-2 dark:border-white'
			>
				<ToolbarButton
					label='Desfazer'
					disabled={!editor?.can().undo()}
					onClick={() => editor?.chain().focus().undo().run()}
				>
					<Undo2 className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Refazer'
					disabled={!editor?.can().redo()}
					onClick={() => editor?.chain().focus().redo().run()}
				>
					<Redo2 className='h-4 w-4' />
				</ToolbarButton>

				<Separator />

				<ToolbarButton
					label='Parágrafo'
					active={editor?.isActive('paragraph')}
					onClick={() => editor?.chain().focus().setParagraph().run()}
				>
					<Pilcrow className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Título 1'
					active={editor?.isActive('heading', { level: 1 })}
					onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
				>
					<Heading1 className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Título 2'
					active={editor?.isActive('heading', { level: 2 })}
					onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				>
					<Heading2 className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Título 3'
					active={editor?.isActive('heading', { level: 3 })}
					onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
				>
					<Heading3 className='h-4 w-4' />
				</ToolbarButton>

				<Separator />

				<ToolbarButton
					label='Negrito'
					active={editor?.isActive('bold')}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					<Bold className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Itálico'
					active={editor?.isActive('italic')}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
					<Italic className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Riscado'
					active={editor?.isActive('strike')}
					onClick={() => editor?.chain().focus().toggleStrike().run()}
				>
					<Strikethrough className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Código inline'
					active={editor?.isActive('code')}
					onClick={() => editor?.chain().focus().toggleCode().run()}
				>
					<Code className='h-4 w-4' />
				</ToolbarButton>

				<Separator />

				<ToolbarButton
					label='Lista com marcadores'
					active={editor?.isActive('bulletList')}
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
				>
					<List className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Lista numerada'
					active={editor?.isActive('orderedList')}
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
				>
					<ListOrdered className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Citação'
					active={editor?.isActive('blockquote')}
					onClick={() => editor?.chain().focus().toggleBlockquote().run()}
				>
					<Quote className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Bloco de código'
					active={editor?.isActive('codeBlock')}
					onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
				>
					<SquareCode className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Linha horizontal'
					onClick={() => editor?.chain().focus().setHorizontalRule().run()}
				>
					<Minus className='h-4 w-4' />
				</ToolbarButton>

				<Separator />

				<ToolbarButton
					label='Inserir link'
					active={editor?.isActive('link') || linkOpen}
					onClick={openLink}
				>
					<Link2 className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Remover link'
					disabled={!editor?.isActive('link')}
					onClick={() => editor?.chain().focus().extendMarkRange('link').unsetLink().run()}
				>
					<Unlink className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Inserir imagem por URL'
					active={imageOpen}
					onClick={() => {
						setImageOpen((open) => !open);
						setLinkOpen(false);
					}}
				>
					<ImagePlus className='h-4 w-4' />
				</ToolbarButton>

				<ToolbarButton
					label='Limpar formatação'
					onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
				>
					<Eraser className='h-4 w-4' />
				</ToolbarButton>
			</div>

			{(linkOpen || imageOpen) && (
				<div className='bg-base-200/60 flex flex-wrap items-center gap-2 border-b-2 border-black px-3 py-2 dark:border-white'>
					{linkOpen ? (
						<>
							<Link2 className='text-muted-foreground h-3.5 w-3.5 shrink-0' />

							<label htmlFor='tiptap-link' className='sr-only'>
								URL do link
							</label>

							<input
								id='tiptap-link'
								type='url'
								value={linkValue}
								onChange={(event) => setLinkValue(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										event.preventDefault();
										applyLink();
									}
								}}
								placeholder='https://exemplo.com'
								className='bg-base-100 focus-visible:ring-primary h-8 min-w-0 flex-1 rounded border border-black/20 px-2 font-mono text-xs outline-none focus-visible:ring-2 dark:border-white/25'
							/>

							<Button type='button' size='sm' className='h-8 px-3 text-[11px]' onClick={applyLink}>
								{linkValue.trim() ? 'Aplicar' : 'Remover'}
							</Button>

							<button
								type='button'
								aria-label='Fechar campo de link'
								onClick={() => setLinkOpen(false)}
								className='rounded-base text-muted-foreground hover:text-foreground focus-visible:ring-primary flex h-8 w-8 items-center justify-center focus-visible:ring-2 focus-visible:outline-none'
							>
								<X className='h-3.5 w-3.5' />
							</button>
						</>
					) : (
						<>
							<ImagePlus className='text-muted-foreground h-3.5 w-3.5 shrink-0' />

							<label htmlFor='tiptap-image' className='sr-only'>
								URL da imagem
							</label>

							<input
								id='tiptap-image'
								type='url'
								value={imageValue}
								onChange={(event) => setImageValue(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										event.preventDefault();
										applyImage();
									}
								}}
								placeholder='https://exemplo.com/imagem.png'
								className='bg-base-100 focus-visible:ring-primary h-8 min-w-0 flex-1 rounded border border-black/20 px-2 font-mono text-xs outline-none focus-visible:ring-2 dark:border-white/25'
							/>

							<Button
								type='button'
								size='sm'
								className='h-8 px-3 text-[11px]'
								disabled={!imageValue.trim()}
								onClick={applyImage}
							>
								Inserir
							</Button>

							<button
								type='button'
								aria-label='Fechar campo de imagem'
								onClick={() => setImageOpen(false)}
								className='rounded-base text-muted-foreground hover:text-foreground focus-visible:ring-primary flex h-8 w-8 items-center justify-center focus-visible:ring-2 focus-visible:outline-none'
							>
								<X className='h-3.5 w-3.5' />
							</button>
						</>
					)}
				</div>
			)}

			<div className='playground-editor bg-base-100'>
				<EditorContent editor={editor} />
			</div>

			{showHtml && (
				<pre className='max-h-56 overflow-auto border-t-2 border-black bg-[#0b1220] p-4 font-mono text-[11px] leading-relaxed text-slate-200 dark:border-white'>
					<code>{html}</code>
				</pre>
			)}

			<div className='bg-base-200/50 flex flex-wrap items-center justify-between gap-3 border-t-2 border-black px-4 py-2.5 dark:border-white'>
				<div className='text-muted-foreground flex flex-wrap items-center gap-3 text-[11px]'>
					<span>
						<strong className='text-foreground'>{words}</strong> palavras
					</span>

					<span>
						<strong className='text-foreground'>{characters}</strong> caracteres
					</span>

					<span className='hidden items-center gap-1 sm:flex'>
						<span className='bg-success h-1.5 w-1.5 rounded-full' />
						TipTap 3 · ProseMirror
					</span>
				</div>

				<div className='flex flex-wrap items-center gap-1.5'>
					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() => setShowHtml((open) => !open)}
						aria-pressed={showHtml}
						className='h-8 gap-1.5 px-2.5 text-[11px]'
					>
						<Code2 className='h-3.5 w-3.5' />
						{showHtml ? 'Ocultar HTML' : 'Ver HTML'}
					</Button>

					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={handleCopy}
						className='h-8 gap-1.5 px-2.5 text-[11px]'
					>
						{copied ? <Check className='h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5' />}
						{copied ? 'Copiado' : 'Copiar'}
					</Button>
				</div>
			</div>
		</div>
	);
}
