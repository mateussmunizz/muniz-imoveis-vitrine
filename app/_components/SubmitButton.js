"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-10 rounded-xl transition-all disabled:cursor-not-allowed disabled:bg-primary-600 disabled:text-primary-300 shadow-md"
    >
      {pending ? "Atualizando..." : "Salvar alterações"}
    </button>
  );
}
