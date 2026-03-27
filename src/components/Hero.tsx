"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-primary pt-32 pb-16 w-full border-b border-gold/40 shadow-2xl overflow-hidden">
      {/* 30 Years Gold Seal */}
      <div className="absolute top-40 right-16 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center justify-center w-40 h-40 rounded-full border border-gold bg-primary shadow-[0_0_30px_rgba(176,145,77,0.2)] text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 -left-[150%] w-[50%] h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent -skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span className="text-gold font-serif text-5xl font-bold leading-none relative z-10">30</span>
          <span className="text-white font-sans text-xs uppercase tracking-widest mt-2 relative z-10 font-medium">Anos</span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-gold w-5 h-5" />
            <span className="font-sans text-gold text-xs uppercase tracking-[0.3em] font-bold">Autoridade Nacional</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6 sm:mb-8 font-bold">
            Proteção em <span className="text-gold">Saúde</span> e Patrimônio.
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-light">
            Soluções completas com excelência técnica para proteger o que mais importa. Tradição de três décadas protagonizando a sua segurança sob as mais rigorosas exigências do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/cotacao" className="px-10 py-5 border border-gold text-gold font-bold rounded-sm hover:bg-gold hover:text-primary transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-sm bg-primary/20">
              Solicitar Proposta
              <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="aspect-[4/5] overflow-hidden border border-gold/40 shadow-2xl relative">
            <img src="/familia.jpg" alt="Família Segura" className="w-full h-full object-cover object-center contrast-[1.05]" />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          </div>
          <div className="absolute -bottom-8 -left-8 bg-primary border border-gold/40 p-8 shadow-2xl max-w-xs">
            <p className="text-white font-serif italic text-xl leading-snug">
               &quot;Compromisso absoluto com o legado que você constrói todos os dias.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
