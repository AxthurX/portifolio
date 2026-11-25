'use client';

import type { Hit as THit } from 'instantsearch.js';
import type { SendEventForHits } from 'instantsearch.js/es/lib/utils';
import { groupBy } from 'lodash';
import { CircleDashed, FolderIcon, SearchIcon, SproutIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
	Configure,
	InstantSearch,
	SearchBox,
	useHits,
	useInstantSearch,
} from 'react-instantsearch';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
	server: {
		apiKey: 'placeholder', // Chave de busca para todas as collections
		// apiKey: 'unjourjeseraideretourpresdetoi',
		nodes: [
			// {
			// 	host: 'localhost',
			// 	port: 8108,
			// 	protocol: 'http',
			// },
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
		// sendApiKeyAsQueryParam: false,
	},
	additionalSearchParameters: {
		query_by: 'title,description,category,tags',
		exclude_fields: 'id',
	},
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

export function SearchModal({ className }: { className?: string }) {
	const [open, setOpen] = useState<boolean>(false);
	const search_params = useSearchParams();
	const query_param = search_params.get('q');

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
			setOpen(true);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className='max-w-9/10 p-4'>
					<p className='text-base-content/75 mx-auto mb-2 block text-center'>O que você procura?</p>
					<div className='relative'>
						<button
							id='pesquisa'
							className={cn(
								'input input-accent h-14 w-60 max-w-full border-2 text-base',
								className,
							)}
							type='button'
						/>
						<div className='btn btn-accent absolute top-1 right-1'>
							<SearchIcon className='text-accent-content' />
						</div>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent
				aria-describedby={undefined}
				className='border-accent bg-base-100 sedam:bg-white/75 h-148 max-h-[calc(100dvh-80px)] max-w-3xl border p-2 max-sm:max-w-11/12 max-sm:rounded-lg'
			>
				<DialogTitle className='sr-only'>Janela de busca e resultados</DialogTitle>
				<InstantSearch searchClient={searchClient} indexName='portal-sedam'>
					<Configure hitsPerPage={250} query={query_param ?? ''} distinct />
					<SearchBox
						classNames={{
							root: 'relative',
							input: 'input input-accent border-2 input-lg w-full',
							submit: 'btn btn-accent absolute top-1 right-1',
							reset: 'btn btn-warning absolute top-1 right-16.5',
							loadingIndicator: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
						}}
						submitIconComponent={() => <SearchIcon className='text-accent-content' />}
						resetIconComponent={() => <Trash2Icon className='text-warning-content' />}
						loadingIconComponent={() => (
							<CircleDashed className='text-accent-content inline-block animate-spin opacity-25 duration-2000' />
						)}
						translations={{
							submitButtonTitle: 'Pesquisar',
							resetButtonTitle: 'Limpar',
						}}
						placeholder='Insira os termos de busca'
					/>
					<ScrollArea className='border-accent bg-base-100 -mt-2 h-130 overflow-x-hidden rounded-md border-2 p-2 px-3 text-ellipsis'>
						<NoResultsBoundary fallback={<NoResults />}>
							<EmptyQueryBoundary
								fallback={
									<div className='flex h-full w-full items-center justify-center text-9xl opacity-5'>
										<SproutIcon className='size-80' />
									</div>
								}
							>
								<CustomHits />
							</EmptyQueryBoundary>
						</NoResultsBoundary>
					</ScrollArea>
				</InstantSearch>
			</DialogContent>
		</Dialog>
	);
}

function CustomHits() {
	const { items, sendEvent } = useHits();
	const grouped_items = groupBy(
		items as THit<{
			title: string;
			description: string;
			url: string;
			category: string;
			tags: string[];
		}>[],
		'category',
	);

	return (
		<ul>
			{Object.entries(grouped_items).map(([category, items]) => (
				<li className='p-1' key={category}>
					<h2 className='py-1 font-semibold'>
						<FolderIcon className='mr-1 inline' />
						{category}
					</h2>
					<ul className='border-l-base-content/25 ml-2.5 border-l-2 pr-2 pl-2.5'>
						{items.map((item) => (
							<li
								className='hover:bg-accent/30 rounded-md py-0.5 pl-2 transition-discrete duration-75'
								key={item.title + item.description}
							>
								<Hit hit={item} sendEvent={sendEvent} />
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}

function Hit({
	hit,
	sendEvent,
}: {
	hit: THit<{
		title: string;
		description: string;
		url: string;
		category: string;
		tags: string[];
	}>;
	sendEvent: SendEventForHits;
}) {
	return (
		<Link
			onClick={() => sendEvent('click', hit, 'Link clicado')}
			onAuxClick={() => sendEvent('click', hit, 'Link clicado')}
			href={hit.url}
			target='_blank'
			rel='noopener noreferrer'
		>
			{hit.title}
			<span className='text-base-content ml-1 line-clamp-1 text-sm'>{hit.description}</span>
		</Link>
	);
}

function NoResultsBoundary({
	children,
	fallback,
}: {
	children: React.ReactNode;
	fallback: React.ReactNode;
}) {
	const { results } = useInstantSearch();

	// The `__isArtificial` flag makes sure not to display the No Results message
	// when no hits have been returned.
	if (!results.__isArtificial && results.nbHits === 0) {
		return (
			<>
				{fallback}
				<div hidden>{children}</div>
			</>
		);
	}

	return children;
}

function NoResults() {
	const { indexUiState } = useInstantSearch();

	return (
		<div>
			<p>
				Nenhum resultado encontrado para <q>{indexUiState.query}</q>.
			</p>
		</div>
	);
}

function EmptyQueryBoundary({
	children,
	fallback,
}: {
	children: React.ReactNode;
	fallback: React.ReactNode;
}) {
	const { indexUiState } = useInstantSearch();

	if (!indexUiState.query) {
		return (
			<>
				{fallback}
				<div hidden>{children}</div>
			</>
		);
	}

	return children;
}
