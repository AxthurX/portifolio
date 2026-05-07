"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const ButtonWithIcon = () => {
  return (
    <Button className="relative text-[10px] sm:text-xs tracking-widest uppercase font-bold rounded-full h-10 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-white text-black hover:bg-white/90">
      <span className="relative z-10 transition-all duration-500">
        Trabalhe Conosco
      </span>
      <div className="absolute right-1 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={14} />
      </div>
    </Button>
  );
};
