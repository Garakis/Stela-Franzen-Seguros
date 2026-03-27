import Image from "next/image";
import { PhoneCall, AlertTriangle, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Central de Sinistro | Assistência 24h",
  description: "Atendimento emergencial 24h. Encontre o telefone da sua seguradora para comunicar um sinistro.",
};

const seguradoras = [
  { nome: "Porto Seguro", telefone: "0800 727 2766", logo: "Porto-20atualizado.png" },
  { nome: "SulAmérica", telefone: "0800 725 5901", logo: "Sulamerica-20atualizado.png" },
  { nome: "Bradesco Seguros", telefone: "4004 2757", logo: "Bradesco.png" },
  { nome: "Allianz", telefone: "0800 0115 215", logo: "Allianz.png" },
  { nome: "Tokio Marine", telefone: "0800 31 86546", logo: "Tokio-20atualizado.png" },
  { nome: "Sompo (Yelum)", telefone: "0800 77 31527", logo: "yelum-20-1.png" },
  { nome: "HDI", telefone: "0800 434 4340", logo: "HDI.png" },
  { nome: "Suhai", telefone: "3003 0335", logo: "Suhai.png" },
];

export default function Sinistro() {
  return (
    <div className="w-full bg-surface-dim min-h-[90vh] pt-32 pb-24 flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl text-primary mb-4">Central de Emergência e Sinistro</h1>
          <p className="text-primary/70 font-sans text-lg max-w-2xl mx-auto">
            Em caso de emergência, entre em contato diretamente com a Assistência 24h da sua seguradora através dos botões de discagem rápida abaixo.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="https://wa.me/5512997397129?text=Preciso%20de%20ajuda%20com%20um%20sinistro" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg hover:brightness-110 transition-all">
            <MessageCircle className="w-5 h-5" /> Informar Corretor via WhatsApp
          </a>
        </div>

        <h2 className="font-serif text-2xl text-primary border-b border-gold/30 pb-4 mb-8">Telefones das Seguradoras</h2>

        {/* Mobile First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seguradoras.map((seg, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between hover:shadow-md hover:border-gold/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-surface-dim rounded-xl flex items-center justify-center p-2 relative shrink-0">
                  <Image src={`/seguradoras/${seg.logo}`} alt={seg.nome} fill className="object-contain p-2" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-primary">{seg.nome}</h3>
                  <p className="text-primary/50 text-sm font-medium tracking-wide">{seg.telefone}</p>
                </div>
              </div>
              <a href={`tel:${seg.telefone.replace(/\s/g, '')}`} className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary hover:bg-gold hover:text-white transition-colors shrink-0">
                <PhoneCall className="w-6 h-6" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
