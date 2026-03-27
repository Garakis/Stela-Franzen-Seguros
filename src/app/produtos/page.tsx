"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Heart, Building, Car, Briefcase, DollarSign, ShieldAlert, Star } from "lucide-react";

// Destaques (Top Carousel)
const highlights = [
  { id: 1, title: "Seguro Auto Porto", type: "Afiliado", icon: Car, desc: "Proteção completa para seu veículo com os melhores serviços.", link: "#" },
  { id: 2, title: "Seguro Viagem", type: "Afiliado", icon: Briefcase, desc: "Tranquilidade internacional ou nacional com coberturas exclusivas.", link: "#" },
  { id: 3, title: "Equipamentos Portáteis", type: "Afiliado", icon: ShieldAlert, desc: "Seu celular, tablet e notebook protegidos contra falhas, quebras e roubos.", link: "#" },
];

const products = [
  // Saúde & Odonto
  { id: 101, title: "Saúde Empresarial", category: "Saúde", icon: Heart, desc: "Planos de saúde robustos para pequenas, médias e grandes empresas." },
  { id: 102, title: "Odonto Premium", category: "Saúde", icon: Heart, desc: "Acesso às melhores clínicas odontológicas do país." },
  { id: 103, title: "Saúde Ocupacional", category: "Saúde", icon: Briefcase, desc: "Gestão completa em medicina e segurança do trabalho (PCMSO/PGR)." },
  { id: 104, title: "Petlove Saúde", category: "Saúde", icon: Heart, desc: "O cuidado que seu pet merece com ampla rede credenciada." },
  // Vida & Previdência
  { id: 201, title: "Vida Individual", category: "Vida", icon: ShieldAlert, desc: "Segurança financeira para sua família em caso de imprevistos." },
  { id: 202, title: "Vida Mulher", category: "Vida", icon: Heart, desc: "Proteção específica com coberturas adicionais para diagnósticos graves." },
  { id: 203, title: "Previdência", category: "Vida", icon: DollarSign, desc: "Planejamento sucessório e garantia de renda sustentável no futuro." },
  { id: 204, title: "Previdência Infantil", category: "Vida", icon: DollarSign, desc: "Construa desde cedo o futuro financeiro e educacional dos seus filhos." },
  { id: 205, title: "Acidentes Escolares", category: "Vida", icon: ShieldAlert, desc: "Proteção completa para alunos dentro e fora do ambiente escolar." },
  // Negócios & Empresas
  { id: 301, title: "Seguro Garantia", category: "Empresa", icon: Briefcase, desc: "Garantias contratuais para obras, licitações e execuções fiscais." },
  { id: 302, title: "Concessionárias", category: "Empresa", icon: Car, desc: "Proteção especializada do pátio ao test-drive." },
  { id: 303, title: "Academias", category: "Empresa", icon: Building, desc: "Cobertura de responsabilidade civil e patrimonial para o setor fitness." },
  { id: 304, title: "Clínicas", category: "Empresa", icon: Heart, desc: "Apoio a hospitais, clínicas e consultórios médicos contra sinistros." },
  { id: 305, title: "Escolas", category: "Empresa", icon: Building, desc: "Proteção compreensiva focada em instituições de ensino." },
  { id: 306, title: "Hotéis/Pousadas", category: "Empresa", icon: Building, desc: "Garantia patrimonial e responsabilidade civil de hóspedes." },
  // Automóvel
  { id: 401, title: "Auto Empresarial", category: "Automóvel", icon: Car, desc: "Proteção contínua para sua frota e diretoria executiva." },
  { id: 402, title: "Táxi", category: "Automóvel", icon: Car, desc: "Cobertura ágil para não deixar o motorista parado." },
  { id: 403, title: "Auto Mulher", category: "Automóvel", icon: Car, desc: "Serviços e franquias reduzidas especialmente formatadas para elas." },
  { id: 404, title: "Seguro Caminhão", category: "Automóvel", icon: Car, desc: "Tranquilidade para a carga, o veículo e o caminhoneiro na estrada." },
  { id: 405, title: "Bike", category: "Automóvel", icon: Car, desc: "Mais que um esporte, um patrimônio coberto contra roubo e quebra." },
  // Soluções Financeiras
  { id: 501, title: "Consórcio Imóvel/Auto", category: "Soluções Financeiras", icon: DollarSign, desc: "Expanda seu patrimônio sem pagar juros abusivos." },
  { id: 502, title: "Cartão de Crédito", category: "Soluções Financeiras", icon: DollarSign, desc: "Benefícios atrelados às suas apólices e isenção de anuidades." },
  { id: 503, title: "Financiamento", category: "Soluções Financeiras", icon: DollarSign, desc: "Linhas de crédito para acelerar suas aquisições ou fluxo de caixa." },
  { id: 504, title: "Capital de Giro", category: "Soluções Financeiras", icon: Briefcase, desc: "Infusão de recursos líquidos para sustentar o crescimento corporativo." },
];

