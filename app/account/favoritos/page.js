import ImovelCard from "@/app/_components/ImovelCard";
import { getImoveis, getFavoritos, getCliente } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";

// MÁGICA: Desliga o cache agressivo para garantir que os favoritos atualizem na hora!
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Meus Favoritos",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const cliente = await getCliente(session.user.email);
  if (!cliente) {
    return null;
  }

  const favoritosIds = await getFavoritos(cliente.id);
  const todosImoveis = await getImoveis();

  // Filtramos garantindo que ambos são lidos como texto para não haver erro de compatibilidade
  const imoveisFavoritados = todosImoveis.filter((imovel) =>
    favoritosIds.some((favId) => String(favId) === String(imovel.id)),
  );

  return (
    <div>
      <h2 className="font-semibold text-4xl text-accent-400 mb-10">
        Meus Imóveis Salvos
      </h2>

      {imoveisFavoritados.length === 0 ? (
        <p className="text-xl text-primary-200">
          Você ainda não salvou nenhum imóvel.
          <Link
            href="/imoveis"
            className="text-accent-500 hover:underline ml-2"
          >
            Explorar catálogo
          </Link>
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {imoveisFavoritados.map((imovel) => (
            <ImovelCard imovel={imovel} key={imovel.id} />
          ))}
        </div>
      )}
    </div>
  );
}
