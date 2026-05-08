'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from './button';

export const ButtonWithIcon = () => {
	return (
		<Button className='group relative h-10 w-fit cursor-pointer overflow-hidden rounded-full bg-white p-1 ps-6 pe-14 font-bold text-[10px] text-black uppercase tracking-widest transition-all duration-500 hover:bg-white/90 hover:ps-14 hover:pe-6 sm:text-xs'>
			<span className='relative z-10 transition-all duration-500'>
				Trabalhe Conosco
			</span>
			<div className='absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45'>
				<ArrowUpRight size={14} />
			</div>
		</Button>
	);
};
