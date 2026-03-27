"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const logos = [
  "Allianz.png", "Bradesco.png", "Capemisa.png", "Excelsior-20seguros.png",
  "HDI.png", "Hapvida.png", "Notredame-20Interm-C3-A9dica.png", "Porto-20atualizado.png",
  "Santa-casa-sjc.png", "Suhai.png", "Sulamerica-20atualizado.png", "Tokio-20atualizado.png",
  "amil-novo.png", "azul-branco.png", "itau.png", "mapfre.png", "pottencial.png",
  "prevent-20senior-20.png", "s-C3-A3o-francisco.png", "yelum-20-1.png"
];

export default function Marquee() {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);

  useEffect(() => {
    // Calculamos a largura Exata de UM UNICO bloco (já que replicamos 4 vezes)
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth / 4);
    }
  }, []);

  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;
    
    let currentX = baseX.get();

    // Auto-scroll contínuo quando não estamos mexendo
    if (!isDragging.current && !isHovered) {
      currentX += -0.8 * (delta / 16); // velocidade constante baseada no framerate da GPU
    }

    // A mágica: se passar da fronteira, voltamos pro começo matematicamente (Módulo)
    let wrappedX = ((currentX % contentWidth) + contentWidth) % contentWidth;
    wrappedX = wrappedX - contentWidth;

    baseX.set(wrappedX);
  });

  return (
    <section 
      className="py-24 bg-surface-dim overflow-hidden w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <h2 className="font-serif text-3xl text-primary text-center">Trabalhamos com as Melhores Companhias do Mercado</h2>
      </div>
      
      <div className="relative flex py-10 overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={containerRef}>
        <motion.div 
          ref={contentRef}
          style={{ x: baseX }}
          drag="x"
          onDragStart={() => isDragging.current = true}
          onDragEnd={() => isDragging.current = false}
          className="flex whitespace-nowrap gap-4 items-center w-max"
        >
          {/* Replicamos 4 vezes para que o usuário numa tela absurdamente larga nunca veja o fim antes do loop invisível */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex items-center justify-center shrink-0 px-4 pointer-events-none md:pointer-events-auto">
              <Image
                src={`/seguradoras/${logo}`}
                alt={`Seguradora Parceira ${index}`}
                width={140}
                height={70}
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none"
                draggable="false"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
