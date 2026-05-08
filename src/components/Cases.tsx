"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const portfolioCases = [
  {
    id: "01",
    client: "ELEVATE TECH",
    category: "Branding & Web Design",
    title: "Redefinindo o futuro do setor financeiro",
    image: "/cases/case-1.jpg"
  },
  {
    id: "02",
    client: "AURA BEAUTY",
    category: "E-Commerce",
    title: "Uma jornada de compra imersiva global",
    image: "/cases/case-2.jpg"
  },
  {
    id: "03",
    client: "NXT MOBILITY",
    category: "UX/UI Design",
    title: "Mobilidade urbana através de dados",
    image: "/cases/case-3.jpg"
  },
  {
    id: "04",
    client: "LUMINA ART",
    category: "Digital Studio",
    title: "Experiência interativa para galerias de arte",
    image: "/cases/case-4.jpg"
  }
];

function CaseCard({ projeto }) {
  return (
    <div className="group relative h-[60vh] md:h-[70vh] w-full md:w-[60vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-sm bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between">
      {/* Image background placeholder */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#111]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[#151515] group-hover:scale-105 transition-transform duration-700 ease-out z-0" />
      </div>

      {/* Top Meta Area */}
      <div className="relative z-20 flex justify-between items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#965EC7] mb-2 block">
            {projeto.category}
          </span>
          <span className="text-sm font-medium tracking-wider text-white/70">
            {projeto.client}
          </span>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
          <ArrowUpRight strokeWidth={1.5} className="w-5 h-5 text-white group-hover:text-black transition-colors" />
        </div>
      </div>

      {/* Bottom Title Area */}
      <div className="relative z-20 flex items-end justify-between">
        <h4 className="text-2xl md:text-5xl xl:text-6xl font-light tracking-tight max-w-[80%] leading-[1.1]">
          {projeto.title}
        </h4>
        <div className="font-serif italic text-5xl md:text-8xl lg:text-9xl text-white/10 font-bold leading-none -mb-4 tracking-tighter">
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
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // --- MOBILE: Simple vertical layout ---
  if (isMobile) {
    return (
      <section id="cases" className="w-full bg-black text-white py-16 px-4">
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.35em] font-black text-white/35 mb-3">Nossos Cases</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">Projetos <span className="font-serif italic font-normal text-[#965EC7]">Recentes</span></h3>
        </div>
        <div className="flex flex-col gap-6">
          {portfolioCases.map((projeto) => (
            <motion.div
              key={projeto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseCard projeto={projeto} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // --- DESKTOP: Horizontal scroll hijacking ---
  return (
    <section
      id="cases"
      ref={targetRef}
      className="relative h-[400vh] bg-black text-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-4 md:left-12 z-20">
          <h2 className="text-xs uppercase tracking-[0.35em] font-black text-white/35 mb-2">Nossos Cases</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">Projetos <span className="font-serif italic font-normal text-[#965EC7]">Recentes</span></h3>
        </div>

        <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-4 md:px-12 pl-[5vw] md:pl-[20vw] pt-24">
          {portfolioCases.map((projeto) => (
            <CaseCard key={projeto.id} projeto={projeto} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
