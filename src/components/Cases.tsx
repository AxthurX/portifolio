'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface Case {
	id: string;
	client: string;
	category: string;
	title: string;
	image: string;
}

const CASES = [
	{
		id: '01',
		client: 'SEDAM',
		category: 'Sistema Governamental',
		title: 'Plataforma de requerimentos digitais e gestao documental',
		image: '/cases/sedam.jpg',
	},
	{
		id: '02',
		client: 'Portal de Noticias',
		category: 'CMS & Editor Avancado',
		title: 'Migracao completa do TinyMCE para Tiptap com recursos customizados',
		image: '/cases/portal.jpg',
	},
	{
		id: '03',
		client: 'Chat IA Corporativo',
		category: 'AI & Fullstack',
		title: 'Sistema de chat inteligente com RAG, sessoes e respostas estruturadas',
		image: '/cases/chat-ai.jpg',
	},
	{
		id: '04',
		client: 'Acessibilidade Web',
		category: 'Frontend Architecture',
		title: 'Biblioteca reutilizavel com integracao Tailwind e componentes acessiveis',
		image: '/cases/acessibilidade.jpg',
	},
];

function CaseCard({ projeto }: { projeto: Case }) {
	return (
		<div className='group relative flex h-[60vh] w-full shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 md:h-[70vh] md:w-[55vw] md:p-8'>
			{/* Background gradient */}
			<div className='absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
			
			{/* Pattern overlay */}
			<div 
				className='pointer-events-none absolute inset-0 opacity-[0.02]'
				style={{
					backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
					backgroundSize: '24px 24px'
				}}
			/>

			<div className='relative z-10 flex items-start justify-between'>
				<div>
					<span className='mb-2 block font-medium text-primary text-xs uppercase tracking-widest'>
						{projeto.category}
					</span>
					<span className='text-muted-foreground text-sm'>
						{projeto.client}
					</span>
				</div>

				<div className='flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground'>
					<ArrowUpRight
						strokeWidth={1.5}
						className='h-5 w-5 transition-transform group-hover:rotate-45'
					/>
				</div>
			</div>

			{/* Bottom Title Area */}
			<div className='relative z-10 flex items-end justify-between'>
				<h4 className='max-w-[80%] text-2xl font-light leading-tight tracking-tight text-foreground md:text-4xl xl:text-5xl'>
					{projeto.title}
				</h4>

				<div className='-mb-2 font-serif text-5xl text-foreground/10 italic leading-none tracking-tighter md:text-7xl lg:text-8xl'>
					{projeto.id}
				</div>
			</div>
		</div>
	);
}

export default function Cases() {
	const targetRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener('resize', check);
		return () => window.removeEventListener('resize', check);
	}, []);

	const { scrollYProgress } = useScroll({ target: targetRef });
	const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

	if (isMobile) {
		return (
			<section id='cases' className='w-full px-4 py-16'>
				<div className='mb-12'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
						Projetos
					</span>
					<h3 className='font-bold text-4xl tracking-tight'>
						Trabalhos{' '}
						<span className='font-serif text-primary italic font-normal'>
							Recentes
						</span>
					</h3>
				</div>

				<div className='flex flex-col gap-6'>
					{CASES.map((projeto) => (
						<motion.div
							key={projeto.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						>
							<CaseCard projeto={projeto} />
						</motion.div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section
			id='cases'
			ref={targetRef}
			className='relative h-[400vh]'
		>
			<div className='sticky top-0 flex h-screen items-center overflow-hidden'>
				<div className='absolute top-24 left-8 z-20 md:left-12'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
						Projetos
					</span>
					<h3 className='font-bold text-4xl tracking-tight md:text-5xl'>
						Trabalhos{' '}
						<span className='font-serif text-primary italic font-normal'>
							Recentes
						</span>
					</h3>
				</div>

				<motion.div
					style={{ x }}
					className='flex gap-8 px-4 pt-24 pl-[5vw] md:gap-12 md:px-12 md:pl-[20vw]'
				>
					{CASES.map((projeto) => (
						<CaseCard key={projeto.id} projeto={projeto} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
