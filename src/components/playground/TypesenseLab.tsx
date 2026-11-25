'use client';

import type { BaseHit, Hit } from 'instantsearch.js';
import { ArrowUpRight, CornerDownLeft, Database, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Configure,
	InstantSearch,
	useHits,
	useInstantSearch,
	useSearchBox,
} from 'react-instantsearch';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { cn } from '@/lib/utils';

interface ResultDocument extends BaseHit {
	title: string;
	subtitle?: string;
	description: string;
	category: string;
	tags: string[];
	url: string;
}

function createSearchClient() {
	const adapter = new TypesenseInstantSearchAdapter({
		server: {
			apiKey: 'placeholder',
			nodes: [
				{
					host: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
					port:
						typeof window !== 'undefined' && window.location.port
							? Number.parseInt(window.location.port)
							: typeof window !== 'undefined' && window.location.protocol === 'https:'
								? 443
								: 80,
					protocol:
						typeof window !== 'undefined' ? window.location.protocol.replace(':', '') : 'http',
					path: '/api/search',
				},
			],
		},
		additionalSearchParameters: {
			query_by: 'title,subtitle,description,category,tags',
			exclude_fields: 'id',
		},
	});

	return adapter.searchClient;
}

function ResultCard({ hit }: { hit: Hit<ResultDocument> }) {
	return (
		<Link
			href={hit.url}
			className='group rounded-base bg-base-100 hover:shadow-light dark:hover:shadow-dark flex flex-col gap-1.5 border-2 border-black/10 p-3 transition-all hover:-translate-y-0.5 hover:border-black dark:border-white/15 dark:hover:border-white'
		>
			<div className='flex items-start justify-between gap-2'>
				<span className='text-sm font-semibold'>{hit.title}</span>
				<ArrowUpRight className='text-muted-foreground group-hover:text-foreground h-3.5 w-3.5 shrink-0 transition-colors' />
			</div>

			{hit.subtitle && <span className='text-muted-foreground text-[11px]'>{hit.subtitle}</span>}

			<span className='text-muted-foreground line-clamp-2 text-[12px] leading-snug'>
				{hit.description}
			</span>

			<div className='mt-1 flex flex-wrap items-center gap-1'>
				<span className='rounded-full border border-black/15 px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase dark:border-white/20'>
					{hit.category}
				</span>
				{hit.tags?.slice(0, 3).map((tag) => (
					<span key={tag} className='text-muted-foreground text-[10px]'>
						#{tag}
					</span>
				))}
			</div>
		</Link>
	);
}

