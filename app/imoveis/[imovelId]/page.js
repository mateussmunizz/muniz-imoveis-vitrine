import { getImovel, getCliente, getFavoritos } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import ShareButton from "@/app/_components/ShareButton";
import BotaoFavorito from "@/app/_components/BotaoFavorito";
import GaleriaImovel from "@/app/_components/GaleriaImovel";
import MapaImovel from "@/app/_components/MapaImovel";
import Link from "next/link";

import {
  ArrowsPointingOutIcon,
  HomeIcon,
  UserIcon as BathIcon,
  TruckIcon,
  FaceSmileIcon as PawIcon,
  BuildingStorefrontIcon as FurnitureIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Detalhes do Imóvel",
};

const WHATSAPP_NUMBER = "5511999999999";
const EMAIL_CONTACT = "contato@suaimobiliaria.com.br";

export default async function Page({ searchParams, params }) {
  const routeParams = await params;
  const idDaUrl = routeParams?.imovelId || routeParams?.imovelid;
  const imovel = await getImovel(idDaUrl);

  const session = await auth();
  let clienteId = null;
  let isFavoritedInicial = false;

  if (session?.user?.email) {
    const cliente = await getCliente(session.user.email);
    if (cliente) {
      clienteId = cliente.id;
      const favoritosIds = await getFavoritos(cliente.id);
      isFavoritedInicial = favoritosIds.includes(imovel?.id);
    }
  }

  if (!imovel) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-primary-900 mb-6">
          Imóvel não encontrado
        </h1>
        <Link
          href="/imoveis"
          className="text-accent-600 hover:text-accent-700 underline text-xl"
        >
          Voltar para a lista de imóveis
        </Link>
      </div>
    );
  }

  const {
    id,
    name,
    image,
    description,
    regularPrice,
    discount,
    area_m2,
    quartos,
    banheiros,
    vagas,
    valor_condominio,
    valor_iptu,
    codigo_imovel,
    galeria_imagens,
    endereco,
    aceita_pet,
    mobiliado,
  } = imovel;

  const imagemSegura =
    !image || image === "EMPTY"
      ? "https://placehold.co/1200x800/1f2937/a3a8bf?text=Sem+Foto"
      : image;

  const precoBase = regularPrice - (discount || 0);
  const valorTotal = precoBase + (valor_condominio || 0) + (valor_iptu || 0);

  const wppMessage = encodeURIComponent(
    `Olá! Tenho interesse no imóvel "${name}" (Ref: ${codigo_imovel || id}) que vi no site.`,
  );

  return (
    <div className="max-w-7xl mx-auto mt-8 mb-24 px-4 overflow-x-hidden">
      <div className="w-full max-w-full overflow-hidden">
        <GaleriaImovel
          imagemPrincipal={imagemSegura}
          galeria={galeria_imagens}
        />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-12 md:gap-16 mt-8">
        <div className="order-1 lg:col-span-1">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-6">
            <div>
              <p className="text-primary-600 font-bold mb-2 uppercase tracking-wide text-sm">
                Código: {codigo_imovel || id}
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-900 leading-tight mb-6 break-all sm:break-words">
                {name}
              </h1>
            </div>
            <div className="flex gap-4 shrink-0">
              <BotaoFavorito
                imovelId={id}
                clienteId={clienteId}
                isFavoritedInicial={isFavoritedInicial}
              />
              <ShareButton title={name} text={`Confira este imóvel: ${name}`} />
            </div>
          </div>

          <div className="mb-12 border-y border-primary-200 py-10">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">
              Características do Imóvel
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-primary-700 font-medium">
              <div className="flex items-center gap-3">
                <ArrowsPointingOutIcon className="h-7 w-7 text-accent-600 shrink-0" />
                <span className="text-lg">{area_m2 || 0} m²</span>
              </div>
              <div className="flex items-center gap-3">
                <HomeIcon className="h-7 w-7 text-accent-600 shrink-0" />
                <span className="text-lg">{quartos || 0} quartos</span>
              </div>
              <div className="flex items-center gap-3">
                <BathIcon className="h-7 w-7 text-accent-600 shrink-0" />
                <span className="text-lg">{banheiros || 0} banheiros</span>
              </div>
              <div className="flex items-center gap-3">
                <TruckIcon className="h-7 w-7 text-accent-600 shrink-0" />
                <span className="text-lg">{vagas || 0} vagas</span>
              </div>
              <div className="flex items-center gap-3">
                <PawIcon className="h-7 w-7 text-accent-600 shrink-0" />
                <span className="text-lg">
                  {aceita_pet ? "Aceita pet" : "Não aceita"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FurnitureIcon className="h-7 w-7 text-accent-600 shrink-0" />
                <span className="text-lg">
                  {mobiliado ? "Mobiliado" : "Sem mobília"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              Sobre o imóvel
            </h2>
            <p className="text-lg md:text-xl text-primary-700 leading-relaxed whitespace-pre-line font-medium">
              {description}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              Explore a região
            </h2>
            <MapaImovel endereco={endereco} />
          </div>
        </div>

        <div className="order-2 relative w-full h-full">
          <div className="sticky top-32 bg-primary-900 border border-primary-800 rounded-2xl p-6 md:p-8 shadow-2xl w-full">
            <h3 className="text-2xl font-bold text-primary-50 mb-6 border-b border-primary-800 pb-4">
              Valores
            </h3>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center text-primary-200">
                <span className="text-lg">Valor Base</span>
                <span className="font-semibold text-primary-50 text-xl">
                  R$ {precoBase.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center text-primary-200">
                <span className="text-lg">Condomínio</span>
                <span className="font-semibold text-primary-50 text-xl">
                  R$ {valor_condominio || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-primary-200">
                <span className="text-lg">IPTU</span>
                <span className="font-semibold text-primary-50 text-xl">
                  R$ {valor_iptu || 0}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 border-t border-primary-800 mb-8">
              <span className="text-2xl font-bold text-primary-50">Total</span>
              <span className="text-3xl md:text-4xl font-bold text-accent-400">
                R$ {valorTotal.toLocaleString("pt-BR")}
              </span>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${wppMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                Falar no WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL_CONTACT}?subject=Interesse no Imóvel ${codigo_imovel || id}`}
                className="w-full bg-primary-800 hover:bg-primary-700 text-primary-50 font-bold py-4 rounded-xl text-center border border-primary-700 transition-all"
              >
                Enviar E-mail
              </a>
            </div>

            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-primary-800"></div>
              <span className="flex-shrink-0 mx-4 text-primary-400 text-sm uppercase tracking-wider">
                ou agende online
              </span>
              <div className="flex-grow border-t border-primary-800"></div>
            </div>

            <Link
              href={`/account/contratos/novo?imovel=${id}`}
              className="block w-full bg-accent-500 hover:bg-accent-600 text-primary-900 text-center text-xl font-bold py-5 rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              Agendar Visita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
