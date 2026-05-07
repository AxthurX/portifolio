"use client";

import { ArrowUpRight, Plus, Maximize, MoveUpRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.8 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 pb-12"
    >
      {/* Col 1 */}
      <motion.div variants={cardVariants} className="flex flex-col gap-4 h-[420px]">
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="text-foreground/80">[design criativo]</span>
          <div className="w-5 h-5 rounded-full border border-foreground/30 flex items-center justify-center">
            <Plus className="w-3 h-3 text-foreground/50" />
          </div>
        </div>
        <div className="relative border border-foreground/15 rounded-[2.5rem] bg-background p-7 flex flex-col justify-between h-[65%] group hover:border-foreground/40 transition-colors cursor-pointer">
          <p className="text-[13px] text-foreground/80 leading-tight max-w-[85%] font-medium">
            nos orgulhamos de criar<br/>designs visualmente atraentes q...
          </p>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-foreground/10 bg-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
             <Maximize className="w-5 h-5 text-foreground/70" />
          </div>

          <div className="flex items-end justify-between w-full">
            <div className="flex items-baseline gap-2 text-foreground">
              <span className="text-5xl font-normal tracking-tight">24</span>
              <span className="text-xs text-foreground/60 tracking-wider">projetos</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-background text-foreground/80 transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="border border-foreground/15 rounded-t-[2rem] rounded-b-xl bg-background h-[90px] mt-auto w-[65%] hover:border-foreground/40 transition-colors cursor-pointer"></div>
      </motion.div>

      {/* Col 2 */}
      <motion.div variants={cardVariants} className="flex flex-col gap-4 h-[420px]">
        <div className="flex items-center gap-3 text-sm font-medium pr-1">
          <span className="text-foreground/80">[ux/ui]</span>
          <div className="w-5 h-5 rounded-full border border-foreground/30 flex items-center justify-center">
            <Plus className="w-3 h-3 text-foreground/50" />
          </div>
        </div>
        <div className="relative border border-foreground/15 rounded-[2.5rem] bg-background p-7 flex flex-col justify-between h-[52%] group hover:border-foreground/40 transition-colors cursor-pointer">
          <p className="text-[13px] text-foreground/80 leading-tight font-medium">
            entendemos a importância de<br/>projetos centrados no usuário...
          </p>
          
          <div className="flex items-end justify-between w-full">
            <div className="flex items-baseline gap-2 text-foreground">
              <span className="text-5xl font-normal tracking-tight">150</span>
              <span className="text-[10px] text-foreground/60 flex items-center pt-2 leading-none uppercase">clientes</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-background text-foreground/80 transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="border border-foreground/15 rounded-[2.5rem] bg-background flex-1 w-full relative group cursor-pointer hover:border-foreground/40 transition-colors">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-foreground/10 bg-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
             <Maximize className="w-5 h-5 text-foreground/70" />
          </div>
        </div>
      </motion.div>

      {/* Col 3 */}
      <motion.div variants={cardVariants} className="flex flex-col gap-4 h-[420px]">
        <div className="flex items-center gap-2 text-sm justify-start pl-2 font-medium">
          <span className="text-foreground/80">/sobre processos</span>
        </div>
        <div className="relative border border-background/50 rounded-[2.5rem] bg-foreground text-background p-8 flex flex-col justify-between h-full group hover:shadow-[0_0_40px_rgba(150,94,199,0.2)] transition-shadow cursor-pointer">
          <h3 className="text-3xl font-medium tracking-tight leading-[1.1] mt-4 max-w-[85%] group-hover:scale-[1.02] origin-left transition-transform duration-300">
            nós utilizamos<br/>as tecnologias<br/>mais recentes
          </h3>
          
          <div className="flex items-end justify-between w-full mt-auto">
            <div className="w-12 h-12 rounded-full border border-background/15 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors">
              <MoveUpRight className="w-5 h-5" />
            </div>
            <div className="w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center hover:bg-background/80 transition-colors">
              <Globe className="w-5 h-5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Col 4 */}
      <motion.div variants={cardVariants} className="flex flex-col gap-4 h-[420px]">
        <div className="flex items-center gap-2 text-sm justify-start w-full font-medium">
          <span className="text-foreground/80">[branding]</span>
        </div>
        <div className="relative border border-foreground/15 rounded-[2.5rem] bg-background flex items-center justify-center h-[52%] group hover:border-foreground/40 cursor-pointer transition-colors">
           <div className="w-[60px] h-[60px] rounded-full border border-foreground/10 bg-foreground/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
             <Maximize className="w-5 h-5 text-foreground/70" />
          </div>
        </div>
        <div className="relative border border-foreground/15 rounded-[2.5rem] bg-background p-7 flex flex-col justify-between flex-1 group hover:border-foreground/40 cursor-pointer transition-colors">
          <p className="text-[13px] text-foreground/80 leading-tight font-medium">
            uma identidade de marca forte<br/>é a base de...
          </p>
          <div className="flex items-center gap-3 text-foreground">
             <span className="text-[28px] font-normal tracking-tight">№1</span>
             <span className="text-[10px] text-foreground/60 uppercase max-w-[100px] leading-[1.1]">em proporção<br/>criativa global</span>
          </div>
        </div>
      </motion.div>

    </motion.section>
  );
}
