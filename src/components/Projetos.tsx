'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

export interface Projeto {
	id: string;
	client: string;
	title: string;
	category: string;
	description: string;
	image: string;
	technologies: string[];
	video: string;
}

const PROJECTS: Projeto[] = [
	{
		id: '01',
		client: 'SEDAM',
		category: 'Fullstack & Governo Digital',
		title:
			'Desenvolvimento e evolução de um ecossistema digital com múltiplos sistemas para a SEDAM',
		description:
			'Atuação no desenvolvimento e manutenção de plataformas utilizadas para serviços públicos, gestão administrativa, transparência, processos seletivos, inscrições, documentação e atendimento ao cidadão.',
		image: '/projetos/sedam.png',
		technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL'],
		video: '',
	},

	{
		id: '02',
		client: 'Portal SEDAM',
		category: 'Portal Institucional',
		title: 'Portal institucional para serviços, notícias, requerimentos e informações ambientais',
		description:
			'Principal portal institucional da Secretaria, reunindo informações ambientais, notícias, serviços online, formulários dinâmicos e processos de solicitação de certificados e autorizações.',
		image: '/projetos/portal.png',
		technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
		video: '',
	},

	{
		id: '03',
		client: 'Portal SEDAM — Admin',
		category: 'CMS & Gestão de Conteúdo',
		title: 'Painel administrativo para gerenciamento de conteúdo e publicação do Portal SEDAM',
		description:
			'Plataforma interna utilizada pelos servidores para gerenciamento de conteúdos, notícias, documentos, categorias e recursos disponibilizados no portal institucional.',
		image: '/projetos/admin.png',
		technologies: ['Next.js', 'React', 'TypeScript', 'TipTap'],
		video: '',
	},

	{
		id: '04',
		client: 'Busca Inteligente',
		category: 'Search & Performance',
		title: 'Busca inteligente com Typesense e resultados instantâneos em menos de 50 ms',
		description:
			'Integração de um mecanismo de busca open-source ao Portal SEDAM, com fuzzy search, autocomplete, stemming em português, cache e ranking de resultados.',
		image: '/projetos/search.png',
		technologies: ['Typesense', 'Next.js', 'TypeScript', 'Docker'],
		video: '',
	},

	{
		id: '05',
		client: 'Editor de Conteúdo',
		category: 'Headless Editor & CMS',
		title: 'Editor de conteúdo baseado em TipTap e ProseMirror com extensões personalizadas',
		description:
			'Editor rico desenvolvido para publicação de conteúdos e documentação, com galerias, vídeos, tabelas redimensionáveis, upload de arquivos e imagens e integração com armazenamento.',
		image: '/projetos/tiptap.png',
		technologies: ['TipTap', 'ProseMirror', 'Next.js', 'TypeScript', 'Fastify', 'MinIO'],
		video: '',
	},
	{
		id: '06',
		client: 'Acessibilidade',
		category: 'Accessibility & Design System',
		title: 'Menu de acessibilidade para diferentes necessidades de uso',
		description:
			'Biblioteca de acessibilidade desenvolvida com React, Next.js e Tailwind com recursos de contraste, tamanho de texto, espaçamento, saturação, leitura e comandos de voz.',
		image: '/projetos/acessibilidade.png',
		technologies: ['React', 'Next.js', 'Tailwind CSS', 'WCAG'],
		video: '',
	},
	{
		id: '07',
		client: 'Portal da Transparência',
		category: 'Transparência Pública',
		title: 'Plataforma para disponibilização de informações públicas da SEDAM',
		description:
			'Sistema voltado à publicação e consulta de informações públicas, contribuindo para o acesso aos dados institucionais da Secretaria.',
		image: '/projetos/transparencia.png',
		technologies: ['React', 'Next.js', 'TypeScript'],
		video: '',
	},
	{
		id: '08',
		client: 'Processos & Inscrições',
		category: 'Sistemas Administrativos',
		title: 'Plataformas para inscrições, processos seletivos e gerenciamento de documentos',
		description:
			'Desenvolvimento e manutenção de sistemas utilizados para inscrições de candidatos a estágio, processos seletivos e gerenciamento de documentos e candidaturas.',
		image: '/projetos/processos.png',
		technologies: ['React', 'Next.js', 'TypeScript', 'Node.js'],
		video: '',
	},
	{
		id: '09',
		client: 'SEDAM Wiki',
		category: 'Documentação',
		title: 'Plataforma de documentação interna para conhecimento e processos da Secretaria',
		description:
			'Ambiente dedicado à documentação e organização do conhecimento técnico e institucional da SEDAM.',
		image: '/projetos/wiki.png',
		technologies: ['Next.js', 'React', 'TypeScript'],
		video: '',
	},
];

