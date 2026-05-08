"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Rocket, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCIAS = [
  { 
    id: "01", 
    title: "Desenvolvedor Frontend",
    empresa: "Empresa Atual",
    periodo: "2023 - Presente",
    desc: "Desenvolvimento de interfaces modernas com React, Next.js e TypeScript. Foco em performance e acessibilidade.",
    Icon: Briefcase 
  },
  { 
    id: "02", 
    title: "Desenvolvedor Full Stack",
    empresa: "Freelancer",
    periodo: "2022 - 2023",
    desc: "Criacao de aplicacoes web completas para clientes diversos, desde landing pages ate sistemas complexos.",
    Icon: Code2 
  },
  { 
    id: "03", 
    title: "Estagiario de Desenvolvimento",
    empresa: "Startup Tech",
    periodo: "2021 - 2022",
    desc: "Primeiro contato profissional com desenvolvimento web, aprendendo boas praticas e metodologias ageis.",
    Icon: Rocket 
  },
  { 
    id: "04", 
    title: "Formacao Academica",
    empresa: "Universidade",
    periodo: "2019 - 2023",
    desc: "Graduacao em Ciencia da Computacao com foco em engenharia de software e desenvolvimento web.",
    Icon: GraduationCap 
  },
  { 
    id: "05", 
    title: "Certificacoes",
    empresa: "Cursos e Especializacoes",
    periodo: "Continuo",
    desc: "Aprendizado constante atraves de cursos, bootcamps e certificacoes em tecnologias modernas.",
    Icon: Award 
  },
];

export default function Experiencias() {
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
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-exp-word" style="display:inline-block;transform:translateY(110%);">${w}&nbsp;</span></span>`
        )
        .join("");

      gsap.to(".gsap-exp-word", {
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
    <section ref={sectionRef} id="experiencias" className="w-full py-16 md:py-40 border-t border-foreground/10 relative overflow-hidden">
      {/* Title */}
      <div className="relative z-10 text-left mb-16 md:mb-32 px-4">
        <h2 className="text-xs uppercase tracking-[0.35em] font-black text-foreground/35 mb-4 md:mb-6">Minha Trajetoria</h2>
        <h3
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em]"
        >
          Experiencias que moldaram minha <span className="font-serif italic font-normal text-[#965EC7]">carreira</span>
        </h3>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/10 -translate-x-1/2 hidden md:block" />

        <div className="flex flex-col gap-10 md:gap-40 relative">
          {EXPERIENCIAS.map((exp, index) => {
            const isEven = index % 2 === 0;
            const { Icon } = exp;
            return (
              <div
                key={exp.id}
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
                      {/* Icon and period */}
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <div className="flex items-center gap-4">
                          <div className="
                            w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/20
                            flex items-center justify-center
                            text-foreground
                            group-hover:bg-[#965EC7]
                            group-hover:border-[#965EC7]
                            group-hover:text-white
                            transition-all duration-300
                          ">
                            <Icon className="w-6 h-6" strokeWidth={1.5} />
                          </div>
                          <span className="text-[#965EC7] font-serif italic text-2xl md:text-3xl">{exp.id}</span>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-foreground/40 font-medium">{exp.periodo}</span>
                      </div>

                      <h4 className="text-2xl md:text-3xl font-light mb-1 md:mb-2 text-foreground">{exp.title}</h4>
                      <p className="text-sm text-[#965EC7] font-medium mb-3 md:mb-4">{exp.empresa}</p>
                      <p className="text-foreground/60 text-sm md:text-base leading-relaxed tracking-wide">{exp.desc}</p>
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
