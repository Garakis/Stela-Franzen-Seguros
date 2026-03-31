import { PhoneCall, AlertTriangle, MessageCircle, Car, HeartPulse, GraduationCap, Cross } from "lucide-react";

export const metadata = {
  title: "Central de Sinistro | Assistência 24h",
  description: "Atendimento emergencial 24h. Encontre o telefone da sua seguradora para comunicar um sinistro.",
};

interface AssistenciaItem {
  nome: string;
  telefone: string;
}

interface AssistenciaCategoria {
  titulo: string;
  icon: React.ElementType;
  items: AssistenciaItem[];
}

const categorias: AssistenciaCategoria[] = [
  {
    titulo: "Assistência Automóvel 24h",
    icon: Car,
    items: [
      { nome: "Porto Seguro", telefone: "0800 727 0800" },
      { nome: "Azul Seguros", telefone: "0800 703 0203" },
      { nome: "Yelum/Liberty", telefone: "0800 701 4120" },
      { nome: "Tokio Marine", telefone: "0800 318 6548" },
      { nome: "Suhai", telefone: "0800 327 8424" },
      { nome: "Allianz", telefone: "0800 0130 700" },
      { nome: "Itaú", telefone: "0800 720 1010" },
      { nome: "Bradesco", telefone: "4004 2757" },
      { nome: "Aliro", telefone: "0800 770 1318" },
      { nome: "HDI", telefone: "3003 5390" },
      { nome: "Mitsui", telefone: "0800 707 7883" },
    ],
  },
  {
    titulo: "Assistência Saúde 24h",
    icon: HeartPulse,
    items: [
      { nome: "Porto Seguro", telefone: "3003 9393" },
      { nome: "SulAmérica", telefone: "4004 5900" },
      { nome: "Hapvida", telefone: "0800 018 3456" },
      { nome: "Santa Casa", telefone: "12 3876 1999" },
      { nome: "Unimed", telefone: "12 2139 4095" },
      { nome: "Qualicorp", telefone: "4004 4400" },
      { nome: "Notre Dame", telefone: "4090 1750" },
      { nome: "Bradesco", telefone: "4004 2700" },
    ],
  },
  {
    titulo: "Assistência AP Escolar",
    icon: GraduationCap,
    items: [
      { nome: "Porto Seguro", telefone: "0800 770 5042" },
    ],
  },
  {
    titulo: "Assistência Funeral 24h",
    icon: Cross,
    items: [
      { nome: "Porto Seguro", telefone: "0800 727 9393" },
      { nome: "Capemisa", telefone: "0800 291 2246" },
      { nome: "Tokio Marine", telefone: "0800 707 5050" },
      { nome: "Yelum/Liberty", telefone: "0800 701 4120" },
      { nome: "SulAmérica", telefone: "4090 1073" },
    ],
  },
];

export default function Sinistro() {
  return (
    <div className="w-full bg-surface-dim min-h-[90vh] pt-32 pb-24 flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl w-full">
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

        {/* Categorized Assistance Sections */}
        <div className="space-y-12">
          {categorias.map((cat, catIdx) => {
            const CatIcon = cat.icon;
            return (
              <section key={catIdx}>
                <div className="flex items-center gap-3 mb-6 border-b border-gold/30 pb-4">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                    <CatIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl text-primary">{cat.titulo}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between hover:shadow-md hover:border-gold/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-dim rounded-xl flex items-center justify-center shrink-0">
                          <CatIcon className="w-5 h-5 text-primary/50" />
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-primary">{item.nome}</h3>
                          <p className="text-primary/50 text-sm font-medium tracking-wide">{item.telefone}</p>
                        </div>
                      </div>
                      <a href={`tel:${item.telefone.replace(/\s/g, '')}`} className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary hover:bg-gold hover:text-white transition-colors shrink-0">
                        <PhoneCall className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
