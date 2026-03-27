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
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculamos o limite exato de arraste pro elástico do framer motion não vazar
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-24 bg-surface-dim overflow-hidden w-full">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <h2 className="font-serif text-3xl text-primary text-center">Trabalhamos com as Melhores Companhias do Mercado</h2>
      </div>
      
      {/* Mobile Drag vs Desktop Auto-scroll */}
      <div className="relative flex py-10 group overflow-hidden w-full" ref={carouselRef}>
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex md:animate-marquee md:group-hover:paused whitespace-nowrap gap-4 items-center w-max cursor-grab active:cursor-grabbing"
        >
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...logos, ...logos].map((logo, index) => (
            <motion.div key={index} className="flex items-center justify-center shrink-0 px-4 pointer-events-none md:pointer-events-auto">
              <Image
                src={`/seguradoras/${logo}`}
                alt={`Seguradora Parceira ${index}`}
                width={140}
                height={70}
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
