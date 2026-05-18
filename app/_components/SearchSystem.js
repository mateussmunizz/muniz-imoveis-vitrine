"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MapPinIcon,
  MapIcon,
  CurrencyDollarIcon,
  HomeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

function SearchSystem() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [tipo, setTipo] = useState(searchParams.get("tipo") ?? "aluguel");
  const [cidade, setCidade] = useState(searchParams.get("cidade") ?? "");
  const [bairro, setBairro] = useState(searchParams.get("bairro") ?? "");
  const [valorMax, setValorMax] = useState(searchParams.get("valorMax") ?? "");
  const [quartos, setQuartos] = useState(searchParams.get("quartos") ?? "");
  const [banheiros, setBanheiros] = useState(
    searchParams.get("banheiros") ?? "",
  );
  const [vagas, setVagas] = useState(searchParams.get("vagas") ?? "");

  function handleTrocarAba(novoTipo) {
    setTipo(novoTipo);
    setValorMax("");

    const params = new URLSearchParams(searchParams);
    params.set("tipo", novoTipo);
    params.delete("valorMax");

    // Se estiver na Home, redireciona para a página de catálogo
    const destination = pathname === "/" ? "/imoveis" : pathname;

    router.replace(`${destination}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();

    params.set("tipo", tipo);
    if (cidade) params.set("cidade", cidade);
    if (bairro) params.set("bairro", bairro);
    if (valorMax) params.set("valorMax", valorMax);
    if (quartos) params.set("quartos", quartos);
    if (banheiros) params.set("banheiros", banheiros);
    if (vagas) params.set("vagas", vagas);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="bg-primary-900 rounded-3xl p-6 md:p-10 shadow-2xl max-w-3xl w-full mx-auto mb-16 border border-primary-800">
      <h2 className="text-3xl md:text-5xl font-bold text-primary-50 mb-8">
        {tipo === "aluguel"
          ? "Alugue um lar para chamar de seu"
          : "Compre o imóvel dos seus sonhos"}
      </h2>

      {/* Abas */}
      <div className="flex gap-6 mb-6 border-b border-primary-800">
        <button
          type="button"
          onClick={() => handleTrocarAba("aluguel")}
          className={`pb-3 px-1 text-lg font-semibold transition-all border-b-2 ${
            tipo === "aluguel"
              ? "border-accent-500 text-accent-400"
              : "border-transparent text-primary-300 hover:text-primary-100"
          }`}
        >
          Alugar
        </button>
        <button
          type="button"
          onClick={() => handleTrocarAba("venda")}
          className={`pb-3 px-1 text-lg font-semibold transition-all border-b-2 ${
            tipo === "venda"
              ? "border-accent-500 text-accent-400"
              : "border-transparent text-primary-300 hover:text-primary-100"
          }`}
        >
          Comprar
        </button>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        {/* Cidade e Bairro em Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-primary-700 bg-primary-950 rounded-xl p-3 hover:border-accent-500 transition-colors focus-within:border-accent-500">
            <div className="flex items-center gap-2 text-primary-300 text-sm font-medium mb-1">
              <MapPinIcon className="h-5 w-5" />
              <label htmlFor="cidade">Cidade</label>
            </div>

            <input
              id="cidade"
              type="text"
              autoComplete="off"
              className="w-full bg-transparent text-primary-50 text-lg focus:outline-none placeholder:text-primary-600"
              placeholder="Ex: São Paulo"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div className="border border-primary-700 bg-primary-950 rounded-xl p-3 hover:border-accent-500 transition-colors focus-within:border-accent-500">
            <div className="flex items-center gap-2 text-primary-300 text-sm font-medium mb-1">
              <MapIcon className="h-5 w-5" />
              <label htmlFor="bairro">Bairro</label>
            </div>

            <input
              id="bairro"
              type="text"
              autoComplete="off"
              className="w-full bg-transparent text-primary-50 text-lg focus:outline-none placeholder:text-primary-600"
              placeholder="Ex: Santana"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>
        </div>

        {/* Valores e Características */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 border border-primary-700 bg-primary-950 rounded-xl p-3 hover:border-accent-500 transition-colors focus-within:border-accent-500">
            <div className="flex items-center gap-2 text-primary-300 text-sm font-medium mb-1">
              <CurrencyDollarIcon className="h-5 w-5" />
              <label htmlFor="valorMax">
                {tipo === "aluguel"
                  ? "Valor máximo do aluguel"
                  : "Valor máximo da compra"}
              </label>
            </div>
            <div className="flex items-center">
              <span className="text-primary-400 mr-2 text-lg">R$</span>

              <input
                id="valorMax"
                type="number"
                className="w-full bg-transparent text-primary-50 text-lg focus:outline-none placeholder:text-primary-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder={tipo === "aluguel" ? "Ex: 3500" : "Ex: 750000"}
                value={valorMax}
                onChange={(e) => setValorMax(e.target.value)}
              />
            </div>
          </div>

          <div className="border border-primary-700 bg-primary-950 rounded-xl p-3 hover:border-accent-500 transition-colors focus-within:border-accent-500">
            <div className="flex items-center gap-2 text-primary-300 text-sm font-medium mb-1">
              <HomeIcon className="h-5 w-5" />
              <label htmlFor="quartos">Quartos</label>
            </div>
            <select
              id="quartos"
              className="w-full bg-transparent text-primary-50 text-lg focus:outline-none appearance-none"
              value={quartos}
              onChange={(e) => setQuartos(e.target.value)}
            >
              <option value="" className="bg-primary-900">
                Qualquer
              </option>
              <option value="1" className="bg-primary-900">
                1+
              </option>
              <option value="2" className="bg-primary-900">
                2+
              </option>
              <option value="3" className="bg-primary-900">
                3+
              </option>
              <option value="4" className="bg-primary-900">
                4+
              </option>
            </select>
          </div>

          <div className="border border-primary-700 bg-primary-950 rounded-xl p-3 hover:border-accent-500 transition-colors focus-within:border-accent-500">
            <div className="flex items-center gap-2 text-primary-300 text-sm font-medium mb-1">
              <TruckIcon className="h-5 w-5" />
              <label htmlFor="vagas">Vagas</label>
            </div>
            <select
              id="vagas"
              className="w-full bg-transparent text-primary-50 text-lg focus:outline-none appearance-none"
              value={vagas}
              onChange={(e) => setVagas(e.target.value)}
            >
              <option value="" className="bg-primary-900">
                Qualquer
              </option>
              <option value="1" className="bg-primary-900">
                1+
              </option>
              <option value="2" className="bg-primary-900">
                2+
              </option>
              <option value="3" className="bg-primary-900">
                3+
              </option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold text-xl py-4 rounded-xl transition-colors shadow-lg"
        >
          Buscar imóveis
        </button>
      </form>
    </div>
  );
}

export default SearchSystem;
