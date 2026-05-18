import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DeleteVisita from "./DeleteVisita";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

function ContratoCard({ contrato }) {
  const { id, data_visita, imoveis } = contrato;

  const nomeImovel = imoveis?.name || "Imóvel não encontrado";
  const enderecoImovel = imoveis?.endereco || "Endereço indisponível";
  const imagemImovel = imoveis?.image;

  const isSemFoto = !imagemImovel || imagemImovel === "EMPTY";

  const dataFormatada = format(parseISO(data_visita), "dd 'de' MMMM", {
    locale: ptBR,
  });
  const horaFormatada = format(parseISO(data_visita), "HH:mm");

  return (
    <li className="flex flex-col md:flex-row bg-primary-900 border border-primary-800 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-48 md:h-auto md:w-64 bg-primary-950 shrink-0 border-r border-primary-800">
        {!isSemFoto ? (
          <Image
            src={imagemImovel}
            alt={nomeImovel}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-500 text-sm p-4 text-center">
            Sem foto disponível
          </div>
        )}
      </div>

      <div className="flex-grow p-6 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold text-primary-50 mb-2">
              {nomeImovel}
            </h3>
            <div className="flex items-center gap-2 text-primary-300">
              <MapPinIcon className="h-5 w-5 text-accent-500" />
              <span>{enderecoImovel}</span>
            </div>
          </div>

          <div className="bg-primary-950 px-6 py-3 rounded-xl border border-primary-800 text-center min-w-[160px]">
            <p className="text-accent-400 font-bold text-lg">{dataFormatada}</p>

            <p className="text-primary-300 text-sm uppercase tracking-wider">
              às {horaFormatada}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end mt-8 pt-6 border-t border-primary-800">
          <DeleteVisita visitaId={id} />
        </div>
      </div>
    </li>
  );
}

export default ContratoCard;
