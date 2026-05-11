'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
	ProgressSlider,
	SliderBtn,
	SliderBtnGroup,
	SliderContent,
	SliderWrapper,
} from './ui/progressive-carousel';

type PortfolioDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

type Project = {
	sliderName: string;
	client: string;
	category: string;
	year: string;
	desc: string;
	img: string;
};

const PROJECTS: Project[] = [
	{
		sliderName: 'elevate',
		client: 'ELEVATE TECH',
		category: 'Branding & Web Design',
		year: '2024',
		desc: 'Redesign completo de identidade visual e plataforma digital para uma startup de finanças que triplicou sua conversão.',
		img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop',
	},
	{
		sliderName: 'aura',
		client: 'AURA BEAUTY',
		category: 'E-Commerce Premium',
		year: '2024',
		desc: 'Experiencia de compra imersiva para marca de beleza premium com AR try-on e jornada personalizada.',
		img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop',
	},
	{
		sliderName: 'nxt',
		client: 'NXT MOBILITY',
		category: 'UX/UI & Dashboard',
		year: '2023',
		desc: 'App de mobilidade urbana com dashboard de dados em tempo real, design system proprietário e animações nativas.',
		img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1374&auto=format&fit=crop',
	},
	{
		sliderName: 'lumina',
		client: 'LUMINA ART',
		category: 'Digital Studio',
		year: '2023',
		desc: 'Plataforma interativa para galeria de arte contemporânea com tours virtuais e integração com Web3.',
		img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format&fit=crop',
	},
];

export default function PortfolioDrawer({
	isOpen,
	onClose,
}: PortfolioDrawerProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						key='backdrop'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
						onClick={onClose}
						className='fixed inset-0 z-60 bg-background/80 backdrop-blur-sm'
					/>

					{/* Drawer */}
					<motion.div
						key='drawer'
						initial={{ y: '-100%' }}
						animate={{ y: 0 }}
						exit={{ y: '-100%' }}
						transition={{
							duration: 0.65,
							ease: [0.16, 1, 0.3, 1],
						}}
						className='fixed top-0 right-0 left-0 z-70 flex h-[80vh] flex-col overflow-hidden rounded-b-3xl border-border border-b bg-surface'
					>
						{/* Header */}
						<div className='flex shrink-0 items-center justify-between border-border border-b px-6 pt-6 pb-4 md:px-10'>
							<div>
								<span className='mb-1 block font-medium text-muted-foreground text-xs uppercase tracking-widest'>
									Portfolio
								</span>

								<h2 className='font-bold text-xl tracking-tight md:text-2xl'>
									Projetos{' '}
									<span className='font-normal font-serif text-primary italic'>
										Recentes
									</span>
								</h2>
							</div>

							<button
								type='button'
								onClick={onClose}
								aria-label='Fechar portfolio'
								className='flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background'
							>
								<X className='h-4 w-4' />
							</button>
						</div>

						{/* Content */}
						<div className='flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 pt-4 pb-2 md:px-8'>
							<ProgressSlider
								activeSlider='elevate'
								duration={7000}
								className='flex h-full flex-col gap-3'
							>
								{/* Slides */}
								<SliderContent className='relative min-h-0 flex-1 overflow-hidden rounded-2xl'>
									{PROJECTS.map((project) => (
										<SliderWrapper
											key={project.sliderName}
											value={project.sliderName}
											className='absolute inset-0'
										>
											<div className='relative h-full w-full'>
												<Image
													src={project.img}
													alt={project.client}
													fill
													priority
													sizes='(max-width: 768px) 100vw, 85vw'
													className='object-cover'
												/>

												<div className='absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent' />

												<div className='absolute right-0 bottom-0 left-0 flex items-end justify-between p-5 md:p-8'>
													<div>
														<span className='font-medium text-primary text-xs uppercase tracking-widest'>
															{project.category} / {project.year}
														</span>

														<h3 className='mt-2 font-bold text-2xl text-foreground tracking-tight md:text-4xl'>
															{project.client}
														</h3>

														<p className='mt-2 hidden max-w-lg text-muted-foreground text-sm md:block'>
															{project.desc}
														</p>
													</div>

													<Link
														href='#projetos'
														onClick={onClose}
														className='group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground'
													>
														<ArrowUpRight
															className='h-5 w-5 transition-transform group-hover:rotate-45'
															strokeWidth={1.5}
														/>
													</Link>
												</div>
											</div>
										</SliderWrapper>
									))}
								</SliderContent>

								{/* Navigation */}
								<SliderBtnGroup className='grid shrink-0 grid-cols-2 gap-2 md:grid-cols-4'>
									{PROJECTS.map((project) => (
										<SliderBtn
											key={project.sliderName}
											value={project.sliderName}
											className='cursor-pointer overflow-hidden rounded-xl border border-border bg-background p-3 text-left transition-all hover:border-primary/50 md:p-4'
											progressBarClass='h-full bg-primary'
											progressStyle={{
												mixBlendMode: 'difference',
											}}
										>
											<span className='relative z-10 mb-1 block truncate font-medium text-[10px] text-primary uppercase tracking-widest'>
												{project.category}
											</span>

											<span className='relative z-10 block truncate font-medium text-foreground text-xs md:text-sm'>
												{project.client}
											</span>
										</SliderBtn>
									))}
								</SliderBtnGroup>
							</ProgressSlider>
						</div>

						{/* Footer */}
						<div className='flex shrink-0 justify-center pt-1 pb-4'>
							<motion.button
								type='button'
								onClick={onClose}
								aria-label='Fechar portfolio'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='group flex flex-col items-center gap-1'
							>
								<motion.div
									animate={{ y: [-3, 3, -3] }}
									transition={{
										duration: 1.6,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'easeInOut',
									}}
									className='flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary group-hover:text-primary'
								>
									<ChevronUp className='h-4 w-4' strokeWidth={2} />
								</motion.div>

								<span className='font-medium text-[10px] text-muted-foreground uppercase tracking-widest transition-colors duration-300 group-hover:text-primary'>
									fechar
								</span>
							</motion.button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
