'use client';

import { Anchor, Link, ListTree } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccessibility } from '../accessibility-context';

interface TitleElement {
	id: string;
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	text: string;
}

interface SectionElement {
	id: string;
	tag: string;
	name: string;
}

interface LinkElement {
	id: string;
	href: string;
	text: string;
}

export function PageStructure() {
	const [titles, setTitles] = useState<TitleElement[]>([]);
	const [sections, setSections] = useState<SectionElement[]>([]);
	const [links, setLinks] = useState<LinkElement[]>([]);
	const pathname = usePathname();

	const { settings } = useAccessibility();
	const position = settings.position || 'right';
	const voice_active = settings['voice-command'] === 'enable';

	// biome-ignore lint/correctness/useExhaustiveDependencies: Atualizar quando mudar de página
	useEffect(() => {
		const target_selectors = 'h1, h2, h3, h4, h5, h6';
		const dom_nodes = document.querySelectorAll(target_selectors);
		const extracted_titles: TitleElement[] = [];

		dom_nodes.forEach((node, index) => {
			const text = node.textContent?.trim();
			if (!text) return;
			if (!node.id) node.id = `struct-el-${index}`;

			extracted_titles.push({
				id: node.id,
				tag: node.tagName.toLowerCase() as TitleElement['tag'],
				text: text,
			});
		});
		setTitles(extracted_titles);

		const header_node = document.querySelector('header');
		const main_node = document.querySelector('main');
		const footer_node = document.querySelector('footer');

		const sectionTargets = [
			{ node: header_node, tag: 'header', name: 'Cabeçalho' },
			{ node: main_node, tag: 'main', name: 'Conteúdo Principal' },
			{ node: footer_node, tag: 'footer', name: 'Rodapé' },
		];

		const extracted_sections: SectionElement[] = [];

		sectionTargets.forEach((item, index) => {
			if (item.node) {
				if (!item.node.id) item.node.id = `struct-sec-${item.tag}-${index}`;

				extracted_sections.push({
					id: item.node.id,
					tag: item.tag,
					name: item.name,
				});
			}
		});
		setSections(extracted_sections);

		const dom_links = document.querySelectorAll('a[href]');
		const extracted_links: LinkElement[] = [];

		dom_links.forEach((node, index) => {
			const href = node.getAttribute('href');
			if (!href) return;

			let text = node.textContent?.trim();
			if (!text) {
				const img = node.querySelector('img');
				text = img?.alt ? `${img.alt}` : `[Link]: ${href}`;
			}

			extracted_links.push({
				id: `struct-link-${index}`,
				href: href,
				text: text,
			});
		});
		setLinks(extracted_links);
	}, [pathname]);

	const getIndentClass = (tag: string) => {
		switch (tag) {
			case 'h2':
				return 'ml-4';
			case 'h3':
				return 'ml-8';
			case 'h4':
				return 'ml-12';
			case 'h5':
				return 'ml-16';
			case 'h6':
				return 'ml-20';
			case 'p':
				return 'ml-6';
			default:
				return 'ml-0';
		}
	};

	const getTextStyle = (tag: string) => {
		switch (tag) {
			case 'h1':
				return 'font-bold text-base';
			case 'h2':
				return 'font-semibold text-sm';
			case 'h3':
				return 'font-medium text-sm';
			case 'p':
				return 'text-xs italic';
			default:
				return 'text-sm';
		}
	};

	const handleScrollTo = (id: string) => {
		const target = document.getElementById(id);
		target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleScrollTo(id);
		}
	};

	return (
		<div
			className={`fixed bottom-8 z-999999 flex w-full max-w-96 flex-col transition-all duration-300 ${position === 'right' ? 'left-8' : 'right-8'} ${voice_active ? 'bottom-110' : 'bottom-8'}`}
		>
			<div className='fade-in slide-in-from-bottom-4 animate-in border-accent bg-base-100 rounded-xl border shadow duration-300'>
				<div className='from-primary/85 to-primary text-primary-content flex w-full items-center justify-between rounded-xl bg-linear-to-br px-4 py-2'>
					<div className='flex items-center gap-2'>
						<ListTree className='size-4' />
						<span className='text-sm font-semibold'>Estrutura da Página</span>
					</div>
				</div>

				<div className='flex flex-col p-4'>
					<Tabs defaultValue='titulos'>
						<TabsList className='bg-base-200 grid h-full w-full grid-cols-3 gap-2'>
							<TabsTrigger
								value='titulos'
								className='text-base-content/70 hover:bg-primary/30 data-[state="active"]:from-primary/85 data-[state="active"]:to-primary data-[state="active"]:text-secondary-content flex cursor-pointer flex-col rounded-t-lg bg-transparent p-2 transition data-[state="active"]:bg-linear-to-br data-[state="active"]:font-semibold'
							>
								Títulos
							</TabsTrigger>
							<TabsTrigger
								value='secoes'
								className='text-base-content/70 hover:bg-primary/30 data-[state="active"]:from-primary/85 data-[state="active"]:to-primary data-[state="active"]:text-secondary-content flex cursor-pointer flex-col rounded-t-lg bg-transparent p-2 transition data-[state="active"]:bg-linear-to-br data-[state="active"]:font-semibold'
							>
								Seções
							</TabsTrigger>
							<TabsTrigger
								value='links'
								className='text-base-content/70 hover:bg-primary/30 data-[state="active"]:from-primary/85 data-[state="active"]:to-primary data-[state="active"]:text-secondary-content flex cursor-pointer flex-col rounded-t-lg bg-transparent p-2 transition data-[state="active"]:bg-linear-to-br data-[state="active"]:font-semibold'
							>
								Links
							</TabsTrigger>
						</TabsList>

						<TabsContent value='titulos' className='max-w-85'>
							<div
								className={`w-full overflow-x-clip overflow-y-auto py-2 pr-6 transition-all duration-300 ${voice_active ? 'max-h-30' : 'max-h-72'}`}
							>
								<ul className='flex flex-col gap-2'>
									{titles.map((el) => (
										<li key={el.id} className='flex w-full'>
											<button
												type='button'
												tabIndex={0}
												className={`group hover:bg-base-200 focus:ring-primary/50 flex min-w-0 grow cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-left focus:ring-2 focus:outline-none ${getIndentClass(el.tag)}`}
												onClick={() => handleScrollTo(el.id)}
												onKeyDown={(e) => handleKeyDown(e, el.id)}
											>
												<span className='bg-base-200 text-base-content/50 group-hover:bg-primary/20 group-hover:text-primary w-6 shrink-0 rounded px-1 py-0.5 text-center font-mono text-[10px] font-bold uppercase'>
													{el.tag}
												</span>
												<span className={`truncate ${getTextStyle(el.tag)}`}>{el.text}</span>
											</button>
										</li>
									))}
									{titles.length === 0 && (
										<p className='text-base-content/50 py-4 text-center text-sm'>
											Nenhum título encontrado.
										</p>
									)}
								</ul>
							</div>
						</TabsContent>

						<TabsContent value='secoes'>
							<div className='max-h-72 w-full max-w-85 overflow-x-clip overflow-y-auto py-2 pr-6'>
								<ul className='flex flex-col gap-2 pl-2'>
									{sections.map((sec) => (
										<li key={sec.id} className='flex w-full'>
											<button
												type='button'
												tabIndex={0}
												className='group hover:bg-base-200 focus:ring-primary/50 flex min-w-0 grow cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-left focus:ring-2 focus:outline-none'
												onClick={() => handleScrollTo(sec.id)}
												onKeyDown={(e) => handleKeyDown(e, sec.id)}
											>
												<span className='bg-base-200 text-primary/50 rounded-md p-1'>
													<Anchor className='size-4 shrink-0' />
												</span>
												<span className='truncate text-sm font-medium'>{sec.name}</span>
											</button>
										</li>
									))}
									{sections.length === 0 && (
										<p className='text-base-content/50 py-4 text-center text-sm'>
											Nenhuma seção encontrada.
										</p>
									)}
								</ul>
							</div>
						</TabsContent>

						<TabsContent value='links'>
							<div className='max-h-72 w-full max-w-85 overflow-x-clip overflow-y-auto py-2 pr-6'>
								<ul className='flex flex-col gap-2'>
									{links.map((link) => (
										<li key={link.id} className='flex w-full'>
											<a
												href={link.href}
												className='group hover:bg-base-200 focus:ring-primary/50 flex min-w-0 grow items-center gap-3 rounded-lg px-2 py-1.5 focus:ring-2 focus:outline-none'
												title={link.href}
											>
												<span className='bg-base-200 text-primary/50 shrink-0 rounded-md p-1'>
													<Link className='size-4' />
												</span>
												<span className='truncate text-sm'>{link.text}</span>
											</a>
										</li>
									))}
									{links.length === 0 && (
										<p className='text-base-content/50 py-4 text-center text-sm'>
											Nenhum link encontrado.
										</p>
									)}
								</ul>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
