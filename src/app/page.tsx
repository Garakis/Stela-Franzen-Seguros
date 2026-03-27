import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Car, Building, ShieldAlert, Quote, Home as HomeIcon, Smartphone, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Marquee is fully isolated and directly below Hero */}
      <Marquee />

      {/* Gatekeeper Section (Soluções em Seguros) */}
      <section className="py-24 bg-white border-t border-b border-gray-100 w-full relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-sans text-primary text-xs uppercase tracking-widest mb-4 block font-bold">Expertise</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Soluções em Seguros</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Saúde */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <Heart className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Saúde</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Planos individuais e corporativos, odonto premium, saúde ocupacional e até cobertura para seu pet.
              </p>
              <Link href="/produtos?cat=Saúde" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 2 - Vida e Previdência */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <ShieldAlert className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Vida e Previdência</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Proteção financeira personalizada, previdência adulta e infantil, e cobertura contra acidentes.
              </p>
              <Link href="/produtos?cat=Vida e Previdência" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 3 - Empresa */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <Building className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Empresa</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Seguro garantia, proteção patrimonial, soluções setoriais e convenções coletivas para sua empresa.
              </p>
              <Link href="/produtos?cat=Empresa" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 4 - Automóvel */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <Car className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Automóvel</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Frotas, táxi, caminhão, seminovos por assinatura e centro automotivo com garantia Porto.
              </p>
              <Link href="/produtos?cat=Automóvel" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Secondary Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Card 5 - Residencial */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <HomeIcon className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Residencial</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Proteção completa para casas, apartamentos e condomínios na cidade, praia ou campo.
              </p>
              <Link href="/produtos?cat=Residencial" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 6 - Equipamentos e Tecnologia */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <Smartphone className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Equipamentos</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Bikes, smartphones, tablets, notebooks e câmeras protegidos contra danos, roubo e furto.
              </p>
              <Link href="/produtos?cat=Equipamentos" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 7 - Soluções Financeiras */}
            <div className="bg-white border border-gray-200 p-6 lg:p-8 flex flex-col items-start shadow-sm hover:shadow-xl hover:border-gold/50 transition-all group">
              <DollarSign className="text-gold w-10 h-10 mb-6" />
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">Soluções Financeiras</h3>
              <p className="text-primary/70 font-sans text-sm mb-8 flex-grow">
                Consórcios, cartão de crédito, financiamento e crédito com garantia de veículo.
              </p>
              <Link href="/produtos?cat=Soluções Financeiras" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                Ver Opções <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos (Integrated History) */}
      <section className="py-24 bg-primary border-b border-gold/40 text-white w-full">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] border border-gold/30 p-2">
                <div className="relative w-full h-full bg-white/5 overflow-hidden">
                   {/* Fallback image updated to reflect family values */}
                   <Image src="/tradicao.jpg" alt="Apego e Tradição através do Aperto de Mão" fill className="object-cover opacity-90" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="font-sans text-gold text-xs uppercase tracking-widest mb-6 block font-bold border-l-2 border-gold pl-3">Tradição & Confiança</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight font-bold">História Esculpida com Excelência</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6 font-sans">
                Fundada sob princípios de lealdade e precisão técnica, a Stela Franzen protagonizou a evolução do mercado segurador local provendo segurança real para corporações e indivíduos de alto patrimônio.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8 font-sans">
                Nossa consultoria unifica vantagens de grandes holdings ao esmero de uma butique técnica, avaliando riscos minuciosamente para garantir coberturas que jamais falham quando requisitadas.
              </p>
              <Link href="/produtos" className="inline-flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explorar Soluções <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white w-full">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">O Que Dizem Nossos Clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 p-6 lg:p-10 hover:border-gold/40 transition-colors shadow-sm relative">
              <Quote className="absolute top-8 right-8 text-gold/20 w-16 h-16" />
              <div className="flex text-gold mb-6 gap-1">
                {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
              </div>
              <p className="text-primary/80 font-serif italic text-lg mb-8 relative z-10 leading-relaxed">
                &quot;A segurança estruturou a fundação do nosso grupo empresarial. A agilidade da Stela e sua precisão foram incomparáveis na gestão da nossa apólice matriz.&quot;
              </p>
              <p className="text-primary font-bold font-sans uppercase text-xs tracking-wide">— Roberto M., CEO Indústria Automotiva</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 lg:p-10 hover:border-gold/40 transition-colors shadow-sm relative">
               <Quote className="absolute top-8 right-8 text-gold/20 w-16 h-16" />
              <div className="flex text-gold mb-6 gap-1">
                {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
              </div>
              <p className="text-primary/80 font-serif italic text-lg mb-8 relative z-10 leading-relaxed">
                &quot;Confio o seguro saúde da minha família e de todos os meus diretores a Stela Franzen a mais de uma década. Atendimento ultra customizado.&quot;
              </p>
              <p className="text-primary font-bold font-sans uppercase text-xs tracking-wide">— Dra. Helena C., Diretora Médica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Action */}
      <section className="py-20 bg-primary w-full border-t border-gold/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6 font-bold">Pronto para proteger o seu legado?</h2>
          <p className="text-white/70 font-sans mb-10 max-w-xl mx-auto">
            Agende uma consultoria especializada ou solicite uma proposta customizada para o seu perfil e as suas necessidades.
          </p>
          <Link href="/cotacao" className="inline-block px-12 py-5 bg-gold text-primary font-bold rounded-sm hover:brightness-110 transition-all uppercase tracking-widest text-sm shadow-[0_4px_20px_rgba(176,145,77,0.3)]">
            Falar com a Nossa Equipe
          </Link>
        </div>
      </section>
    </>
  );
}
