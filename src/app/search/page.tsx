import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPage from '@/components/search';

export const metadata: Metadata = {
	title: 'Busca',
	description: 'Resultados de busca do portal.',
};

function SearchFallback() {
	return (
		<div className='flex min-h-screen items-center justify-center px-6'>
			<p className='text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase'>
				Consultando índice…
			</p>
		</div>
	);
}

export default function Page() {
	return (
		<Suspense fallback={<SearchFallback />}>
			<SearchPage />
		</Suspense>
	);
}
