"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

function BuscaImoveis() {
  const [tipoNegocio, setTipoNegocio] = useState("locacao");
  const [termo, setTermo] = useState("");
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tipoNegocio) params.set("tipo", tipoNegocio);
    if (termo) params.set("query", termo);

    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-5xl bg-primary-900/50 backdrop-blur-md p-8 rounded-2xl border border-primary-800 shadow-2xl">
      <div className="flex gap-8 mb-8 border-b border-primary-800">
        <button
          onClick={() => setTipoNegocio("locacao")}
          className={`pb-4 text-xl font-semibold transition-all relative ${
            tipoNegocio === "locacao"
              ? "text-accent-400"
              : "text-primary-400 hover:text-primary-100"
          }`}
        >
          Alugar
          {tipoNegocio === "locacao" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent-400 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setTipoNegocio("venda")}
          className={`pb-4 text-xl font-semibold transition-all relative ${
            tipoNegocio === "venda"
              ? "text-accent-400"
              : "text-primary-400 hover:text-primary-100"
          }`}
        >
          Comprar
          {tipoNegocio === "venda" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent-400 rounded-full" />
          )}
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <MapPinIcon className="h-7 w-7 text-primary-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-accent-400 transition-colors" />
          <input
            type="text"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Cidade, bairro ou código do imóvel (Ex: MI-101)..."
            className="w-full bg-primary-950 border border-primary-800 py-5 pl-14 pr-6 rounded-xl text-xl text-primary-100 placeholder:text-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all"
          />
        </div>

        <button
          type="submit"
          className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-10 py-5 rounded-xl text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
          Buscar Imóveis
        </button>
      </form>
    </div>
  );
}

export default BuscaImoveis;
