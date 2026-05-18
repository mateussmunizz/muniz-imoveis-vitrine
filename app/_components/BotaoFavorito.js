"use client";

import { useState, useTransition } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { toggleFavorito } from "../_lib/actions";

function BotaoFavorito({ imovelId, clienteId, isFavoritedInicial }) {
  const [isPending, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(isFavoritedInicial);

  function handleToggle() {
    if (!clienteId) {
      alert("Faça login para favoritar imóveis.");
      return;
    }

    startTransition(() => {
      toggleFavorito(imovelId, clienteId, isFavorited);
    });

    setIsFavorited(!isFavorited);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="flex items-center gap-2 text-primary-300 hover:text-red-400 transition-colors font-medium border border-primary-700 px-4 py-2 rounded-lg hover:bg-primary-800 disabled:opacity-50"
    >
      {isFavorited ? (
        <HeartSolid className="h-5 w-5 text-red-500 transition-transform active:scale-90" />
      ) : (
        <HeartOutline className="h-5 w-5 transition-transform active:scale-90" />
      )}
      <span className="hidden sm:inline">
        {isFavorited ? "Salvo" : "Salvar"}
      </span>
    </button>
  );
}

export default BotaoFavorito;
