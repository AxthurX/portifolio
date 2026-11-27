'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Accessibility, PenLine, SearchIcon } from 'lucide-react';
import {
	type ReactNode,
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import SearchComponent from '@/components/search/SearchComponent';
import Tiptap from '@/components/TipTap';
import { cn } from '@/lib/utils';
import { INITIAL_DOC } from './content';

type Side = 'left' | 'right';
type TargetKind = 'search' | 'editor-toolbar' | 'editor-content' | 'a11y';

interface Annotation {
	id: string;
	side: Side;
	index: string;
	eyebrow: string;
	title: string;
	body: string;
	target: TargetKind;
	icon: typeof SearchIcon;
	tags: string[];
	offsetClassName: string;
}

const ANNOTATIONS: Annotation[] = [
	{
		id: 'busca',
		side: 'left',
		index: '01',
		eyebrow: 'Search · Typesense',
		title: 'Motor de busca',
		body: 'Integrado ao Typesense, envolvendo estratégias de indexação, busca instantânea (Instant Search), autocomplete, tolerância a erros de digitação (Fuzzy Search) e stemming em português. Também implementei critérios personalizados de relevância para melhorar a ordenação dos resultados e facilitar a localização das informações.',
		target: 'search',
		icon: SearchIcon,
		tags: ['Next.js', 'Ctrl + K', '/search'],
		offsetClassName: 'lg:mt-10',
	},
	{
		id: 'editor',
		side: 'left',
		index: '02',
		eyebrow: 'TipTap · ProseMirror',
		title: 'Editor de Conteúdo',
		body: 'Editor baseado em TipTap e ProseMirror, oferecendo a criação e edição de conteúdos, com suporte a imagens, galerias, vídeos, links, formatação de textos e outros elementos.',
		target: 'editor-toolbar',
		icon: PenLine,
		tags: ['TipTap 3', 'ProseMirror', 'extensões'],
		offsetClassName: 'lg:mt-40',
	},
	{
		id: 'acessibilidade',
		side: 'right',
		index: '03',
		eyebrow: 'Accessibility',
		title: 'Menu de Acessibilidade',
		body: 'Menu com opções de contraste, tamanho do texto, régua de leitura e perfis de adaptação para diferentes necessidades.',
		target: 'a11y',
		icon: Accessibility,
		tags: ['WCAG 2.2', 'Ctrl + U', 'perfis'],
		offsetClassName: 'lg:mt-16',
	},
];

interface Point {
	x: number;
	y: number;
}

interface Connector {
	id: string;
	path: string;
	from: Point;
	to: Point;
}

const ARROW_KEYFRAMES = `
@keyframes studio-dash {
	to { stroke-dashoffset: -32; }
}
.studio-connector {
	stroke-dasharray: 5 7;
	animation: studio-dash 1.6s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
	.studio-connector { animation: none; }
}
`;

export function StudioLab() {
	const reduceMotion = useReducedMotion();
	const [html, setHtml] = useState(INITIAL_DOC);
	const [connectors, setConnectors] = useState<Connector[]>([]);

	const stageRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

	const setCardRef = useCallback(
		(id: string) => (element: HTMLElement | null) => {
			if (element) cardRefs.current.set(id, element);
			else cardRefs.current.delete(id);
		},
		[],
	);

	const resolveTarget = useCallback((kind: TargetKind, stageBox: DOMRect): Point | null => {
		const toStage = (x: number, y: number): Point => ({
			x: x - stageBox.left,
			y: y - stageBox.top,
		});

		if (kind === 'a11y') {
			const trigger = document.querySelector<HTMLElement>('[data-a11y-trigger]');

			if (!trigger) return null;

			const rect = trigger.getBoundingClientRect();
			const y = Math.min(
				Math.max(rect.top + rect.height / 2, stageBox.top + 40),
				stageBox.bottom - 40,
			);
			const x = Math.min(rect.left - 8, stageBox.right - 8);

			return { x: x - stageBox.left, y: y - stageBox.top };
		}

		const element = kind === 'search' ? searchRef.current : editorRef.current;

		if (!element) return null;

		const rect = element.getBoundingClientRect();

		if (kind === 'search') return toStage(rect.left + 6, rect.top + rect.height / 2);

		if (kind === 'editor-toolbar') return toStage(rect.left + 6, rect.top + 74);

		return toStage(rect.right - 6, rect.top + rect.height * 0.68);
	}, []);

	const measure = useCallback(() => {
		const stage = stageRef.current;

		if (!stage) return;

		if (window.innerWidth < 1024) {
			setConnectors((previous) => (previous.length === 0 ? previous : []));

			return;
		}

		const stageBox = stage.getBoundingClientRect();
		const next: Connector[] = [];

		for (const annotation of ANNOTATIONS) {
			const card = cardRefs.current.get(annotation.id);

			if (!card) continue;

			const cardBox = card.getBoundingClientRect();
			const from: Point = {
				x: (annotation.side === 'left' ? cardBox.right + 4 : cardBox.left - 4) - stageBox.left,
				y: cardBox.top - stageBox.top + cardBox.height / 2,
			};

			const to = resolveTarget(annotation.target, stageBox);

			if (!to) continue;

			const direction = Math.sign(to.x - from.x) || 1;
			const bend = Math.min(160, Math.max(40, Math.abs(to.x - from.x) * 0.45));

			next.push({
				id: annotation.id,
				from,
				to,
				path: `M ${from.x} ${from.y} C ${from.x + direction * bend} ${from.y}, ${to.x - direction * bend} ${to.y}, ${to.x} ${to.y}`,
			});
		}

		setConnectors(next);
	}, [resolveTarget]);

	useLayoutEffect(() => {
		let frame = 0;

		const schedule = () => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(measure);
		};

		measure();

		window.addEventListener('resize', schedule);
		window.addEventListener('scroll', schedule, true);

		const observer = new ResizeObserver(schedule);

		if (stageRef.current) observer.observe(stageRef.current);

		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('scroll', schedule, true);
			observer.disconnect();
		};
	}, [measure]);

	useEffect(() => {
		const timeout = window.setTimeout(measure, 240);

		return () => window.clearTimeout(timeout);
	}, [measure]);

	return (
		<div ref={stageRef} className='relative'>
			<style>{ARROW_KEYFRAMES}</style>

			<svg
				aria-hidden
				className='pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block'
				width='100%'
				height='100%'
			>
				<defs>
					<marker
						id='studio-arrowhead'
						viewBox='0 0 10 10'
						refX='8'
						refY='5'
						markerWidth='7'
						markerHeight='7'
						orient='auto-start-reverse'
					>
						<path d='M 0 0 L 10 5 L 0 10 z' fill='var(--color-primary)' />
					</marker>
				</defs>

				{connectors.map((connector) => (
					<g key={connector.id}>
						<path
							d={connector.path}
							fill='none'
							stroke='var(--color-primary)'
							strokeWidth='2'
							strokeLinecap='round'
							markerEnd='url(#studio-arrowhead)'
							opacity='0.85'
							className={cn(!reduceMotion && 'studio-connector')}
						/>

						<circle cx={connector.from.x} cy={connector.from.y} r='4' fill='var(--color-primary)' />

						<circle cx={connector.to.x} cy={connector.to.y} r='3' fill='var(--color-primary)' />
					</g>
				))}
			</svg>

			<div className='relative z-10 grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)] lg:items-start lg:gap-8'>
				<div className='order-2 flex flex-col gap-6 lg:order-1'>
					{ANNOTATIONS.filter((annotation) => annotation.side === 'left').map((annotation) => (
						<AnnotationCard
							key={annotation.id}
							annotation={annotation}
							ref={setCardRef(annotation.id)}
						/>
					))}
				</div>

				<div className='order-1 flex min-w-0 flex-col gap-5 lg:order-2 lg:px-2'>
					<motion.div
						ref={searchRef}
						initial={reduceMotion ? false : { opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
						className='relative'
					>
						<StageLabel icon={<SearchIcon className='h-3 w-3' />} label='busca' />

						<div className='rounded-base bg-base-100 shadow-light dark:shadow-dark border-2 border-black p-2 dark:border-white'>
							<Suspense fallback={<SearchSkeleton />}>
								<SearchComponent />
							</Suspense>
						</div>
					</motion.div>

					<motion.div
						ref={editorRef}
						initial={reduceMotion ? false : { opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
						className='relative'
					>
						<StageLabel icon={<PenLine className='h-3 w-3' />} label='editor' />

						<div className='rounded-base bg-base-100 shadow-light dark:shadow-dark overflow-hidden border-2 border-black dark:border-white'>
							<div className='flex items-center justify-between gap-3 border-b-2 border-black bg-white/4 px-3 py-1.5 dark:border-white'>
								<span className='font-mono text-[10px] tracking-[0.18em] uppercase opacity-60'>
									content.rich
								</span>

								<span className='inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase opacity-60'>
									<span className='bg-success h-1.5 w-1.5 animate-pulse rounded-full' />
									editável
								</span>
							</div>

							<Tiptap
								defaultValue={INITIAL_DOC}
								onChange={setHtml}
								className='h-[520px] max-h-[62vh] rounded-none border-0'
							/>

							<div className='flex flex-wrap items-center justify-between gap-2 border-t-2 border-black bg-white/4 px-3 py-2 dark:border-white'>
								<span className='flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase opacity-70'>
									{html.length} caracteres
								</span>
							</div>
						</div>
					</motion.div>
				</div>

				<div className='order-3 flex flex-col gap-6'>
					{ANNOTATIONS.filter((annotation) => annotation.side === 'right').map((annotation) => (
						<AnnotationCard
							key={annotation.id}
							annotation={annotation}
							ref={setCardRef(annotation.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function SearchSkeleton() {
	return (
		<div className='mx-auto w-full max-w-3xl py-3' aria-hidden>
			<div className='mx-6 mb-4 h-14 rounded-md border-2 border-black/15 bg-black/4 dark:border-white/20 dark:bg-white/6' />

			<div className='flex flex-wrap justify-center gap-3'>
				{['a', 'b', 'c', 'd'].map((key) => (
					<div
						key={key}
						className='h-9 w-28 rounded-lg border-2 border-black/10 bg-black/3 dark:border-white/15 dark:bg-white/5'
					/>
				))}
			</div>
		</div>
	);
}

function StageLabel({ icon, label }: { icon: ReactNode; label: string }) {
	return (
		<div className='mb-2 flex items-center gap-2'>
			<span className='rounded-base bg-primary text-primary-content flex h-6 items-center gap-1.5 border-2 border-black px-2 font-mono text-[10px] tracking-[0.18em] uppercase dark:border-white'>
				{icon}
				{label}
			</span>

			<span className='h-px flex-1 bg-black/10 dark:bg-white/15' />
		</div>
	);
}

const AnnotationCard = function AnnotationCard({
	annotation,
	ref,
}: {
	annotation: Annotation;
	ref: (element: HTMLElement | null) => void;
}) {
	const Icon = annotation.icon;

	return (
		<article
			ref={ref}
			className={cn(
				'rounded-base bg-base-100 shadow-light dark:shadow-dark relative border-2 border-black p-3.5 dark:border-white',
				annotation.offsetClassName,
			)}
		>
			<div className='flex items-center gap-2'>
				<span className='bg-primary text-primary-content flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black text-[10px] font-bold dark:border-white'>
					{annotation.index}
				</span>

				<span className='text-muted-foreground truncate font-mono text-[10px] tracking-[0.18em] uppercase'>
					{annotation.eyebrow}
				</span>

				<Icon className='text-muted-foreground ml-auto h-3.5 w-3.5 shrink-0' />
			</div>

			<h3 className='mt-2 text-sm leading-snug font-semibold'>{annotation.title}</h3>

			<p className='text-muted-foreground mt-1 text-[11.5px] leading-relaxed'>{annotation.body}</p>

			<div className='mt-2.5 flex flex-wrap gap-1'>
				{annotation.tags.map((tag) => (
					<span
						key={tag}
						className='text-muted-foreground rounded-full border border-black/15 px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase dark:border-white/20'
					>
						{tag}
					</span>
				))}
			</div>
		</article>
	);
};
