"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 5);
  });

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-primary border-b border-gold shadow-md backdrop-blur-sm" 
          : "bg-primary border-b border-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-1 md:py-2 flex justify-between items-center">
        {/* Raw Logo - No circular mask, no text */}
        <Link href="/" className="flex items-center">
          <div className="relative w-64 sm:w-96 h-16 sm:h-24 transition-all duration-300">
            <Image 
              src="/logo.png" 
              alt="Stela Franzen Seguros Logo" 
              fill 
              className="object-contain object-left" 
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-serif font-medium tracking-tight">
          <Link href="/" className={`transition-all duration-300 ${pathname === '/' ? 'text-gold underline underline-offset-8 decoration-gold/70' : 'text-white hover:text-gold'}`}>Início</Link>
          <Link href="/produtos" className={`transition-all duration-300 ${pathname === '/produtos' ? 'text-gold underline underline-offset-8 decoration-gold/70' : 'text-white hover:text-gold'}`}>Produtos</Link>
          <Link href="/sinistro" className={`transition-all duration-300 ${pathname === '/sinistro' ? 'text-gold underline underline-offset-8 decoration-gold/70' : 'text-white hover:text-gold'}`}>Central de Sinistro</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/cotacao" className="px-6 py-2 border border-gold text-gold font-sans text-sm uppercase tracking-widest transition-all duration-300 hover:bg-gold hover:text-primary">
            Solicitar Proposta
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary w-full border-t border-gold/20 absolute top-full left-0 flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 shadow-xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`font-serif text-lg transition-all ${pathname === '/' ? 'text-gold underline underline-offset-8 decoration-gold/70' : 'text-white hover:text-gold'}`}>Início</Link>
          <Link href="/produtos" onClick={() => setMobileMenuOpen(false)} className={`font-serif text-lg transition-all ${pathname === '/produtos' ? 'text-gold underline underline-offset-8 decoration-gold/70' : 'text-white hover:text-gold'}`}>Produtos</Link>
          <Link href="/sinistro" onClick={() => setMobileMenuOpen(false)} className={`font-serif text-lg transition-all ${pathname === '/sinistro' ? 'text-gold underline underline-offset-8 decoration-gold/70' : 'text-white hover:text-gold'}`}>Central de Sinistro</Link>
          <Link href="/cotacao" onClick={() => setMobileMenuOpen(false)} className="border border-gold text-gold text-center py-3 uppercase text-sm font-bold tracking-widest hover:bg-gold hover:text-primary">
            Solicitar Proposta
          </Link>
        </div>
      )}
    </header>
  );
}
