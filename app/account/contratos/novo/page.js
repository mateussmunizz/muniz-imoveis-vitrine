import { getImovel, getCliente } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";
import AgendamentoForm from "@/app/_components/AgendamentoForm";

export const metadata = {
  title: "Agendar Visita",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const imovelId = params?.imovel;

  const session = await auth();
  let clienteId = null;
  if (session?.user?.email) {
    const cliente = await getCliente(session.user.email);
    if (cliente) {
      clienteId = cliente.id;
    }
  }

  const imovel = imovelId ? await getImovel(imovelId) : null;

  if (!imovel) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-accent-400 mb-6">
          Imóvel não encontrado
        </h1>
        <p className="text-primary-300 mb-8 text-xl">
          ID do imóvel: {imovelId || "Não fornecido"}
        </p>
        <Link
          href="/imoveis"
          className="text-accent-500 hover:text-accent-400 underline text-xl"
        >
          Voltar para a lista de imóveis
        </Link>
      </div>
    );
  }

  const { name, image, regularPrice, discount, id, tipo_negocio } = imovel;
  const precoBase = regularPrice - (discount || 0);

  const isSemFoto = !image || image === "EMPTY";

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-accent-400 mb-10">
        Agendar Visita
      </h1>

      <div className="flex flex-col md:flex-row gap-12 bg-primary-900 border border-primary-800 rounded-2xl p-8 shadow-2xl">
        <div className="md:w-1/2 flex flex-col">
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 shadow-md border border-primary-800 bg-primary-950">
            {!isSemFoto ? (
              <Image src={image} fill className="object-cover" alt={name} />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-primary-500">
                <span className="font-medium text-lg">Sem foto disponível</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-primary-50 mb-2">{name}</h2>
          <p className="text-xl text-primary-300 mb-6 font-semibold text-accent-400">
            {tipo_negocio === "locacao" ? "Aluguel" : "Valor"}: R${" "}
            {precoBase.toLocaleString("pt-BR")}
          </p>
        </div>

        <div className="md:w-1/2">
          <AgendamentoForm imovelId={id} clienteId={clienteId} />
        </div>
      </div>
    </div>
  );
}
