import ImovelCard from "@/app/_components/ImovelCard";

export default function Page() {
  // CHANGE
  const imoveis = [];

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Nossos imóveis
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Acomodações aconchegantes e luxuosas, localizadas na zona norte de São
        Paulo. Imagine acordar com belas vistas para as montanhas, passar seus
        dias explorando as florestas densas ao redor ou simplesmente relaxar em
        sua banheira de hidromassagem privativa sob as estrelas. Desfrute da
        beleza da natureza em seu próprio pequeno lar longe de casa. O local
        perfeito para férias tranquilas e relaxantes. Bem-vindo ao paraíso.
      </p>

      {imoveis.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {imoveis.map((imovel) => (
            <ImovelCard imovel={imovel} key={imovel.id} />
          ))}
        </div>
      )}
    </div>
  );
}
