"use client";

import { useFormState } from "react-dom";
import { updateProfile } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

// Estado inicial vazio antes do cliente clicar em salvar
const initialState = { message: null, type: null };

export default function ProfileForm({ cliente }) {
  // Esta ferramenta liga o formulário à nossa ação e escuta a resposta
  const [state, formAction] = useFormState(updateProfile, initialState);

  return (
    <form
      action={formAction}
      className="bg-primary-900 py-10 px-12 text-lg flex flex-col gap-8 rounded-2xl border border-primary-800 shadow-lg"
    >
      {/* Aqui entra a nossa Caixa de Aviso de Sucesso ou Erro */}
      {state.message && (
        <div
          className={`p-4 rounded-xl text-center font-bold transition-all ${
            state.type === "success"
              ? "bg-green-900/50 text-green-400 border border-green-800"
              : "bg-red-900/50 text-red-400 border border-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-primary-300 font-medium">
          Endereço de E-mail
        </label>
        <input
          disabled
          defaultValue={cliente.email}
          name="email"
          id="email"
          className="px-5 py-4 bg-primary-950 text-primary-400 rounded-xl border border-primary-800 cursor-not-allowed shadow-sm"
        />
        <span className="text-sm text-primary-400">
          O e-mail não pode ser alterado pois é a sua chave de acesso.
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="nome" className="text-primary-300 font-medium">
          Nome Completo
        </label>
        <input
          defaultValue={cliente.fullName || ""}
          name="nome"
          id="nome"
          required
          className="px-5 py-4 bg-primary-950 text-primary-100 rounded-xl border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="telefone" className="text-primary-300 font-medium">
          Telefone / WhatsApp
        </label>
        <input
          defaultValue={cliente.telefone || ""}
          name="telefone"
          id="telefone"
          placeholder="(11) 99999-9999"
          className="px-5 py-4 bg-primary-950 text-primary-100 rounded-xl border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all shadow-sm"
        />
      </div>

      <div className="flex justify-end items-center mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
