import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface DemoDocument {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	category: string;
	tags: string[];
	url: string;
	popularity: number;
	content?: string;
}

const DEMO_DOCUMENTS: DemoDocument[] = [
	{
		id: 'a11y-menu',
		title: 'Menu de acessibilidade',
		subtitle: 'WCAG 2.2 · React · Radix UI',
		description:
			'Barra de recursos com contraste, escala de texto, espaçamento, saturação, régua de leitura e comandos de voz escopados na área de leitura.',
		category: 'Componentes',
		tags: ['acessibilidade', 'wcag', 'react', 'radix', 'contraste', 'dislexia'],
		url: '/playground#acessibilidade',
		popularity: 98,
	},
	{
		id: 'tiptap-editor',
		title: 'Editor de conteúdo',
		subtitle: 'TipTap 3 · ProseMirror',
		description:
			'Editor rico com títulos, listas, citações, código, links, imagens por URL, atalhos de Markdown e inspeção do HTML gerado.',
		category: 'Componentes',
		tags: ['editor', 'tiptap', 'prosemirror', 'cms', 'html', 'markdown'],
		url: '/playground#tiptap',
		popularity: 92,
	},
	{
		id: 'typesense-search',
		title: 'Busca inteligente com Typesense',
		subtitle: 'Resultados instantâneos em menos de 50 ms',
		description:
			'Índice de busca tolerante a erros de digitação, com facetas por categoria, destaque de termos e ranking por relevância.',
		category: 'Projetos',
		tags: ['typesense', 'busca', 'search', 'next.js', 'docker', 'instantsearch'],
		url: '/playground#busca',
		popularity: 95,
	},
	{
		id: 'certificados',
		title: 'Certificados e cursos',
		subtitle: 'Formação contínua',
		description:
			'Registro de cursos, certificações e trilhas concluídas em desenvolvimento de software, infraestrutura e segurança.',
		category: 'Currículo',
		tags: ['certificados', 'cursos', 'formação', 'estudos'],
		url: '/#certificados',
		popularity: 74,
	},
	{
		id: 'projetos',
		title: 'Projetos em produção',
		subtitle: 'Sistemas que rodam de verdade',
		description:
			'Portfólio de aplicações web, automações e ferramentas internas construídas de ponta a ponta.',
		category: 'Portfólio',
		tags: ['projetos', 'portfólio', 'sistemas', 'web'],
		url: '/#projetos',
		popularity: 88,
	},
	{
		id: 'links',
		title: 'Links e contato',
		subtitle: 'Onde me encontrar',
		description:
			'Repositórios, redes profissionais e canais diretos para conversar sobre trabalho.',
		category: 'Contato',
		tags: ['contato', 'links', 'github', 'redes'],
		url: '/links',
		popularity: 61,
	},
];

interface TypesenseHit {
	document: DemoDocument;
	highlight: Record<string, { matched_tokens: string[]; snippet: string }>;
	highlights: Array<{ field: string; matched_tokens: string[]; snippet: string }>;
	text_match: number;
}

function normalize(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();
}

