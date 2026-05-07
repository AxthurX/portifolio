"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, LayoutTemplate, Users, Code, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Steps use icon NAMES (not JSX) so color can be inherited from parent
const STEPS = [
  { id: "01", title: "Briefing",              desc: "Entendimento profundo do seu negócio, mercado e objetivos.",                        Icon: FileText },
  { id: "02", title: "Wireframe & Design",   desc: "Estruturação das telas, UX e aplicação da alta fidelidade visual.",                 Icon: LayoutTemplate },
  { id: "03", title: "Reuniões Constantes",  desc: "Alinhamentos contínuos para garantir que cada pixel exale excelência.",              Icon: Users },
  { id: "04", title: "Implementação",        desc: "Desenvolvimento técnico robusto com animações e performance extrema.",               Icon: Code },
  { id: "05", title: "Pós-Venda",           desc: "Cuidado e aprimoramento contínuo após o lançamento do projeto.",                     Icon: Wrench },
];

export default function Processos() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;

      const words = heading.innerText.split(" ");
      heading.innerHTML = words
        .map(
          (w) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-proc-word" style="display:inline-block;transform:translateY(110%);">${w}&nbsp;</span></span>`
        )
        .join("");

      gsap.to(".gsap-proc-word", {
        y: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="processos" className="w-full py-16 md:py-40 border-t border-foreground/10 relative overflow-hidden">
      {/* Title — LEFT aligned */}
      <div className="relative z-10 text-left mb-16 md:mb-32 px-4">
        <h2 className="text-xs uppercase tracking-[0.35em] font-black text-foreground/35 mb-4 md:mb-6">Nossa Metodologia</h2>
        <h3
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em]"
        >
          O caminho para o <span className="font-serif italic font-normal text-[#965EC7]">sucesso</span>
        </h3>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/10 -translate-x-1/2 hidden md:block" />

        <div className="flex flex-col gap-10 md:gap-40 relative">
          {STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            const { Icon } = step;
            return (
              <div
                key={step.id}
                className={`w-full flex flex-col md:flex-row md:justify-between items-start md:items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} relative`}
              >
                {/* Branch line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: isEven ? "right" : "left" }}
                  className={`absolute top-1/2 -translate-y-1/2 w-[calc(50%-2rem)] h-px bg-[#965EC7]/40 hidden md:block ${isEven ? "left-8" : "right-8"}`}
                />

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-[#965EC7] z-20 hidden md:block"
                />

                {/* Card */}
                <div className="w-full md:w-[calc(50%-4rem)] z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-[1.5rem] md:rounded-[2rem] border border-foreground/8 p-6 md:p-8 group relative overflow-hidden cursor-default
                               hover:border-[#965EC7]/40 transition-colors duration-500"
                    style={{ background: "var(--surface)" }}
                  >
                    {/* Purple glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#965EC7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Icon circle — fill changes on hover; icon inherits currentColor */}
                      <div className="flex items-center gap-4 mb-6 md:mb-8">
                        <div className="
                          w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/20
                          flex items-center justify-center
                          text-foreground                        /* default icon color */
                          group-hover:bg-[#965EC7]               /* purple fill on hover */
                          group-hover:border-[#965EC7]
                          group-hover:text-white                 /* icon turns white on hover */
                          transition-all duration-300
                        ">
                          {/* Icon uses currentColor — inherits text-foreground / group-hover:text-white */}
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <span className="text-[#965EC7] font-serif italic text-2xl md:text-3xl">{step.id}</span>
                      </div>

                      <h4 className="text-2xl md:text-3xl font-light mb-3 md:mb-4 text-foreground">{step.title}</h4>
                      <p className="text-foreground/60 text-sm md:text-base leading-relaxed tracking-wide">{step.desc}</p>
                    </div>
                  </motion.div>
                </div>

                <div className="hidden md:block w-[calc(50%-4rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
