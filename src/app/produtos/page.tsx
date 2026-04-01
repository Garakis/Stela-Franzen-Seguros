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
  X,
  CheckCircle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

// Destaques (Top Carousel)
const highlights = [
  { id: 1, title: "Seguro Auto Porto", type: "Afiliado", icon: Car, desc: "Proteção completa para seu veículo com os melhores serviços.", link: "https://www.portoseguro.com.br/loja/seguro-auto/placa-do-veiculo?link_uuid=af1d1818-60a3-43c6-a197-284b45b14da9&social_media=OTHERS&source=NEW_ENGINE&susep=38156J&origem=gerador-link_corretor&utm_id=af1d1818-60a3-43c6-a197-284b45b14da9&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=38156J&utm_content=seguroauto" },
  { id: 2, title: "Seguro Viagem", type: "Afiliado", icon: Briefcase, desc: "Tranquilidade internacional ou nacional com coberturas exclusivas.", link: "https://www.portoseguro.com.br/loja/seguro-viagem?link_uuid=1c0d9304-ee4d-4fb9-95d6-7f1ec2447cd5&social_media=OTHERS&source=NEW_ENGINE&susep=38156J&origem=gerador-link_corretor&utm_id=1c0d9304-ee4d-4fb9-95d6-7f1ec2447cd5&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=38156J&utm_content=viagem" },
  { id: 3, title: "Equipamentos Portáteis", type: "Afiliado", icon: Smartphone, desc: "Seu celular, tablet e notebook protegidos contra falhas, quebras e roubos.", link: "https://www.portoseguro.com.br/equipamentos-portateis/corretor?link_uuid=81058a83-2d39-4d16-bcf6-e949a0cceecd&social_media=OTHERS&source=NEW_ENGINE&susep=38156J&origem=gerador-link_corretor&utm_id=81058a83-2d39-4d16-bcf6-e949a0cceecd&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=38156J&utm_content=equipamentosportateis" },
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

const productDetails = [
  {"id":"saude-individual-corp","titulo":"Saúde Individual/Corp","vantagens":["Rede Referenciada (Einstein/Sírio)","Programas de Saúde Preventiva","Porto Cuida (Descontos em farmácias)","Telemedicina 24h","Reembolso Ágil"]},
  {"id":"odonto-premium","titulo":"Odonto Premium","vantagens":["Rede Nacional","Autorização Online Imediata","Cobertura Estética e Ortodontia","Descontos em Medicamentos"]},
  {"id":"saude-ocupacional","titulo":"Saúde Ocupacional","vantagens":["Gestão de PCMSO/PGR","Envio para eSocial","Rede de Clínicas Nacional","Consultoria Técnica"]},
  {"id":"petlove-saude","titulo":"Petlove Saúde","vantagens":["Maior rede veterinária do Brasil","Microchipagem Gratuita","Atendimento em Domicílio","Cobertura de Vacinas e Cirurgias"]},
  {"id":"vida-individual-grupo","titulo":"Vida (Individual/Grupo/Emp)","vantagens":["Cobertura Doenças Graves","Assistência Funeral Completa","Sorteios Mensais em Dinheiro","DIT para Profissionais Liberais"]},
  {"id":"vida-mulher","titulo":"Vida Mulher","vantagens":["Indenização p/ Câncer de Mama/Útero","2ª Opinião Médica Internacional","Assistência Residencial Inclusa"]},
  {"id":"vida-on","titulo":"Vida On","vantagens":["Contratação 100% Digital","Sem Burocracia/Exames","Assistência Viagem","Preço Fixo Acessível"]},
  {"id":"previdencia-adulto-infantil","titulo":"Previdência (Adulto/Infantil)","vantagens":["Gestão Profissional Porto","Sucessão Patrimonial sem Inventário","Eficiência Fiscal (PGBL)","Fundos Multimercados"]},
  {"id":"acidentes-pessoais","titulo":"Acidentes Pessoais","vantagens":["Proteção Mundial 24h","Diária de Internação Hospitalar","Baixo Custo para Autônomos"]},
  {"id":"acidentes-escolares","titulo":"Acidentes Escolares","vantagens":["Cobertura em Passeios/Excursões","Reembolso Médico e Odonto","Tranquilidade para Pais e Escolas"]},
  {"id":"empresarial-geral","titulo":"Empresarial Geral","vantagens":["Multirriscos (Incêndio/Roubo)","Responsabilidade Civil","Assistência 24h (Chaveiro/Reparos)"]},
  {"id":"seguro-garantia","titulo":"Seguro Garantia","vantagens":["Preservação de Capital de Giro","Aceitação em Licitações/Judicial","Emissão Digital Ágil"]},
  {"id":"maquinas-equipamentos","titulo":"Máquinas e Equipamentos","vantagens":["Proteção Agrícola/Industrial","Cobertura de Danos Elétricos","Opção de Lucros Cessantes"]},
  {"id":"setoriais-especificos","titulo":"Setoriais Específicos","vantagens":["Soluções p/ Academias/Escolas/Clínicas","Cobertura de Deterioração de Estoque","Responsabilidade Profissional"]},
  {"id":"concessionarias","titulo":"Concessionárias","vantagens":["Proteção de Pátio e Estoque","RC Test-Drive","Danos por Granizo/Alagamento"]},
  {"id":"convencoes-coletivas","titulo":"Convenções Coletivas","vantagens":["Conformidade com Sindicatos (CCT)","Auxílio Alimentação Incluso","Gestão Simples de Movimentação"]},
  {"id":"auto-empresarial-frota","titulo":"Auto (Empresarial/Frota)","vantagens":["Guincho sem limite de KM","Carro Reserva Utilitário","Gestão Centralizada de Frota"]},
  {"id":"taxi","titulo":"Táxi","vantagens":["Diária de Lucros Cessantes","Assistência Ágil 24h","Cobertura de Passageiros"]},
  {"id":"auto-mulher","titulo":"Auto Mulher","vantagens":["Troca de Pneus Inclusa","Assistência Residencial Estendida","Atendimento Personalizado"]},
  {"id":"seguro-caminhao","titulo":"Seguro Caminhão","vantagens":["Guinchos Extra Pesados","Proteção de Carga","Assistência ao Estradista"]},
  {"id":"assinatura-carro-facil","titulo":"Carros Seminovos (Assinatura)","vantagens":["IPVA e Seguro Inclusos","Manutenção Preventiva Paga","Carro Reserva e Tag Porto"]},
  {"id":"centro-automotivo","titulo":"Centro Automotivo","vantagens":["Garantia de Peças Originais","Check-up Gratuito p/ Segurados","Parcelamento via Cartão Porto"]},
  {"id":"residencial-habitual-veraneio","titulo":"Residencial (Habitual/Veraneio)","vantagens":["Mão de obra p/ Eletrodomésticos","Check-up Lar (Calhas/Elétrica)","Proteção contra Danos Elétricos"]},
  {"id":"apartamentos","titulo":"Apartamentos","vantagens":["Cobertura de Conteúdo Interno","RC Familiar/Vizinhos","Assistência 24h Prédios"]},
  {"id":"seguro-condominio","titulo":"Seguro Condomínio","vantagens":["RC Síndico e Administradora","Danos Estruturais","Assistência Áreas Comuns"]},
  {"id":"seguro-bike","titulo":"Seguro Bike","vantagens":["Danos ao Terceiro","Extensão Internacional","Proteção no Transporte"]},
  {"id":"smartphone-tablets","titulo":"Smartphone e Tablets","vantagens":["Roubo e Furto Qualificado","Quedas Acidentais","Danos Elétricos"]},
  {"id":"notebooks-cameras","titulo":"Notebooks e Câmeras","vantagens":["Proteção de Equipamento de Trabalho","Uso Profissional e Lazer","Cobertura em Viagens"]},
  {"id":"consorcios","titulo":"Consórcios (Imóvel/Auto/Pesados)","vantagens":["Taxa Adm Competitiva (Sem Juros)","Poder de Compra à Vista","Lances Embutidos"]},
  {"id":"cartao-porto-bank","titulo":"Cartão de Crédito","vantagens":["Programa de Pontos PortoPlus","Tag Porto Grátis","Desconto na Renovação do Seguro"]},
  {"id":"financiamento-credito","titulo":"Financiamento e Crédito","vantagens":["Crédito com Garantia de Veículo (CGI)","Taxas Reduzidas","Capital de Giro p/ Empresas"]}
];

function CatalogContent() {
  const [activeTab, setActiveTab] = useState("Todos");
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const [activeModalHash, setActiveModalHash] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveModalHash(hash || null);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalHash) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
        setActiveModalHash(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeModalHash]);

  const openModal = (hashId: string) => {
    window.location.hash = hashId;
  };

  const closeModal = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setActiveModalHash(null);
  };

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
                    <a href={product.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all w-full pt-4 border-t border-gray-100">
                      Simular Online <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
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
              const detail = productDetails.find(d => d.titulo === product.title);
              const hashId = detail?.id || product.id.toString();

              return (
                <motion.div
                  key={`prod-${product.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openModal(hashId)}
                  className="bg-white p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col items-start hover:border-primary/40 hover:shadow-lg transition-all duration-200 group rounded cursor-pointer relative"
                >
                  <div className="flex items-center gap-4 mb-4 pointer-events-none">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg text-primary font-bold leading-tight">{product.title}</h3>
                  </div>
                  <p className="text-primary/70 font-sans text-xs mb-6 flex-grow line-clamp-2 pointer-events-none">
                    {product.desc}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-primary font-bold uppercase text-[10px] tracking-widest group-hover:text-gold transition-colors w-full pt-4 border-t border-gray-100 mt-auto pointer-events-none">
                    Ver Detalhes <ExternalLink className="w-3 h-3 ml-auto" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dynamic Modal */}
      <AnimatePresence>
        {activeModalHash && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl relative z-10 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              {(() => {
                const modalData = productDetails.find(p => p.id === activeModalHash);
                const originalProduct = products.find(p => p.title === modalData?.titulo);
                const Icon = originalProduct?.icon || HelpCircle; // Fallback missing icon
                const descGeral = originalProduct?.desc || "";

                if (!modalData) return <div className="p-8 text-center text-primary">Produto não encontrado.</div>;

                return (
                  <>
                    <div className="bg-primary p-6 md:p-8 relative">
                      <button 
                        onClick={closeModal}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-4 text-white mb-2">
                        <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                           <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <h2 className="font-serif text-2xl font-bold">{modalData.titulo}</h2>
                      </div>
                      <p className="text-white/80 font-sans text-sm mt-3">{descGeral}</p>
                    </div>

                    <div className="p-6 md:p-8 overflow-y-auto w-full">
                      <h3 className="font-sans text-xs uppercase tracking-widest text-primary/60 font-bold mb-4">Principais Vantagens</h3>
                      <ul className="space-y-4">
                        {modalData.vantagens.map((vantagem, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                            <span className="text-primary font-sans text-sm font-medium">{vantagem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                      <Link 
                        href={`/cotacao?prod=${encodeURIComponent(modalData.titulo)}`}
                        onClick={(e) => {
                          // Allow natural navigation, closeModal manually isn't strictly necessary for Next routing 
                          // but clears hash state.
                          closeModal();
                        }}
                        className="w-full py-4 bg-gold text-white rounded font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-md hover:shadow-lg transition-all"
                      >
                        Solicitar Cotação Agora <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
