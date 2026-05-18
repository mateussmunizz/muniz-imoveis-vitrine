import ImovelCard from "./ImovelCard";
import { getImoveis } from "../_lib/data-service";

async function ImovelList() {
  const imoveis = await getImoveis();

  if (!imoveis.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {imoveis.map((imovel) => (
        <ImovelCard imovel={imovel} key={imovel.id} />
      ))}
    </div>
  );
}

export default ImovelList;
