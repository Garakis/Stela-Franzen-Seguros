"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ExternalLink,
  Heart,
  Building,
  Car,
  Briefcase,
  DollarSign,
  ShieldAlert,
  Star,
  Home,
  Smartphone,
  Bike,
  Truck,
  CreditCard,
  Baby,
  GraduationCap,
  Activity,
  PawPrint,
  Users,
  Landmark,
  Wrench,
  Camera,
  Laptop,
  HandCoins,
  Shield,
  Dumbbell,
  Hotel,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

// Destaques (Top Carousel)
const highlights = [
  { id: 1, title: "Seguro Auto Porto", type: "Afiliado", icon: Car, desc: "Proteção completa para seu veículo com os melhores serviços.", link: "#" },
  { id: 2, title: "Seguro Viagem", type: "Afiliado", icon: Briefcase, desc: "Tranquilidade internacional ou nacional com coberturas exclusivas.", link: "#" },
  { id: 3, title: "Equipamentos Portáteis", type: "Afiliado", icon: Smartphone, desc: "Seu celular, tablet e notebook protegidos contra falhas, quebras e roubos.", link: "#" },
];

interface Product {
  id: number;
  title: string;
  category: string;
  icon: LucideIcon;
  desc: string;
}

const products: Product[] = [
  // ── Saúde ──
  { id: 101, title: "Saúde Individual/Corp", category: "Saúde", icon: Heart, desc: "Vantagens de contratação corporativa com atendimento personalizado para você ou sua empresa." },
  { id: 102, title: "Odonto Premium", category: "Saúde", icon: Activity, desc: "Cuidado completo com a saúde bucal para garantir bem-estar e melhor desempenho profissional." },
  { id: 103, title: "Saúde Ocupacional", category: "Saúde", icon: Stethoscope, desc: "Prevenção de riscos ocupacionais e gestão completa em medicina e segurança do trabalho." },
  { id: 104, title: "Petlove Saúde", category: "Saúde", icon: PawPrint, desc: "Plano de saúde completo para retribuir o carinho que seu pet oferece." },

  // ── Vida e Previdência ──
  { id: 201, title: "Vida (Individual/Grupo/Emp)", category: "Vida e Previdência", icon: ShieldAlert, desc: "Proteção financeira personalizada para você, sua família ou seus colaboradores." },
  { id: 202, title: "Vida Mulher", category: "Vida e Previdência", icon: Heart, desc: "Seguro com coberturas adicionais focadas em diagnósticos graves e bem-estar feminino." },
  { id: 203, title: "Vida On", category: "Vida e Previdência", icon: Shield, desc: "Contratação simples e digital para proteção rápida de quem você ama." },
  { id: 204, title: "Previdência (Adulto/Infantil)", category: "Vida e Previdência", icon: DollarSign, desc: "Planejamento sucessório e construção do futuro financeiro desde cedo." },
  { id: 205, title: "Acidentes Pessoais", category: "Vida e Previdência", icon: ShieldAlert, desc: "Proteção e auxílio completo em casos de acidentes, com opções individual e plus." },
  { id: 206, title: "Acidentes Escolares", category: "Vida e Previdência", icon: GraduationCap, desc: "Tranquilidade para pais e escolas com proteção para alunos dentro e fora do ensino." },

  // ── Empresa ──
  { id: 301, title: "Empresarial Geral", category: "Empresa", icon: Building, desc: "Eficiência e economia para proteger o patrimônio da sua empresa." },
  { id: 302, title: "Seguro Garantia", category: "Empresa", icon: Landmark, desc: "Cumprimento de contratos, licitações e exigências legais com segurança." },
  { id: 303, title: "Máquinas e Equipamentos", category: "Empresa", icon: Wrench, desc: "Proteção para equipamentos portáteis, industriais e de construção da sua empresa." },
  { id: 304, title: "Setoriais Específicos", category: "Empresa", icon: Dumbbell, desc: "Soluções para Academias, Escolas, Bares, Clínicas, Estética, Hotéis e Petshops." },
  { id: 305, title: "Concessionárias", category: "Empresa", icon: Car, desc: "Proteção especializada cobrindo desde o pátio até o test-drive." },
  { id: 306, title: "Convenções Coletivas", category: "Empresa", icon: Users, desc: "Seguro de vida e bem-estar obrigatório para cumprimento de acordos sindicais." },

  // ── Automóvel ──
  { id: 401, title: "Auto (Empresarial/Frota)", category: "Automóvel", icon: Car, desc: "Veículos da sua empresa protegidos com benefícios exclusivos e assistência ágil." },
  { id: 402, title: "Táxi", category: "Automóvel", icon: Car, desc: "Cobertura ágil e serviços gratuitos para o motorista não ficar parado." },
  { id: 403, title: "Auto Mulher", category: "Automóvel", icon: Car, desc: "Proteção para o automóvel com serviços e benefícios exclusivos para elas." },
  { id: 404, title: "Seguro Caminhão", category: "Automóvel", icon: Truck, desc: "Coberturas e serviços específicos para as necessidades do estradista." },
  { id: 405, title: "Carros Seminovos (Assinatura)", category: "Automóvel", icon: Car, desc: "Escolha o modelo, pague a mensalidade e esqueça burocracias com o Carro Fácil." },
  { id: 406, title: "Centro Automotivo", category: "Automóvel", icon: Wrench, desc: "Manutenção de confiança e serviços mecânicos com garantia Porto." },

  // ── Residencial ──
  { id: 501, title: "Residencial (Habitual/Veraneio)", category: "Residencial", icon: Home, desc: "Proteção completa para sua casa na cidade, praia ou campo." },
  { id: 502, title: "Apartamentos", category: "Residencial", icon: Building, desc: "Seguro específico para as particularidades de quem mora em prédios." },
  { id: 503, title: "Seguro Condomínio", category: "Residencial", icon: Building, desc: "Gestão de riscos para síndicos e administradoras, garantindo a paz coletiva." },

  // ── Equipamentos e Tecnologia ──
  { id: 601, title: "Seguro Bike", category: "Equipamentos e Tecnologia", icon: Bike, desc: "Solução completa para o ciclista e seu patrimônio contra roubo e danos." },
  { id: 602, title: "Smartphone e Tablets", category: "Equipamentos e Tecnologia", icon: Smartphone, desc: "Reposição de aparelhos em caso de danos físicos, roubo ou furto qualificado." },
  { id: 603, title: "Notebooks e Câmeras", category: "Equipamentos e Tecnologia", icon: Laptop, desc: "Proteção para seus equipamentos de trabalho e hobby em qualquer lugar." },

  // ── Soluções Financeiras ──
  { id: 701, title: "Consórcios (Imóvel/Auto/Pesados)", category: "Soluções Financeiras", icon: HandCoins, desc: "Poder de compra à vista com parcelas acessíveis e sem juros." },
  { id: 702, title: "Cartão de Crédito", category: "Soluções Financeiras", icon: CreditCard, desc: "Bandeiras Master e Visa com benefícios exclusivos nas suas apólices." },
  { id: 703, title: "Financiamento e Crédito", category: "Soluções Financeiras", icon: DollarSign, desc: "Linhas de crédito para veículos, capital de giro e empréstimo consignado." },
  { id: 704, title: "Crédito com Garantia de Veículo", category: "Soluções Financeiras", icon: Car, desc: "Dinheiro rápido no bolso usando seu carro como garantia." },
];

const categories = ["Todos", "Saúde", "Vida e Previdência", "Empresa", "Automóvel", "Residencial", "Equipamentos e Tecnologia", "Soluções Financeiras"];

function CatalogContent() {
  const [activeTab, setActiveTab] = useState("Todos");
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
  };

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
        <div className="w-full bg-primary/5 py-6 px-2 sm:px-4 rounded-xl mb-12">
          <h2 className="text-center font-serif text-2xl text-primary font-bold mb-6">Soluções Consultivas</h2>
          <div className="relative flex items-center gap-1">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
                canScrollLeft
                  ? "bg-white text-primary border-gray-300 hover:border-gold hover:text-gold shadow-sm cursor-pointer"
                  : "bg-gray-100 text-gray-300 border-gray-200 cursor-default"
              }`}
              aria-label="Scroll esquerda"
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-x-auto flex gap-3 py-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
                canScrollRight
                  ? "bg-white text-primary border-gray-300 hover:border-gold hover:text-gold shadow-sm cursor-pointer"
                  : "bg-gray-100 text-gray-300 border-gray-200 cursor-default"
              }`}
              aria-label="Scroll direita"
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
