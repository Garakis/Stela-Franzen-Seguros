import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stela Franzen Seguros | Corretora em São José dos Campos",
  description: "Corretora de Seguros Sênior em São José dos Campos (SJC). Especialistas em seguro saúde PME, automóvel, garantia e vida. 30 anos de atuação no Jd Aquarius.",
  openGraph: {
    title: "Stela Franzen Seguros - 30 Anos de Autoridade",
    description: "Conheça nossas soluções completas em Seguros e Proteção Patrimonial em SJC.",
    url: "https://stelafranzen.com.br",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground scroll-smooth overflow-x-hidden">
        <Header />
        <main className="flex-grow flex flex-col items-center w-full">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
