'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Maximize, MoveUpRight, Plus } from 'lucide-react';

export default function BentoGrid() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.15, delayChildren: 0.8 },
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
		},
	};

	return (
		<motion.section
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: '-100px' }}
			className='grid w-full grid-cols-1 gap-4 pb-12 md:grid-cols-4'
		>
			{/* Col 1 */}
			<motion.div
				variants={cardVariants}
				className='flex h-[420px] flex-col gap-4'
			>
				<div className='flex items-center gap-3 font-medium text-sm'>
					<span className='text-foreground/80'>[design criativo]</span>
					<div className='flex h-5 w-5 items-center justify-center rounded-full border border-foreground/30'>
						<Plus className='h-3 w-3 text-foreground/50' />
					</div>
				</div>
				<div className='group relative flex h-[65%] cursor-pointer flex-col justify-between rounded-[2.5rem] border border-foreground/15 bg-background p-7 transition-colors hover:border-foreground/40'>
					<p className='max-w-[85%] font-medium text-[13px] text-foreground/80 leading-tight'>
						nos orgulhamos de criar
						<br />
						designs visualmente atraentes q...
					</p>

					<div className='absolute top-1/2 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
						<Maximize className='h-5 w-5 text-foreground/70' />
					</div>

					<div className='flex w-full items-end justify-between'>
						<div className='flex items-baseline gap-2 text-foreground'>
							<span className='font-normal text-5xl tracking-tight'>24</span>
							<span className='text-foreground/60 text-xs tracking-wider'>
								projetos
							</span>
						</div>
						<div className='flex h-8 w-8 items-center justify-center rounded-full border border-foreground/30 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background'>
							<ArrowUpRight className='h-3.5 w-3.5 text-foreground/80 transition-colors group-hover:text-background' />
						</div>
					</div>
				</div>

				<div className='mt-auto h-[90px] w-[65%] cursor-pointer rounded-t-[2rem] rounded-b-xl border border-foreground/15 bg-background transition-colors hover:border-foreground/40' />
			</motion.div>

			{/* Col 2 */}
			<motion.div
				variants={cardVariants}
				className='flex h-[420px] flex-col gap-4'
			>
				<div className='flex items-center gap-3 pr-1 font-medium text-sm'>
					<span className='text-foreground/80'>[ux/ui]</span>
					<div className='flex h-5 w-5 items-center justify-center rounded-full border border-foreground/30'>
						<Plus className='h-3 w-3 text-foreground/50' />
					</div>
				</div>
				<div className='group relative flex h-[52%] cursor-pointer flex-col justify-between rounded-[2.5rem] border border-foreground/15 bg-background p-7 transition-colors hover:border-foreground/40'>
					<p className='font-medium text-[13px] text-foreground/80 leading-tight'>
						entendemos a importância de
						<br />
						projetos centrados no usuário...
					</p>

					<div className='flex w-full items-end justify-between'>
						<div className='flex items-baseline gap-2 text-foreground'>
							<span className='font-normal text-5xl tracking-tight'>150</span>
							<span className='flex items-center pt-2 text-[10px] text-foreground/60 uppercase leading-none'>
								clientes
							</span>
						</div>
						<div className='flex h-8 w-8 items-center justify-center rounded-full border border-foreground/30 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background'>
							<ArrowUpRight className='h-3.5 w-3.5 text-foreground/80 transition-colors group-hover:text-background' />
						</div>
					</div>
				</div>

				<div className='group relative w-full flex-1 cursor-pointer rounded-[2.5rem] border border-foreground/15 bg-background transition-colors hover:border-foreground/40'>
					<div className='absolute top-1/2 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
						<Maximize className='h-5 w-5 text-foreground/70' />
					</div>
				</div>
			</motion.div>

			{/* Col 3 */}
			<motion.div
				variants={cardVariants}
				className='flex h-[420px] flex-col gap-4'
			>
				<div className='flex items-center justify-start gap-2 pl-2 font-medium text-sm'>
					<span className='text-foreground/80'>/sobre processos</span>
				</div>
				<div className='group relative flex h-full cursor-pointer flex-col justify-between rounded-[2.5rem] border border-background/50 bg-foreground p-8 text-background transition-shadow hover:shadow-[0_0_40px_rgba(150,94,199,0.2)]'>
					<h3 className='mt-4 max-w-[85%] origin-left font-medium text-3xl leading-[1.1] tracking-tight transition-transform duration-300 group-hover:scale-[1.02]'>
						nós utilizamos
						<br />
						as tecnologias
						<br />
						mais recentes
					</h3>

					<div className='mt-auto flex w-full items-end justify-between'>
						<div className='flex h-12 w-12 items-center justify-center rounded-full border border-background/15 transition-colors hover:bg-background hover:text-foreground'>
							<MoveUpRight className='h-5 w-5' />
						</div>
						<div className='flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-background/80'>
							<Globe className='h-5 w-5' />
						</div>
					</div>
				</div>
			</motion.div>

			{/* Col 4 */}
			<motion.div
				variants={cardVariants}
				className='flex h-[420px] flex-col gap-4'
			>
				<div className='flex w-full items-center justify-start gap-2 font-medium text-sm'>
					<span className='text-foreground/80'>[branding]</span>
				</div>
				<div className='group relative flex h-[52%] cursor-pointer items-center justify-center rounded-[2.5rem] border border-foreground/15 bg-background transition-colors hover:border-foreground/40'>
					<div className='flex h-[60px] w-[60px] scale-90 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
						<Maximize className='h-5 w-5 text-foreground/70' />
					</div>
				</div>
				<div className='group relative flex flex-1 cursor-pointer flex-col justify-between rounded-[2.5rem] border border-foreground/15 bg-background p-7 transition-colors hover:border-foreground/40'>
					<p className='font-medium text-[13px] text-foreground/80 leading-tight'>
						uma identidade de marca forte
						<br />é a base de...
					</p>
					<div className='flex items-center gap-3 text-foreground'>
						<span className='font-normal text-[28px] tracking-tight'>№1</span>
						<span className='max-w-[100px] text-[10px] text-foreground/60 uppercase leading-[1.1]'>
							em proporção
							<br />
							criativa global
						</span>
					</div>
				</div>
			</motion.div>
		</motion.section>
	);
}
