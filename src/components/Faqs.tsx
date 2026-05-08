'use client';

import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { type RefObject, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
	question: string;
	answer: string;
}

const faqs: FAQItem[] = [
	{
		question: 'Quanto tempo demora para criar um projeto?',
		answer:
			'Um projeto completo, desde o briefing ate a entrega final com animacoes avancadas e otimizacao de performance, geralmente leva de 4 a 8 semanas, dependendo da complexidade do escopo.',
	},
	{
		question: 'Quais tecnologias voce utiliza no desenvolvimento?',
		answer:
			'Minha stack e focada no que ha de mais moderno: Next.js (React) no front-end, TailwindCSS para estilizacao, e GSAP / Lenis / Framer Motion para animacoes super fluidas. No backend, uso Node.js com Fastify e Prisma.',
	},
	{
		question: 'O codigo final sera meu?',
		answer:
			'Sim, 100%. Ao final do projeto, todos os assets de design e o repositorio de codigo fonte sao transferidos diretamente para voce ou para a conta da sua empresa.',
	},
	{
		question: 'Voce faz manutencao depois do site estar online?',
		answer:
			'Com certeza. Ofereco pacotes de pos-venda e manutencao (Technical SEO, atualizacoes de seguranca e integracoes) para garantir que sua plataforma continue funcionando perfeitamente.',
	},
	{
		question: 'Como funciona a comunicacao durante o projeto?',
		answer:
			'Criamos um canal direto e exclusivo de comunicacao (via Slack ou WhatsApp). Temos reunioes de alinhamento e demonstracoes visuais ao fim de cada milestone para que voce acompanhe cada detalhe do processo.',
	},
];

export default function Faqs() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	const toggleOpen = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	useEffect(() => {
		if (!sectionRef.current || !headingRef.current) {
			return;
		}

		const ctx = gsap.context(
			() => {
				const heading = headingRef.current;

				if (!heading) {
					return;
				}

				const words = heading.innerText.split(' ');

				heading.innerHTML = words
					.map(
						(word) =>
							`<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">
									<span
										class="gsap-faq-word"
										style="display:inline-block;transform:translateY(110%);"
									>
										${word}&nbsp;
									</span>
								</span>`,
					)
					.join('');

				gsap.to('.gsap-faq-word', {
					y: 0,
					duration: 0.9,
					stagger: 0.05,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						once: true,
					},
				});
			},
			sectionRef as RefObject<HTMLElement>,
		);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id='faqs'
			className='relative mt-8 w-full overflow-hidden border-border border-t py-16 md:mt-12 md:py-32'
		>
			<div className='relative z-10 px-4 md:px-0'>
				<div className='mb-12 md:mb-16'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest md:mb-6'>
						Duvidas
					</span>

					<h3
						ref={headingRef}
						className='max-w-2xl font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Perguntas{' '}
						<span className='font-serif text-primary italic font-normal'>
							Frequentes
						</span>
					</h3>
				</div>

				<div className='flex flex-col border-border border-t'>
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index;

						return (
							<motion.div
								key={faq.question}
								initial={{
									opacity: 0,
									y: 15,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
								}}
								transition={{
									duration: 0.5,
									delay: index * 0.08,
								}}
								className='border-border border-b'
							>
								<button
									type='button'
									onClick={() => toggleOpen(index)}
									className='group flex w-full items-center justify-between py-5 text-left focus:outline-none md:py-6'
								>
									<span
										className={`pr-4 text-base font-medium transition-colors md:text-lg lg:text-xl ${
											isOpen
												? 'text-foreground'
												: 'text-muted-foreground group-hover:text-foreground'
										}`}
									>
										{faq.question}
									</span>

									<div
										className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
											isOpen
												? 'rotate-180 border-primary bg-primary text-primary-foreground'
												: 'border-border text-muted-foreground group-hover:border-foreground group-hover:text-foreground'
										}`}
									>
										<ChevronDown size={18} />
									</div>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{
												height: 0,
												opacity: 0,
											}}
											animate={{
												height: 'auto',
												opacity: 1,
											}}
											exit={{
												height: 0,
												opacity: 0,
											}}
											transition={{
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}
											className='overflow-hidden'
										>
											<div className='pb-6 pr-4 text-muted-foreground text-sm leading-relaxed md:pr-12 md:text-base'>
												{faq.answer}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
