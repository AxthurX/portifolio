'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function QuemSomos() {
	const sectionRef = useRef(null);
	const headingRef = useRef(null);
	const textRef = useRef(null);
	const text2Ref = useRef(null);
	const metricsRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// --- Heading reveal (word by word) ---
			const heading = headingRef.current;
			if (heading) {
				const originalHTML = heading.innerHTML;
				const words = heading.innerText.split(' ');
				heading.innerHTML = words
					.map(
						(w) =>
							`<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-word" style="display:inline-block;transform:translateY(110%);">${w}</span></span>`,
					)
					.join(' ');

				gsap.to('.gsap-word', {
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.04,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						once: true,
					},
				});
			}

			// --- Paragraph reveals ---
			gsap.fromTo(
				textRef.current,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: textRef.current,
						start: 'top 85%',
						once: true,
					},
				},
			);
			gsap.fromTo(
				text2Ref.current,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					delay: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: text2Ref.current,
						start: 'top 88%',
						once: true,
					},
				},
			);

			// --- Counters ---
			const counters = [
				{ el: '#counter-exp', end: 10, suffix: '+' },
				{ el: '#counter-proj', end: 50, suffix: '+' },
				{ el: '#counter-entrega', end: 100, suffix: '%' },
			];
			counters.forEach(({ el, end, suffix }) => {
				const target = document.querySelector(el);
				if (!target) return;
				const obj = { val: 0 };
				gsap.to(obj, {
					val: end,
					duration: 1.6,
					ease: 'power2.out',
					onUpdate: () => {
						target.innerText = Math.floor(obj.val) + suffix;
					},
					scrollTrigger: { trigger: target, start: 'top 90%', once: true },
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='quem-somos'
			className='relative mt-16 flex min-h-[80vh] w-full flex-col border-foreground/10 border-t md:mt-24 md:flex-row'
		>
			{/* Vertical divider */}
			<div className='absolute top-0 bottom-0 left-1/2 hidden w-px bg-foreground/10 md:block' />

			{/* Left */}
			<div className='flex w-full flex-col justify-between border-foreground/10 border-b p-6 md:w-1/2 md:border-r md:border-b-0 md:p-16 lg:p-20 xl:p-28'>
				<div>
					<h2 className='mb-8 font-black text-foreground/35 text-xs uppercase tracking-[0.35em] md:mb-12'>
						Quem Somos
					</h2>
					<h3
						ref={headingRef}
						className='font-black text-4xl leading-tight tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl'
					>
						Desafiamos o{' '}
						<span className='font-normal font-serif text-[#965EC7] italic'>
							ordinário
						</span>{' '}
						para construir o extraordinário.
					</h3>
				</div>
			</div>

			{/* Right */}
			<div className='flex w-full flex-col justify-end p-6 md:w-1/2 md:p-16 lg:p-20 xl:p-28'>
				<div className='max-w-xl md:ml-auto'>
					<p
						ref={textRef}
						className='mb-6 font-light text-foreground/70 text-lg leading-relaxed md:mb-10 md:text-xl lg:text-2xl'
						style={{ opacity: 0 }}
					>
						A WHYS é um estúdio digital focado em criar experiências imersivas.
						Nós unimos um design meticuloso, pixel-perfect, com tecnologias de
						alta performance para entregar resultados que não apenas funcionam,
						mas impressionam.
					</p>
					<p
						ref={text2Ref}
						className='font-light text-foreground/70 text-lg leading-relaxed md:text-xl lg:text-2xl'
						style={{ opacity: 0 }}
					>
						Nossa missão é elevar o patamar de marcas ambiciosas através de
						identidades visuais sofisticadas e interfaces interativas.
					</p>

					<div
						ref={metricsRef}
						className='mt-12 flex gap-8 border-foreground/10 border-t pt-8 md:mt-20 md:gap-10 md:pt-10'
					>
						<div>
							<div
								id='counter-exp'
								className='mb-2 font-black text-5xl tracking-tight md:mb-3 md:text-6xl'
							>
								0+
							</div>
							<div className='font-black text-foreground/35 text-xs uppercase tracking-widest'>
								Anos de XP
							</div>
						</div>
						<div>
							<div
								id='counter-proj'
								className='mb-2 font-black text-5xl tracking-tight md:mb-3 md:text-6xl'
							>
								0+
							</div>
							<div className='font-black text-foreground/35 text-xs uppercase tracking-widest'>
								Projetos
							</div>
						</div>
						<div>
							<div
								id='counter-entrega'
								className='mb-2 font-black text-5xl text-[#965EC7] tracking-tight md:mb-3 md:text-6xl'
							>
								0%
							</div>
							<div className='font-black text-foreground/35 text-xs uppercase tracking-widest'>
								Entrega
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
