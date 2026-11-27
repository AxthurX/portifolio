'use client';

import type { BaseHit, Hit } from 'instantsearch.js';
import type { SendEventForHits } from 'instantsearch.js/es/lib/utils';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Configure, InstantSearch, Stats, useHits } from 'react-instantsearch';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import MainContainer from '@/components/_structure/MainContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDescription } from '@/lib/utils';
import { SearchModal } from './SearchModal';

export interface SearchParams {
    type: string | null;
    query: string | null;
}

export interface HitResult {
    title: string;
    subtitle: string;
    description?: string;
    categories: string[];
    url?: string;
    popularity: number;
    type: string;
    content_title: string[];
    content_url: string[];
}

export interface HitProps {
    hit: Hit<BaseHit> & HitResult;
    sendEvent: SendEventForHits;
}

export interface HitCount {
    type: string;
    count: number;
}

export type HitType = string;

function SearchContent({
    query,
    tab,
    setTab,
    setQuery,
}: {
    query: string;
    tab: HitType;
    setTab: (t: HitType) => void;
    setQuery: (q: string) => void;
}) {
    const { items } = useHits<HitResult>();

    return (
        <>
            <header className='flex items-end justify-between pt-14 max-sm:flex-col-reverse max-sm:items-center'>
                <div className='p-4'>
                    <h1 className='text-base-content mb-0.5 self-end text-3xl font-semibold max-sm:self-start dark:text-white'>
                        {query ? `${query}` : 'Todos os resultados'}
                    </h1>

                    <Stats
                        className='text-base-content border-y-0! text-lg leading-none dark:text-white'
                        translations={{
                            rootElementText({ nbHits }) {
                                return `${nbHits} resultado${nbHits === 1 ? '' : 's'} encontrado${nbHits === 1 ? '' : 's'}.`;
                            },
                        }}
                    />
                </div>
                <div className='max-sm:pt-4'>
                    <div className='hidden'>
                        <SearchModal />
                    </div>
                    <div className='group relative m-4 h-14 w-96 max-sm:m-0'>
                        <input
                            className='input input-accent bg-base-200 outline-accent/0 group-hover:outline-accent flex h-14 w-full grow border-2 text-lg outline-2 outline-offset-2 transition-normal duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-neutral-800 dark:bg-neutral-800'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Buscar...'
                        />
                        <div className='absolute top-1 right-1 z-10 flex h-12 items-center gap-2 transition-discrete duration-200 group-focus-within:opacity-0 max-sm:justify-end max-sm:self-stretch'>
                            <div className='opacity-0 transition-discrete duration-200 group-hover:opacity-80 max-sm:hidden'>
                                <span className='text-primary shadow-primary outline-primary mx-1 rounded px-2 py-1 shadow-[0_2px_0_1px] outline-1'>
                                    Ctrl
                                </span>
                                <span className='text-primary shadow-primary outline-primary mx-1 rounded px-2 py-1 shadow-[0_2px_0_1px] outline-1'>
                                    K
                                </span>
                            </div>
                            <div className='btn btn-primary h-12 shadow-none max-sm:self-stretch'>
                                <SearchIcon />
                                <span className='sr-only'>Pesquisar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Configure query={query ?? ''} hitsPerPage={250} distinct />
            <Hits tab={tab} setTab={setTab} items={items} />
        </>
    );
}

export default function SearchPage() {
    const search_params = useSearchParams();
    const query_param = search_params.get('q');

    const [query, setQuery] = useState<string>(query_param ?? '');
    const [tab, setTab] = useState<HitType>('Todos');

    const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
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
        collectionSpecificSearchParameters: {
            'portal-sedam': {
                query_by: 'title,description,category,tags',
            },
            'sedam-directors': {
                query_by: 'name,role,sector',
            },
        },
    });

    const searchClient = typesenseInstantsearchAdapter.searchClient;

    return (
        <MainContainer className='relative flex h-full min-h-screen flex-col px-24 max-md:px-12 max-sm:px-8'>
            <InstantSearch
                searchClient={searchClient}
                indexName='portal-sedam'
                stalledSearchDelay={400}
                future={{ preserveSharedStateOnUnmount: true }}
            >
                <SearchContent query={query} tab={tab} setTab={setTab} setQuery={setQuery} />
            </InstantSearch>
        </MainContainer>
    );
}

