import Image from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  HomeIcon,
  UserIcon as BathIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

function ImovelCard({ imovel }) {
  const {
    id,
    name,
    image,
    endereco,
    regularPrice,
    discount,
    quartos,
    banheiros,
    vagas,
    tipo_negocio,
  } = imovel;

  const precoFinal = (regularPrice || 0) - (discount || 0);

  const isSemFoto = !image || image === "EMPTY";

  return (
    <Link
      href={`/imoveis/${id}`}
      className="flex flex-col w-full bg-primary-900 border border-primary-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
    >
      <div className="relative w-full aspect-video md:aspect-[4/3] bg-primary-950">
        <div className="absolute top-3 md:top-5 left-3 md:left-5 z-10 bg-accent-500 text-primary-900 text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-2 rounded-full uppercase tracking-wider shadow-md">
          {tipo_negocio === "locacao" ? "Aluguel" : "Venda"}
        </div>

        {!isSemFoto ? (
          <Image
            src={image}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            alt={name}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-600 bg-primary-950">
            <span className="font-medium md:text-lg">
              Sem imagem no momento
            </span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-8 flex flex-col flex-1">
        <h3
          className="text-xl md:text-3xl font-bold text-primary-50 mb-2 md:mb-4 line-clamp-1"
          title={name}
        >
          {name}
        </h3>

        <div className="flex items-center gap-2 text-primary-300 text-sm md:text-base mb-4 md:mb-6">
          <MapPinIcon className="h-4 w-4 md:h-6 md:w-6 shrink-0" />
          <span className="line-clamp-1">{endereco}</span>
        </div>

        <div className="flex items-center gap-4 text-primary-200 text-sm md:text-lg mb-6 md:mb-8 border-b border-primary-800 pb-4 md:pb-6">
          <div
            className="flex items-center gap-1 md:gap-2"
            title={`${quartos || 0} quartos`}
          >
            <HomeIcon className="h-4 w-4 md:h-6 md:w-6 text-primary-400" />
            <span>{quartos || 0}</span>
          </div>
          <div
            className="flex items-center gap-1 md:gap-2"
            title={`${banheiros || 0} banheiros`}
          >
            <BathIcon className="h-4 w-4 md:h-6 md:w-6 text-primary-400" />
            <span>{banheiros || 0}</span>
          </div>
          <div
            className="flex items-center gap-1 md:gap-2"
            title={`${vagas || 0} vagas`}
          >
            <TruckIcon className="h-4 w-4 md:h-6 md:w-6 text-primary-400" />
            <span>{vagas || 0}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col">
          <span className="text-primary-400 text-sm md:text-base font-medium mb-1 md:mb-2">
            {tipo_negocio === "locacao" ? "Mensalidade" : "Valor do imóvel"}
          </span>
          <div className="text-2xl md:text-4xl font-bold text-accent-400">
            R$ {precoFinal.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ImovelCard;