function SearchPanel() {
	const { query, refine } = useSearchBox();
	const { items } = useHits<ResultDocument>();
	const { status } = useInstantSearch();
	const inputRef = useRef<HTMLInputElement>(null);
	const [category, setCategory] = useState<string | null>(null);

	const categories = useMemo(() => {
		const counts = new Map<string, number>();

		for (const item of items) {
			counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
		}

		return [...counts.entries()].sort((a, b) => b[1] - a[1]);
	}, [items]);

	const filtered = category ? items.filter((item) => item.category === category) : items;
	const busy = status === 'loading' || status === 'stalled';

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement | null;
			const typing = target && /^(input|textarea|select)$/i.test(target.tagName);

			if (event.key === '/' && !typing) {
				event.preventDefault();
				inputRef.current?.focus();
			}

			if (event.key === 'Escape' && document.activeElement === inputRef.current) {
				refine('');
				inputRef.current?.blur();
			}
		};

		window.addEventListener('keydown', onKeyDown);

		return () => window.removeEventListener('keydown', onKeyDown);
	}, [refine]);

	return (
		<div className='flex flex-col gap-3'>
			<div className='relative'>
				<Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />

				<input
					ref={inputRef}
					value={query}
					onChange={(event) => refine(event.target.value)}
					placeholder='Buscar no índice — tente “acessibilidade” ou “search”'
					aria-label='Campo de busca Typesense'
					className='rounded-base bg-base-100 focus-visible:ring-primary h-11 w-full border-2 border-black pr-24 pl-9 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none dark:border-white'
				/>

				<div className='absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1'>
					{query ? (
						<button
							type='button'
							onClick={() => refine('')}
							aria-label='Limpar busca'
							className='text-muted-foreground hover:text-foreground rounded-base flex h-7 w-7 items-center justify-center border border-black/15 transition-colors hover:border-black dark:border-white/20 dark:hover:border-white'
						>
							<X className='h-3.5 w-3.5' />
						</button>
					) : (
						<kbd className='text-muted-foreground rounded border border-black/15 px-1.5 py-0.5 font-mono text-[10px] dark:border-white/20'>
							/
						</kbd>
					)}
				</div>
			</div>

			<div className='flex flex-wrap items-center gap-1.5'>
				<button
					type='button'
					onClick={() => setCategory(null)}
					className={cn(
						'rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase transition-colors',
						category === null
							? 'bg-primary text-primary-content border-black dark:border-white'
							: 'text-muted-foreground hover:text-foreground border-black/15 hover:border-black dark:border-white/20 dark:hover:border-white',
					)}
				>
					tudo ({items.length})
				</button>

				{categories.map(([name, count]) => (
					<button
						key={name}
						type='button'
						onClick={() => setCategory(name === category ? null : name)}
						className={cn(
							'rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase transition-colors',
							category === name
								? 'bg-primary text-primary-content border-black dark:border-white'
								: 'text-muted-foreground hover:text-foreground border-black/15 hover:border-black dark:border-white/20 dark:hover:border-white',
						)}
					>
						{name} ({count})
					</button>
				))}
			</div>

			<div className='flex items-center justify-between gap-2 border-y border-black/10 py-1.5 dark:border-white/15'>
				<span className='text-muted-foreground flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] uppercase'>
					<Database className='h-3 w-3' />
					portal-sedam
				</span>

				<span className='text-muted-foreground font-mono text-[10px] tracking-wider uppercase'>
					{busy
						? 'consultando…'
						: `${filtered.length} resultado${filtered.length === 1 ? '' : 's'}`}
				</span>
			</div>

			{filtered.length === 0 ? (
				<div className='rounded-base border border-dashed border-black/20 px-4 py-10 text-center dark:border-white/20'>
					<p className='text-sm font-medium'>
						{query ? `Nada encontrado para “${query}”.` : 'Digite para buscar no índice.'}
					</p>
					<p className='text-muted-foreground mt-1 text-[11px]'>
						Busca tolerante a erro de digitação — tente uma palavra mais curta.
					</p>
				</div>
			) : (
				<ul className='grid gap-2 sm:grid-cols-2'>
					{filtered.map((hit) => (
						<li key={hit.objectID}>
							<ResultCard hit={hit} />
						</li>
					))}
				</ul>
			)}

			<p className='text-muted-foreground flex items-center gap-1.5 text-[11px] leading-snug'>
				<CornerDownLeft className='h-3 w-3 shrink-0' />
				Pressione <kbd className='font-mono'>/</kbd> para focar,{' '}
				<kbd className='font-mono'>Esc</kbd> para limpar. O cliente fala com{' '}
				<code className='font-mono'>/api/search</code>; com{' '}
				<code className='font-mono'>TYPESENSE_*</code> definido, a rota repassa ao cluster real —
				sem ele, responde com o corpus local.
			</p>
		</div>
	);
}

export function TypesenseLab() {
	const searchClient = useMemo(() => createSearchClient(), []);

	return (
		<InstantSearch
			searchClient={searchClient}
			indexName='portal-sedam'
			stalledSearchDelay={300}
			future={{ preserveSharedStateOnUnmount: true }}
		>
			<Configure hitsPerPage={50} distinct />
			<SearchPanel />
		</InstantSearch>
	);
}
