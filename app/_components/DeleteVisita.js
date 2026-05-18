"use client";

import { useState, useTransition } from "react";
import {
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { cancelarVisita } from "../_lib/actions";

function DeleteVisita({ visitaId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      cancelarVisita(visitaId);

      setIsOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-400 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-colors border border-red-900/50"
      >
        <TrashIcon className="h-5 w-5" />
        <span>Cancelar Visita</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-primary-900 border border-primary-800 p-8 rounded-3xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-red-900/20 p-4 rounded-full border border-red-900/50 mb-2">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
              </div>

              <h3 className="text-2xl font-bold text-primary-50">
                Cancelar Agendamento?
              </h3>

              <p className="text-primary-300 text-lg">
                Tem certeza que deseja cancelar esta visita? Esta ação não
                poderá ser desfeita.
              </p>

              <div className="flex gap-4 w-full mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="flex-1 px-6 py-4 bg-primary-800 hover:bg-primary-700 text-primary-50 font-semibold rounded-xl transition-colors border border-primary-700"
                >
                  Voltar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:text-red-300 text-white font-semibold rounded-xl transition-colors flex justify-center items-center gap-2"
                >
                  {isPending ? "Cancelando..." : "Sim, Cancelar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteVisita;
