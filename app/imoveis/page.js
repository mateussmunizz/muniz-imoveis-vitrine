import ImovelCard from "@/app/_components/ImovelCard";
import SearchSystem from "@/app/_components/SearchSystem";
import { getImoveis, getCliente, getFavoritos } from "@/app/_lib/data-service";

export const metadata = {
  title: "Nossos Imóveis",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const filtroAtual = params?.tipo ?? "aluguel";
  const cidadeAtual = params?.cidade?.toLowerCase() ?? "";
  const bairroAtual = params?.bairro?.toLowerCase() ?? "";
  const valorMaxAtual = Number(params?.valorMax) || 0;
  const quartosAtual = Number(params?.quartos) || 0;
  const vagasAtual = Number(params?.vagas) || 0;

  const imoveis = await getImoveis();

  // Ele vai listar os imóveis e mostrar se o 'name' ou 'endereco' estão vazios (undefined).
  console.log(
    "IMÓVEIS DO BANCO:",
    imoveis.map((i) => ({
      nome: i.name,
      endereco: i.endereco,
      negocio: i.tipo_negocio,
    })),
  );

  let imoveisFiltrados = imoveis;

  // 1. Filtro de Categoria (Aluguel / Venda)
  if (filtroAtual === "aluguel") {
    imoveisFiltrados = imoveisFiltrados.filter(
      (imovel) =>
        imovel.tipo_negocio?.toLowerCase() === "alugar" ||
        imovel.tipo_negocio?.toLowerCase() === "aluguel" ||
        imovel.tipo_negocio?.toLowerCase() === "locacao",
    );
  } else if (filtroAtual === "venda") {
    imoveisFiltrados = imoveisFiltrados.filter(
      (imovel) =>
        imovel.tipo_negocio?.toLowerCase() === "vender" ||
        imovel.tipo_negocio?.toLowerCase() === "venda",
    );
  }

  // Função auxiliar para remover acentos e espaços extras (A Blindagem)
  const prepararTexto = (texto) =>
    String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const buscaCidadeNormalizada = prepararTexto(cidadeAtual);
  const buscaBairroNormalizada = prepararTexto(bairroAtual);

  // 2. Filtros de Texto Blindados (Junta nome, endereço e descrição)
  if (buscaCidadeNormalizada) {
    imoveisFiltrados = imoveisFiltrados.filter((imovel) => {
      const textoImovel = prepararTexto(
        `${imovel.name} ${imovel.endereco} ${imovel.description}`,
      );
      return textoImovel.includes(buscaCidadeNormalizada);
    });
  }

  if (buscaBairroNormalizada) {
    imoveisFiltrados = imoveisFiltrados.filter((imovel) => {
      const textoImovel = prepararTexto(
        `${imovel.name} ${imovel.endereco} ${imovel.description}`,
      );
      return textoImovel.includes(buscaBairroNormalizada);
    });
  }

  // 3. Filtro de Valor
  if (valorMaxAtual > 0) {
    imoveisFiltrados = imoveisFiltrados.filter((imovel) => {
      const price = Number(imovel.regularPrice) || 0;
      const discount = Number(imovel.discount) || 0;
      const precoBase = price - discount;
      return precoBase > 0 && precoBase <= valorMaxAtual;
    });
  }

  // 4. Filtros Numéricos
  if (quartosAtual > 0) {
    imoveisFiltrados = imoveisFiltrados.filter(
      (i) => Number(i.quartos || 0) >= quartosAtual,
    );
  }
  if (vagasAtual > 0) {
    imoveisFiltrados = imoveisFiltrados.filter(
      (i) => Number(i.vagas || 0) >= vagasAtual,
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-24">
      <SearchSystem />

      {imoveisFiltrados.length === 0 ? (
        <div className="bg-primary-900 p-12 rounded-2xl border border-primary-800 text-center shadow-md">
          <p className="text-2xl text-primary-200">
            Nenhum imóvel encontrado com estes critérios.
          </p>
          <p className="text-primary-400 mt-3 text-lg">
            Experimente remover alguns filtros ou aumentar o limite de preço.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {imoveisFiltrados.map((imovel) => (
            <ImovelCard imovel={imovel} key={imovel.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export const revalidate = 0;
