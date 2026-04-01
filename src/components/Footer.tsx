import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary w-full relative border-t border-gold/40">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-8 py-12 md:py-20 w-full max-w-screen-2xl mx-auto">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center mb-6">
            <div className="relative w-48 sm:w-64 h-16 sm:h-20">
              <Image
                src="/logo.png"
                alt="Stela Franzen Seguros Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <p className="text-white/70 font-sans text-sm mb-6 leading-relaxed max-w-sm">
            Três décadas de excelência em gestão de riscos e proteção patrimonial. Acreditamos que o legado de cada cliente merece o mais alto nível de segurança estruturada e consultoria multidisciplinar.
          </p>
          <div className="flex items-center gap-4 text-gold">
            <Mail className="hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-gold font-bold font-sans text-sm tracking-wide uppercase mb-8">Unidade SJC</h4>
          <address className="text-white/70 font-sans text-sm not-italic space-y-4">
            <p className="flex items-start gap-3">
              <MapPin className="text-gold shrink-0 w-5 h-5" />
              <span>Edifício Oregon, Jd. Aquarius<br />São José dos Campos - SP</span>
            </p>
            <div className="flex items-start gap-3">
              <Phone className="text-gold shrink-0 w-5 h-5 mt-0.5" />
              <div className="flex flex-col space-y-1">
                <span><strong className="font-medium text-white">Cálculos:</strong> (12) 99739-7129</span>
                <span><strong className="font-medium text-white">Benefícios:</strong> (12) 99700-8437</span>
                <span><strong className="font-medium text-white">Geral:</strong> (12) 99772-1187</span>
              </div>
            </div>
          </address>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-gold font-bold font-sans text-sm tracking-wide uppercase">Links Rápidos</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-white/70 hover:text-gold transition-colors duration-200 font-sans text-sm tracking-wide uppercase">Início</Link></li>
            <li><Link href="/produtos" className="text-white/70 hover:text-gold transition-colors duration-200 font-sans text-sm tracking-wide uppercase">Produtos</Link></li>
            <li><Link href="/sinistro" className="text-white/70 hover:text-gold transition-colors duration-200 font-sans text-sm tracking-wide uppercase">Central de Sinistro</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 border-t border-gold/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 font-sans text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Stela Franzen Seguros. Todos os direitos reservados.
        </p>
        <p className="text-white/40 font-sans text-xs tracking-widest">
          CNPJ: 03.302.929/0001-63
        </p>
      </div>
    </footer>
  );
}