const Hits = ({
    tab,
    setTab,
    items,
}: {
    tab: HitType;
    items: Hit<BaseHit>[];
    setTab: (t: HitType) => void;
}) => {
    const types = items.flatMap((item) =>
        Array.isArray(item.category) ? item.category : [item.category],
    );
    const types_count = useMemo(() => {
        const map: Record<string, number> = {};

        types.forEach((t) => {
            map[t] = (map[t] || 0) + 1;
        });

        map['Todos'] = items.length;

        return Object.entries(map)
            .map(([type, count]) => ({ type, count }))
            .sort((a, b) => {
                if (a.type === 'Todos') return -1;
                if (b.type === 'Todos') return 1;
                return b.count - a.count;
            });
    }, [types, items.length]);

    if (!items.length) {
        return (
            <div className='bg-beige-100 min-h-50 rounded-lg p-4 dark:bg-black'>
                <span className='text-base-content dark:text-neutral-300'>
                    Nenhum resultado encontrado. Tente também procurar em{' '}
                    <Link className='link' href='/noticias'>
                        Notícias
                    </Link>
                    .
                </span>
            </div>
        );
    }

    return (
        <Tabs
            value={tab}
            className='bg-base-100 rounded-lg dark:bg-black'
            defaultValue={types_count.find((t) => t.type === tab) ? tab : 'Todos'}
            onValueChange={(value) => setTab(value as HitType)}
        >
            {types_count.length > 0 && (
                <TabsList className='bg-primary text-primary-content flex h-full flex-wrap items-center justify-center gap-x-1.5 p-2 shadow-lg shadow-black/10 dark:from-neutral-300/50 dark:to-neutral-800 dark:text-white'>
                    {types_count.map(({ type, count }) => (
                        <TabsTrigger
                            className='data-[state=active]:bg-accent/25 data-[state=active]:text-primary-content cursor-pointer px-3 py-1 font-medium dark:data-[state=active]:bg-white dark:data-[state=active]:text-black!'
                            key={type as HitType}
                            value={type}
                        >
                            {`${type} (${count})`}
                        </TabsTrigger>
                    ))}
                </TabsList>
            )}
            <TabsContent className='mt-1' value={tab}>
                {items
                    .filter((hit) => {
                        const categories = Array.isArray(hit.category) ? hit.category : [hit.category];
                        return tab === 'Todos' || categories.includes(tab);
                    })
                    .map((hit) => (
                        <HitComponent key={hit.objectID} hit={hit} />
                    ))}
            </TabsContent>
        </Tabs>
    );
};

const HitComponent = ({ hit }: { hit: Hit<BaseHit> }) => {
    return (
        <div className='flex max-w-full px-2 py-1'>
            {' '}
            <div className='w-full rounded-lg border border-gray-600 bg-white p-4 shadow-xs dark:border-neutral-700 dark:bg-neutral-800'>
                <h2 className='text-base-content mb-2 text-xl font-semibold dark:text-neutral-300'>
                    {' '}
                    {hit.title}
                </h2>
                {hit.subtitle && (
                    <p className='mb-1 text-base font-medium text-neutral-700 dark:text-neutral-400'>
                        {' '}
                        {hit.subtitle}
                    </p>
                )}
                {hit.description && (
                    <p className='mb-4 text-sm text-neutral-600 dark:text-neutral-400'>
                        {' '}
                        {formatDescription(hit.description)}
                    </p>
                )}
                {hit.url && (
                    <Link className='btn btn-primary btn-sm' href={hit.url}>
                        Acessar
                    </Link>
                )}
            </div>
        </div>
    );
};
