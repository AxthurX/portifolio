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
		client: 'ELEVATE TECH',
		category: 'Branding & Web Design',
		title: 'Redefinindo o futuro do setor financeiro',
		image: '/cases/case-1.jpg',
	},
	{
		id: '02',
		client: 'AURA BEAUTY',
		category: 'E-Commerce',
		title: 'Uma jornada de compra imersiva global',
		image: '/cases/case-2.jpg',
	},
	{
		id: '03',
		client: 'NXT MOBILITY',
		category: 'UX/UI Design',
		title: 'Mobilidade urbana através de dados',
		image: '/cases/case-3.jpg',
	},
	{
		id: '04',
		client: 'LUMINA ART',
		category: 'Digital Studio',
		title: 'Experiência interativa para galerias de arte',
		image: '/cases/case-4.jpg',
	},
];

function CaseCard({ projeto }: { projeto: Case }) {
	return (
		<div className='group relative flex h-[60vh] w-full shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] p-6 md:h-[70vh] md:w-[60vw]'>
			<div className='absolute inset-0 z-0 overflow-hidden bg-[#111]'>
				<div className='absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
				<div className='absolute inset-0 z-0 bg-[#151515] transition-transform duration-700 ease-out group-hover:scale-105' />
			</div>

			<div className='relative z-20 flex items-start justify-between'>
				<div>
					<span className='mb-2 block font-bold text-[#965EC7] text-xs uppercase tracking-widest'>
						{projeto.category}
					</span>
					<span className='font-medium text-sm text-white/70 tracking-wider'>
						{projeto.client}
					</span>
				</div>
				<div className='flex h-12 w-12 items-center justify-center rounded-full border border-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black'>
					<ArrowUpRight
						strokeWidth={1.5}
						className='h-5 w-5 text-white transition-colors group-hover:text-black'
					/>
				</div>
			</div>

			{/* Bottom Title Area */}
			<div className='relative z-20 flex items-end justify-between'>
				<h4 className='max-w-[80%] font-light text-2xl leading-[1.1] tracking-tight md:text-5xl xl:text-6xl'>
					{projeto.title}
				</h4>
				<div className='-mb-4 font-bold font-serif text-5xl text-white/10 italic leading-none tracking-tighter md:text-8xl lg:text-9xl'>
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
			<section id='cases' className='w-full bg-black px-4 py-16 text-white'>
				<div className='mb-12'>
					<h2 className='mb-3 font-black text-white/35 text-xs uppercase tracking-[0.35em]'>
						Nossos Cases
					</h2>
					<h3 className='font-black text-4xl tracking-[-0.03em] md:text-5xl'>
						Projetos{' '}
						<span className='font-normal font-serif text-[#965EC7] italic'>
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
			className='relative h-[400vh] bg-black text-white'
		>
			<div className='sticky top-0 flex h-screen items-center overflow-hidden'>
				<div className='absolute top-12 left-4 z-20 md:left-12'>
					<h2 className='mb-2 font-black text-white/35 text-xs uppercase tracking-[0.35em]'>
						Nossos Cases
					</h2>
					<h3 className='font-black text-4xl tracking-[-0.03em] md:text-5xl'>
						Projetos{' '}
						<span className='font-normal font-serif text-[#965EC7] italic'>
							Recentes
						</span>
					</h3>
				</div>

				<motion.div
					style={{ x }}
					className='flex gap-12 px-4 pt-24 pl-[5vw] md:gap-24 md:px-12 md:pl-[20vw]'
				>
					{CASES.map((projeto) => (
						<CaseCard key={projeto.id} projeto={projeto} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
