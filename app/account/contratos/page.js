import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";
import { getVisitasCliente } from "@/app/_lib/data-service";
import { confirmarVisita, cancelarVisita } from "@/app/_lib/actions";

export const metadata = {
  title: "Meus Agendamentos",
};

export default async function Page() {
  const session = await auth();
  const visitas = await getVisitasCliente(session?.user?.email);

  return (
    <div className="w-full min-w-0">
      <h2 className="font-semibold text-2xl md:text-4xl text-accent-400 mb-6 md:mb-10">
        Meus Agendamentos
      </h2>

      {visitas.length === 0 ? (
        <p className="text-lg md:text-xl text-primary-200">
          Você ainda não possui visitas agendadas.
          <Link href="/imoveis" className="text-accent-500 underline ml-2">
            Explorar imóveis
          </Link>
        </p>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {visitas.map((visita) => (
            <div
              key={visita.id}
              className="bg-primary-900 border border-primary-800 rounded-xl flex flex-col md:flex-row w-full overflow-hidden shadow-lg"
            >
              <div className="hidden md:block relative w-64 shrink-0 bg-primary-800">
                <Image
                  src={
                    visita.imovel?.image ||
                    "https://placehold.co/600x400/1f2937/a3a8bf?text=Sem+Foto"
                  }
                  fill
                  className="object-cover"
                  alt={visita.imovel?.name || "Imóvel"}
                />
              </div>

              <div className="p-4 md:p-6 flex flex-col w-full min-w-0">
                <div className="mb-4 w-full min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 truncate md:whitespace-normal">
                    {visita.imovel?.name}
                  </h3>
                  <p className="text-primary-300 text-sm truncate md:whitespace-normal">
                    📍 {visita.imovel?.endereco}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider border
                    ${
                      visita.status === "confirmado"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }`}
                  >
                    {visita.status}
                  </span>

                  <div className="bg-primary-950 border border-primary-800 px-3 py-1.5 rounded-md text-sm">
                    <span className="text-accent-500 font-bold">
                      {visita.data_visita}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-auto">
                  <form
                    action={confirmarVisita.bind(null, visita.id)}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-500 text-white py-3 sm:py-2 rounded-lg font-bold text-sm transition-colors"
                    >
                      Confirmar
                    </button>
                  </form>

                  <form
                    action={cancelarVisita.bind(null, visita.id)}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 text-white py-3 sm:py-2 rounded-lg font-bold text-sm transition-colors"
                    >
                      Cancelar
                    </button>
                  </form>

                  <Link
                    href={`/imoveis/${visita.imovel?.id}`}
                    className="w-full bg-primary-800 hover:bg-primary-700 text-primary-50 py-3 sm:py-2 rounded-lg font-bold text-sm text-center border border-primary-700 flex items-center justify-center"
                  >
                    Ver anúncio
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
