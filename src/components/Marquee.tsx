import Image from "next/image";

const logos = [
  "Allianz.png", "Bradesco.png", "Capemisa.png", "Excelsior-20seguros.png",
  "HDI.png", "Hapvida.png", "Notredame-20Interm-C3-A9dica.png", "Porto-20atualizado.png",
  "Santa-casa-sjc.png", "Suhai.png", "Sulamerica-20atualizado.png", "Tokio-20atualizado.png",
  "amil-novo.png", "azul-branco.png", "itau.png", "mapfre.png", "pottencial.png",
  "prevent-20senior-20.png", "s-C3-A3o-francisco.png", "yelum-20-1.png"
];

export default function Marquee() {
  return (
    <section className="py-24 bg-surface-dim overflow-hidden w-full select-none">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <h2 className="font-serif text-3xl text-primary text-center">Trabalhamos com as Melhores Seguradoras do Mercado</h2>
      </div>
      <div className="relative flex py-10 overflow-hidden w-full">
        <div className="flex animate-marquee whitespace-nowrap gap-4 items-center w-max hover:[animation-play-state:paused]">
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex items-center justify-center shrink-0 px-4 group cursor-pointer transition-transform hover:scale-110">
              <Image
                src={`/seguradoras/${logo}`}
                alt={`Seguradora Parceira ${index}`}
                width={140}
                height={70}
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