function ProjectCard({ projeto }: { projeto: Projeto }) {
	return (
		<Card className='group relative flex h-[60vh] w-full shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface md:h-[70vh] md:w-[55vw]'>
			<div
				className='absolute inset-0 z-0 bg-center bg-cover bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105'
				style={{
					backgroundImage: `url(${projeto.image})`,
				}}
			/>

			<div className='absolute inset-0 z-1 bg-[#fafafa]/55 transition-opacity duration-500 group-hover:bg-[#fafafa]/40' />

			<div className='absolute inset-0 z-2 bg-linear-to-br from-[#fafafa]/60 via-[#fafafa]/25 to-primary/15' />

			<div
				className='pointer-events-none absolute inset-0 z-3 opacity-[0.08]'
				style={{
					backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)',
					backgroundSize: '24px 24px',
				}}
			/>

			<div className='pointer-events-none absolute inset-0 z-4 bg-linear-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

			<div className='relative z-10 flex items-start justify-between p-6 md:p-8'>
				<div>
					<span className='mb-2 block font-medium text-primary text-xs uppercase tracking-widest'>
						{projeto.category}
					</span>

					<span className='text-muted-foreground text-sm dark:text-primary'>{projeto.client}</span>
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button
							type='button'
							variant='outline'
							className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-border bg-[#fafafa]/60 p-0 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground group-hover:border-primary/50'
							aria-label={`Ver apresentação de ${projeto.client}`}
						>
							<ArrowUpRight
								strokeWidth={1.5}
								className='h-5 w-5 transition-transform duration-300 group-hover:rotate-45'
							/>
						</Button>
					</DialogTrigger>

					<DialogContent className='w-full max-w-5xl overflow-hidden border-border bg-surface p-0'>
						<DialogTitle className='hidden text-xl'>{projeto.client}</DialogTitle>

						{projeto.video ? (
							<div className='aspect-video w-full overflow-hidden bg-black'>
								<video
									className='h-full w-full object-contain'
									controls
									playsInline
									preload='metadata'
									poster={projeto.image}
								>
									<source src={projeto.video} type='video/mp4' />
									Seu navegador não suporta reprodução de vídeo.
								</video>
							</div>
						) : (
							<div
								className='flex aspect-video items-center justify-center bg-center bg-cover'
								style={{
									backgroundImage: `linear-gradient(
										rgba(0, 0, 0, 0.55),
										rgba(0, 0, 0, 0.55)
									), url(${projeto.image})`,
								}}
							>
								<div className='text-center text-white'>
									<p className='font-medium'>Apresentação em breve</p>

									<p className='mt-1 text-sm text-white/60'>
										O vídeo deste projeto ainda não está disponível.
									</p>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>
			</div>

			{/* Conteúdo inferior */}
			<div className='relative z-10 flex items-end justify-between p-6 md:p-8'>
				<h4 className='max-w-[80%] font-light text-2xl text-foreground leading-tight tracking-tight md:text-4xl xl:text-5xl dark:font-semibold dark:text-primary'>
					{projeto.title}
				</h4>

				<div className='-mb-2 font-serif text-5xl text-foreground/10 italic leading-none tracking-tighter md:text-7xl lg:text-8xl'>
					{projeto.id}
				</div>
			</div>
		</Card>
	);
}

export default function Projetos() {
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
			<section id='projetos' className='w-full px-4 py-16'>
				<div className='mb-12'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest dark:text-base-content/70'>
						Projetos
					</span>
					<h3 className='font-bold text-4xl tracking-tight'>
						Trabalhos{' '}
						<span className='font-normal font-serif text-primary italic dark:text-base-content/70'>
							Recentes
						</span>
					</h3>
				</div>

				<div className='flex flex-col gap-6'>
					{PROJECTS.map((projeto) => (
						<motion.div
							key={projeto.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						>
							<ProjectCard projeto={projeto} />
						</motion.div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section id='projetos' ref={targetRef} className='relative h-[400vh]'>
			<div className='sticky top-0 flex h-screen items-center overflow-hidden'>
				<div className='absolute top-24 left-8 z-20 md:left-12'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
						Projetos
					</span>
					<h3 className='font-bold text-4xl tracking-tight md:text-5xl'>
						Trabalhos <span className='font-normal font-serif text-primary italic'>Recentes</span>
					</h3>
				</div>

				<motion.div style={{ x }} className='flex gap-8 px-4 pt-42 pl-[5vw] md:gap-12 md:px-14'>
					{PROJECTS.map((projeto) => (
						<ProjectCard key={projeto.id} projeto={projeto} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
