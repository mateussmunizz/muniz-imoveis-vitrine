import {
  HomeModernIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { enviarAnuncio } from "../_lib/actions";
import Link from "next/link";

export const metadata = {
  title: "Anuncie seu Imóvel",
};

export default function Page({ searchParams }) {
  const sucesso = searchParams?.sucesso === "true";

  return (
    <div className="max-w-7xl mx-auto mt-12 mb-24 px-4 flex flex-col lg:flex-row gap-16">
      <div className="lg:w-1/2">
        <h1 className="text-5xl font-extrabold text-primary-900 mb-6 leading-tight tracking-tight">
          Alugue ou venda o seu imóvel de forma rápida e segura.
        </h1>
        <p className="text-xl text-primary-700 mb-12 leading-relaxed font-medium">
          Deixe a burocracia com a gente. Na Muniz Imóveis, o seu patrimônio é
          tratado com a experiência de 9 anos de mercado e a mais alta
          tecnologia.
        </p>

        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="bg-primary-900 p-4 rounded-full text-accent-500 shadow-md">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                Avaliação Precisa
              </h3>
              <p className="text-primary-700 text-lg font-medium">
                Analisamos o mercado da Zona Norte para precificar seu imóvel
                com máxima rentabilidade.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-primary-900 p-4 rounded-full text-accent-500 shadow-md">
              <HomeModernIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                Fotos Profissionais
              </h3>
              <p className="text-primary-700 text-lg font-medium">
                Seu imóvel anunciado com qualidade de vitrine para atrair os
                melhores clientes.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-primary-900 p-4 rounded-full text-accent-500 shadow-md">
              <CurrencyDollarIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                Garantia de Recebimento
              </h3>
              <p className="text-primary-700 text-lg font-medium">
                Análise de crédito rigorosa para você não ter dores de cabeça
                com inadimplência.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2">
        <div className="bg-primary-900 border border-primary-800 p-10 rounded-2xl shadow-2xl">
          {sucesso ? (
            <div className="text-center py-10 flex flex-col items-center">
              <CheckCircleIcon className="h-24 w-24 text-accent-500 mb-6" />
              <h2 className="text-4xl font-bold text-primary-50 mb-4">
                Tudo certo!
              </h2>
              <p className="text-xl text-primary-200 mb-8 leading-relaxed">
                Recebemos os dados do seu imóvel. A nossa equipe vai analisar as
                informações e entrará em contato consigo pelo WhatsApp em breve.
              </p>
              <Link
                href="/"
                className="bg-primary-800 hover:bg-primary-700 text-primary-100 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-md"
              >
                Voltar ao início
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-primary-50 mb-8">
                Comece o seu cadastro
              </h2>

              <form action={enviarAnuncio} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="nome"
                      className="text-primary-200 font-medium"
                    >
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="bg-primary-950 border border-primary-800 px-5 py-4 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="telefone"
                      className="text-primary-200 font-medium"
                    >
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      className="bg-primary-950 border border-primary-800 px-5 py-4 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="endereco"
                    className="text-primary-200 font-medium"
                  >
                    Endereço do Imóvel
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    required
                    placeholder="Ex: Rua Voluntários da Pátria, 1234 - Santana"
                    className="bg-primary-950 border border-primary-800 px-5 py-4 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="tipo_negocio"
                      className="text-primary-200 font-medium"
                    >
                      O que deseja fazer?
                    </label>
                    <select
                      id="tipo_negocio"
                      name="tipo_negocio"
                      className="bg-primary-950 border border-primary-800 px-5 py-4 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-lg appearance-none"
                    >
                      <option value="alugar">Quero Alugar</option>
                      <option value="vender">Quero Vender</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="tipo_imovel"
                      className="text-primary-200 font-medium"
                    >
                      Tipo de Imóvel
                    </label>
                    <select
                      id="tipo_imovel"
                      name="tipo_imovel"
                      className="bg-primary-950 border border-primary-800 px-5 py-4 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-lg appearance-none"
                    >
                      <option value="apartamento">Apartamento</option>
                      <option value="casa">Casa de Rua / Vila</option>
                      <option value="studio">Studio</option>
                      <option value="comercial">Comercial</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-8 py-5 rounded-xl text-xl mt-4 transition-all shadow-lg active:scale-95"
                >
                  Enviar para Avaliação
                </button>
                <p className="text-primary-400 text-sm text-center mt-4">
                  Nossa equipe entrará em contato em até 24 horas úteis.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
