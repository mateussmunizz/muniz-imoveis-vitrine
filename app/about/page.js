import Link from "next/link";

export const metadata = {
  title: "Sobre Nós",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-16 gap-y-20 items-center mt-12 mb-24 px-4 md:px-0">
      <div className="col-span-3">
        <h1 className="text-5xl lg:text-6xl mb-10 text-primary-900 font-extrabold leading-tight tracking-tight">
          Tradição no mercado, inovação no seu atendimento.
        </h1>

        <div className="space-y-8 text-xl lg:text-2xl text-primary-700 leading-relaxed font-medium">
          <p>
            Na Muniz Imóveis, acreditamos que encontrar o lar ideal vai muito
            além de abrir portas; trata-se de entender histórias. Com 9 anos de
            atuação sólida no mercado, construímos nossa base na confiança, na
            transparência e no conhecimento profundo de cada rua e bairro, com
            foco especial na Zona Norte de São Paulo.
          </p>
          <p>
            Sabemos que o mercado imobiliário exige precisão. Por isso, unimos
            nossa vasta experiência em negociações com a mais alta tecnologia.
            Desenvolvemos nossos próprios sistemas de informação para garantir
            que a sua jornada — da busca pelo imóvel ao agendamento da visita —
            seja rápida, segura e sem burocracia.
          </p>
        </div>
      </div>

      <div className="col-span-2 relative aspect-[4/3] shadow-xl rounded-2xl overflow-hidden border border-primary-200 hover:shadow-2xl transition-all hover:-translate-y-1">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
          alt="Fachada de uma charmosa casa moderna"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="col-span-2 relative aspect-[4/3] shadow-xl rounded-2xl overflow-hidden border border-primary-200 hover:shadow-2xl transition-all hover:-translate-y-1 order-last md:order-none">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
          alt="Corretor e clientes em uma reunião"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="col-span-3 pl-0 md:pl-10">
        <h1 className="text-5xl mb-8 text-primary-900 font-extrabold leading-tight tracking-tight">
          Sua jornada imobiliária, simplificada pela tecnologia.
        </h1>

        <div className="space-y-8 text-xl lg:text-2xl text-primary-700 mb-12 leading-relaxed font-medium">
          <p>
            Não somos apenas intermediadores; somos facilitadores. Nossa missão
            é entregar uma experiência digital impecável, onde você tem controle
            total. Navegue pelo nosso portfólio selecionado e utilize nossa
            plataforma para agendar sua visita instantaneamente, no horário que
            melhor se adapta à sua rotina.
          </p>
        </div>

        <Link
          href="/imoveis"
          className="inline-block bg-accent-500 px-10 py-5 text-primary-900 text-xl font-bold hover:bg-accent-600 transition-all rounded-xl shadow-lg hover:shadow-accent-500/30 hover:-translate-y-1"
        >
          Explorar Nossos Imóveis
        </Link>
      </div>
    </div>
  );
}