function searchLocal(query: string, hitsPerPage: number, page: number) {
	const terms = normalize(query).split(/\s+/).filter(Boolean);

	const scored = DEMO_DOCUMENTS.map((doc) => {
		const title = normalize(doc.title);
		const subtitle = normalize(doc.subtitle ?? '');
		const description = normalize(doc.description);
		const tags = normalize(doc.tags.join(' '));
		const category = normalize(doc.category);

		let score = doc.popularity / 100;

		if (terms.length === 0) {
			return { doc, score };
		}

		for (const term of terms) {
			let termScore = 0;

			if (title.startsWith(term)) termScore += 12;
			else if (title.includes(term)) termScore += 8;

			if (tags.includes(term)) termScore += 5;
			if (subtitle.includes(term)) termScore += 4;
			if (description.includes(term)) termScore += 2;
			if (category.includes(term)) termScore += 3;

			if (termScore === 0) return { doc, score: 0 };
			score += termScore;
		}

		return { doc, score };
	})
		.filter((entry) => entry.score > 0)
		.sort((a, b) => b.score - a.score);

	const found = scored.length;
	const start = page * hitsPerPage;
	const slice = scored.slice(start, start + hitsPerPage);

	const hits: TypesenseHit[] = slice.map(({ doc, score }) => ({
		document: doc,
		highlight: {
			title: { matched_tokens: terms, snippet: doc.title },
			description: { matched_tokens: terms, snippet: doc.description },
		},
		highlights: [
			{ field: 'title', matched_tokens: terms, snippet: doc.title },
			{ field: 'description', matched_tokens: terms, snippet: doc.description },
		],
		text_match: Math.round(score * 1000),
	}));

	const facets: Record<string, Array<{ value: string; count: number }>> = {};

	if (scored.length > 0) {
		const counts = new Map<string, number>();

		for (const { doc } of scored) {
			counts.set(doc.category, (counts.get(doc.category) ?? 0) + 1);
		}

		facets.category = [...counts.entries()].map(([value, count]) => ({ value, count }));
	}

	return {
		facet_counts: Object.entries(facets).map(([field_name, counts]) => ({
			field_name,
			counts,
			stats: { total_values: counts.length },
		})),
		found,
		hits,
		out_of: DEMO_DOCUMENTS.length,
		page,
		request_params: { per_page: hitsPerPage, q: query },
		search_cutoff: false,
		search_time_ms: 1,
	};
}

async function proxyToTypesense(request: Request, path: string[], body?: string) {
	const host = process.env.TYPESENSE_HOST;
	const apiKey = process.env.TYPESENSE_API_KEY;

	if (!host || !apiKey) return null;

	const protocol = process.env.TYPESENSE_PROTOCOL ?? 'http';
	const port = process.env.TYPESENSE_PORT ?? '8108';
	const url = new URL(request.url);
	const target = `${protocol}://${host}:${port}/${path.join('/')}${url.search}`;

	const response = await fetch(target, {
		method: request.method,
		headers: {
			'Content-Type': 'application/json',
			'X-TYPESENSE-API-KEY': apiKey,
		},
		body: request.method === 'GET' || request.method === 'HEAD' ? undefined : body,
		cache: 'no-store',
	});

	const responseBody = await response.text();

	return new NextResponse(responseBody, {
		status: response.status,
		headers: { 'Content-Type': 'application/json' },
	});
}

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
	const { path = [] } = await params;
	const proxied = await proxyToTypesense(request, path);

	if (proxied) return proxied;

	const url = new URL(request.url);

	if (path[path.length - 1] !== 'search') {
		return NextResponse.json(
			{ message: 'Rota de busca local: use /collections/{c}/documents/search' },
			{ status: 404 },
		);
	}

	const hitsPerPage = Math.min(
		Number.parseInt(
			url.searchParams.get('per_page') ?? url.searchParams.get('hitsPerPage') ?? '250',
			10,
		) || 250,
		250,
	);
	const page = Math.max(Number.parseInt(url.searchParams.get('page') ?? '1', 10) - 1 || 0, 0);

	return NextResponse.json(searchLocal(url.searchParams.get('q') ?? '', hitsPerPage, page));
}

export async function POST(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
	const { path = [] } = await params;
	const raw = await request.text();
	const proxied = await proxyToTypesense(request, path, raw);

	if (proxied) return proxied;

	let body: { searches?: Array<{ q?: string; page?: number; per_page?: number }> } = {};

	try {
		body = raw ? JSON.parse(raw) : {};
	} catch {
		body = {};
	}

	const searches = body.searches ?? [];
	const results = searches.map((search) =>
		searchLocal(
			search.q ?? '',
			Math.min(search.per_page ?? 10, 250),
			Math.max((search.page ?? 1) - 1, 0),
		),
	);

	return NextResponse.json({ results });
}
