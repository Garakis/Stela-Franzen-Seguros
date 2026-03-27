"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Heart, Building, Car, DollarSign, ArrowRight, ArrowLeft, CheckSquare, Square } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Base context data
const categoriesData = [
  { id: "Saúde", name: "Saúde & Odonto", icon: Heart, products: ["Saúde Empresarial", "Odonto Premium", "Saúde Ocupacional", "Petlove Saúde"] },
  { id: "Vida", name: "Vida & Previdência", icon: ShieldAlert, products: ["Vida Individual", "Vida Mulher", "Previdência", "Previdência Infantil", "Acidentes Escolares"] },
  { id: "Empresa", name: "Negócios & Empresas", icon: Building, products: ["Seguro Garantia", "Concessionárias", "Academias", "Clínicas", "Escolas", "Hotéis/Pousadas"] },
  { id: "Automóvel", name: "Automóvel", icon: Car, products: ["Auto Empresarial", "Táxi", "Auto Mulher", "Seguro Caminhão", "Bike"] },
  { id: "Financeiro", name: "Soluções Financeiras", icon: DollarSign, products: ["Consórcio Imóvel/Auto", "Cartão de Crédito", "Financiamento", "Capital de Giro"] },
];

function CotacaoContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: "",
    whatsapp: "",
    mensagem: ""
  });

  // Auto-bypass logic via URL State Management
  useEffect(() => {
    const prodParam = searchParams.get("prod");
    if (prodParam) {
      setSelectedProducts([prodParam]);
      setStep(3); // Bypass steps 1 and 2 directly to User Data
    }
  }, [searchParams]);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleProduct = (prod: string) => {
    setSelectedProducts(prev => 
      prev.includes(prod) ? prev.filter(p => p !== prod) : [...prev, prod]
    );
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => {
    // If returning from auto-bypass, reset completely to Step 1
    if (step === 3 && searchParams.get("prod") && !selectedCategory) {
       setStep(1);
       setSelectedProducts([]);
    } else {
       setStep(s => Math.max(s - 1, 1));
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const prodsStr = selectedProducts.join(", ");
    const text = `Olá! Quero solicitar uma proposta para: *${prodsStr}*. Meu nome é ${formData.nome}. Contato: ${formData.whatsapp}. Mensagem: ${formData.mensagem}`;
    const url = `https://wa.me/5512997397129?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const currentCategoryData = categoriesData.find(c => c.name === selectedCategory);

  return (
    <div className="w-full bg-white min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        <div className="bg-white rounded border border-gray-200 shadow-2xl overflow-hidden relative">
          
          {/* Header Theme Midnight Navy */}
          <div className="bg-primary p-6 sm:p-10 text-center relative overflow-hidden">
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-2 relative z-10 font-bold">Solicitar Proposta</h1>
            <p className="text-gold font-sans text-sm relative z-10 font-medium uppercase tracking-widest">
              Passo {step} de 3
            </p>
            {/* Progress line */}
            <div className="absolute bottom-0 left-0 h-1 bg-gold transition-all duration-500 ease-out z-20" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>

          <div className="p-6 sm:p-10 md:p-14 min-h-[400px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl text-primary mb-8 text-center font-bold">Selecione o Segmento de Interesse</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoriesData.map(item => {
                      const Icon = item.icon;
                      const isSelected = selectedCategory === item.name;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedCategory(item.name);
                            setSelectedProducts([]); // Reset products when changing category
                            setTimeout(nextStep, 350);
                          }}
                          className={`p-6 rounded border flex flex-col items-center gap-4 transition-all duration-300 ${
                            isSelected 
                              ? 'border-gold bg-primary text-white shadow-lg scale-[1.02]' 
                              : 'border-gray-200 text-primary hover:border-gold hover:text-gold hover:shadow-md'
                          }`}
                        >
                          <Icon className={`w-8 h-8 ${isSelected ? 'text-gold' : ''}`} />
                          <span className="font-sans font-bold text-sm tracking-wide">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && currentCategoryData && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl text-primary mb-8 text-center font-bold">Quais produtos deseja cotar?</h2>
                  <p className="text-center text-primary/60 text-sm mb-8 font-sans">Selecione uma ou mais opções abaixo:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {currentCategoryData.products.map(prod => {
                      const isSelected = selectedProducts.includes(prod);
                      return (
                        <button
                          key={prod}
                          onClick={() => toggleProduct(prod)}
                          className={`p-4 rounded border flex items-center justify-between transition-all duration-200 ${
                            isSelected 
                              ? 'border-gold bg-gold/5 text-primary' 
                              : 'border-gray-200 text-primary/70 hover:border-gold/50'
                          }`}
                        >
                          <span className="font-sans font-medium text-sm">{prod}</span>
                          {isSelected ? <CheckSquare className="text-gold w-5 h-5" /> : <Square className="text-gray-300 w-5 h-5" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.form
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={submitForm}
                >
                  <div className="mb-8 p-4 bg-primary/5 rounded border border-primary/10">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-primary/80 font-bold mb-2">Produtos Selecionados</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProducts.map(p => (
                        <span key={p} className="bg-primary text-white text-xs px-3 py-1 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl text-primary mb-6 font-bold">Informações de Contato</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-primary font-sans text-xs font-bold mb-2 uppercase tracking-widest">Nome Completo</label>
                        <input type="text" required value={formData.nome} onChange={e => updateForm("nome", e.target.value)} className="w-full border-b-2 border-gray-200 bg-transparent py-2 outline-none focus:border-gold transition-colors text-primary font-medium" placeholder="Como devemos chamá-lo?" />
                      </div>
                      <div>
                        <label className="block text-primary font-sans text-xs font-bold mb-2 uppercase tracking-widest">WhatsApp</label>
                        <input type="tel" required value={formData.whatsapp} onChange={e => updateForm("whatsapp", e.target.value)} className="w-full border-b-2 border-gray-200 bg-transparent py-2 outline-none focus:border-gold transition-colors text-primary font-medium" placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-primary font-sans text-xs font-bold mb-2 uppercase tracking-widest">Email</label>
                        <input type="email" value={formData.email} onChange={e => updateForm("email", e.target.value)} className="w-full border-b-2 border-gray-200 bg-transparent py-2 outline-none focus:border-gold transition-colors text-primary font-medium" placeholder="seu@email.com" />
                      </div>
                      <div>
                        <label className="block text-primary font-sans text-xs font-bold mb-2 uppercase tracking-widest">CPF ou CNPJ</label>
                        <input type="text" value={formData.documento} onChange={e => updateForm("documento", e.target.value)} className="w-full border-b-2 border-gray-200 bg-transparent py-2 outline-none focus:border-gold transition-colors text-primary font-medium" placeholder="Opcional neste momento" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-primary font-sans text-xs font-bold mb-2 uppercase tracking-widest">Detalhes (Opcional)</label>
                      <textarea rows={3} value={formData.mensagem} onChange={e => updateForm("mensagem", e.target.value)} className="w-full border border-gray-200 rounded py-3 px-4 outline-none focus:border-gold transition-colors text-primary resize-none text-sm" placeholder="Conte-nos um pouco mais sobre o que precisa..."></textarea>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-gray-50 border-t border-gray-200 p-6 md:px-14 flex justify-between items-center">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
            ) : <div></div>}

            {step < 3 && (
              <button 
                type="button" 
                onClick={nextStep} 
                disabled={(step === 1 && !selectedCategory) || (step === 2 && selectedProducts.length === 0)}
                className={`flex items-center gap-2 font-bold uppercase text-xs tracking-widest px-8 py-4 rounded transition-all shadow-md ${
                  (step === 1 && !selectedCategory) || (step === 2 && selectedProducts.length === 0) 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                    : 'bg-primary text-white hover:bg-gold hover:shadow-lg'
                }`}
              >
                Avançar <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button 
                type="button" 
                onClick={submitForm}
                className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest px-8 py-4 rounded transition-all bg-gold text-white shadow-lg hover:brightness-110 hover:shadow-xl"
              >
                Finalizar via WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cotacao() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <CotacaoContent />
    </Suspense>
  );
}
