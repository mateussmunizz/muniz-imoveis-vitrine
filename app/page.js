import Link from "next/link";
import ImovelCard from "@/app/_components/ImovelCard";
import { getImoveis } from "@/app/_lib/data-service";

export const metadata = {
  title: "Início | Sua Imobiliária",
};

export default async function Page() {
  const imoveis = await getImoveis();
  const imoveisDestaque = imoveis.slice(0, 3);

  return (
    <main className="bg-stone-50 py-10 md:py-20 min-h-screen">
      <section className="max-w-[100rem] mx-auto px-4 md:px-10 lg:px-16 text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary-900 tracking-tight mb-8 leading-tight">
          O imóvel que você procura <br className="hidden md:block" />
          <span className="text-accent-500">está na Zona Norte.</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary-700 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Especialistas em conectar você ao seu novo lar. Casas, apartamentos e
          studios com as melhores condições do mercado.
        </p>
        <Link
          href="/imoveis"
          className="inline-block bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold text-xl px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-accent-500/30 hover:-translate-y-1"
        >
          Explorar Catálogo Completo
        </Link>
      </section>

      <section className="max-w-[100rem] mx-auto px-4 md:px-10 lg:px-16 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-primary-300 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
              Imóveis em Destaque
            </h2>
            <p className="text-primary-700 text-lg font-medium">
              As melhores oportunidades selecionadas para você esta semana.
            </p>
          </div>
          <Link
            href="/imoveis"
            className="text-accent-600 hover:text-accent-700 font-bold text-lg hover:underline mt-4 md:mt-0 transition-colors"
          >
            Ver todos os imóveis &rarr;
          </Link>
        </div>

        {imoveisDestaque.length === 0 ? (
          <p className="text-center text-primary-700 text-xl py-10">
            Carregando oportunidades...
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {imoveisDestaque.map((imovel) => (
              <ImovelCard imovel={imovel} key={imovel.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