const categories = ["Todos", "Saúde", "Vida", "Empresa", "Automóvel", "Soluções Financeiras"];

function CatalogContent() {
  const [activeTab, setActiveTab] = useState("Todos");
  const searchParams = useSearchParams();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      const matched = categories.find(c => c.toLowerCase() === cat.toLowerCase() || c.toLowerCase().includes(cat.toLowerCase()));
      if (matched) setActiveTab(matched);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(p => activeTab === "Todos" || p.category === activeTab);

  return (
    <div className="w-full bg-white min-h-screen pt-32 pb-24 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex-grow">
        
        <div className="text-center mb-12">
          <span className="font-sans text-primary text-xs uppercase tracking-widest mb-4 block font-bold">Catálogo Direto</span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold">Destaques Afiliados</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* 1. Highlight Native Responsive Cards */}
        <div className="w-full mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex lg:grid lg:grid-cols-3 gap-6 pb-8 overflow-x-auto snap-x snap-mandatory pt-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {highlights.map(product => {
              const Icon = product.icon;
              return (
                <div
                  key={`high-${product.id}`}
                  className="min-w-[85vw] sm:min-w-[350px] lg:min-w-0 snap-center bg-white p-6 sm:p-8 border border-gold/30 shadow-md flex flex-col items-start hover:shadow-xl hover:border-gold transition-all duration-300 rounded-lg pointer-events-auto"
                >
                    <div className="flex justify-between w-full mb-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Star className="text-gold w-6 h-6 fill-gold" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary font-bold mb-3">{product.title}</h3>
                    <p className="text-primary/70 font-sans text-sm mb-6 flex-grow">
                      {product.desc}
                    </p>
                    <Link href={product.link} className="inline-flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all w-full pt-4 border-t border-gray-100">
                      Simular Online <ExternalLink className="w-4 h-4 ml-auto" />
                    </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Middle Filter Bar */}
        <div className="w-full bg-primary/5 py-6 px-4 rounded-xl mb-12">
          <h2 className="text-center font-serif text-2xl text-primary font-bold mb-6">Soluções Consultivas</h2>
          <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -600 }}
              className="flex justify-start md:justify-center gap-3 px-4 pb-2"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 rounded font-sans text-xs uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === cat 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-primary border border-gray-200 hover:border-gold hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 3. Bottom Condensed Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredProducts.map(product => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={`prod-${product.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col items-start hover:border-primary/40 hover:shadow-lg transition-all duration-200 group rounded"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg text-primary font-bold leading-tight">{product.title}</h3>
                  </div>
                  <p className="text-primary/70 font-sans text-xs mb-6 flex-grow line-clamp-2">
                    {product.desc}
                  </p>
                  
                  {/* Logic: Redirect to cotacao and bypass to step 3 mapping the product title via query parameter ?prod= */}
                  <Link href={`/cotacao?prod=${encodeURIComponent(product.title)}`} className="inline-flex items-center gap-2 text-primary font-bold uppercase text-[10px] tracking-widest group-hover:text-gold transition-colors w-full pt-4 border-t border-gray-100">
                    Solicitar Proposta <ExternalLink className="w-3 h-3 ml-auto" />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 text-center text-primary">Carregando Catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
