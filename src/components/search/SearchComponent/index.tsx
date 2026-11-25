'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import type { HitType } from '..';
import { SearchModal } from '../SearchModal';

const SearchComponent = () => {
	const router = useRouter();
	const [query, setQuery] = useState<string>('');
	const default_options: HitType[] = [
		'Projetos',
		'Sandbox',
		'Formulários',
		'Contatos',
	];

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		router.push(`/search?q=${query}`);
	};

	return (
		<div className='mx-auto w-full max-w-3xl py-3'>
			<div className='hidden'>
				<SearchModal />
			</div>
			<form onSubmit={handleSearch} className='mb-4 flex items-center gap-1'>
				<div className='group relative mx-6 grow'>
					<input
						type='search'
						placeholder='O que você está procurando?'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className='input input-accent border-primary/60 bg-base-200 outline-accent/0 group-hover:outline-accent flex h-14 w-full grow items-center justify-center border-2 text-lg outline-2 outline-offset-2 transition-normal duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-neutral-800 dark:bg-neutral-800'
						aria-label='Campo de pesquisa'
					/>
					<div className='absolute top-1 right-1 z-10 flex h-12 items-center gap-2 max-sm:justify-end max-sm:self-stretch'>
						<div className='opacity-0 transition-discrete duration-200 group-focus-within:hidden group-hover:opacity-90 max-sm:hidden'>
							<span className='text-primary shadow-primary outline-primary mx-1 rounded px-2 py-1 shadow-[0_2px_0_1px] outline-1'>
								Ctrl
							</span>
							<span className='text-primary shadow-primary outline-primary mx-1 rounded px-2 py-1 shadow-[0_2px_0_1px] outline-1'>
								K
							</span>
						</div>

						<button type='submit' className='btn btn-primary h-12 shadow-none max-sm:self-stretch'>
							<SearchIcon />
							<span className='sr-only'>Pesquisar</span>
						</button>
					</div>
				</div>
			</form>

			<div className='flex flex-wrap justify-center gap-3'>
				{default_options.map((option) => {
					const href =
						option === 'Licenciamento Ambiental'
							? '/search?q=Sistema de Outorga e Licenciamento Ambiental de Rondônia'
							: `/search?q=${encodeURIComponent(option)}`;

					return (
						<Link key={option} href={href}>
							<div className='group border-primary bg-base-200 text-base-content shadow-primary dark:text-primary-content inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium shadow-[4px_4px_0_0] transition-all duration-150 ease-out hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 dark:bg-neutral-900'>
								<span className='transition-transform duration-150 group-hover:translate-x-0.5'>
									{option}
								</span>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default SearchComponent;
