import { auth } from "@/app/_lib/auth";
import { getCliente } from "@/app/_lib/data-service";
import { atualizarPerfil } from "@/app/_lib/actions";

export const metadata = {
  title: "Meu Perfil",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const showSuccess = params?.success === "true";

  const session = await auth();
  const cliente = await getCliente(session?.user?.email);

  return (
    <div className="w-full min-w-0">
      <h2 className="font-semibold text-2xl md:text-4xl text-accent-400 mb-6 md:mb-10">
        Meu Perfil
      </h2>

      {showSuccess && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl shadow-lg flex items-center gap-3 mb-6 max-w-4xl">
          <svg
            className="w-6 h-6 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-bold text-lg">
            Perfil atualizado com sucesso!
          </span>
        </div>
      )}

      <div className="bg-primary-900 border border-primary-800 rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-primary-800 pb-8 text-center sm:text-left">
            <div className="h-28 w-28 shrink-0 bg-primary-800 rounded-full flex items-center justify-center text-primary-300 text-4xl font-bold uppercase overflow-hidden relative shadow-inner border-2 border-primary-700">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="object-cover h-full w-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                session?.user?.name?.charAt(0) || "U"
              )}
            </div>
            <div className="flex flex-col justify-center h-full mt-2">
              <h3 className="text-3xl font-bold text-primary-50 mb-1">
                {session?.user?.name || "Usuário"}
              </h3>
              <p className="text-primary-300 text-lg">{session?.user?.email}</p>
            </div>
          </div>

          <form action={atualizarPerfil} className="flex flex-col gap-6">
            <input type="hidden" name="email" value={session?.user?.email} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-950 p-6 rounded-xl border border-primary-800 shadow-sm flex flex-col justify-center">
                <label className="text-sm text-primary-400 uppercase tracking-wider mb-2 font-semibold">
                  Nome Completo
                </label>
                <input
                  type="text"
                  disabled
                  defaultValue={session?.user?.name || ""}
                  className="bg-transparent text-xl text-primary-100 font-medium truncate outline-none cursor-not-allowed opacity-70 w-full"
                />
              </div>

              <div className="bg-primary-950 p-6 rounded-xl border border-primary-800 shadow-sm flex flex-col justify-center">
                <label className="text-sm text-primary-400 uppercase tracking-wider mb-2 font-semibold">
                  Endereço de E-mail
                </label>
                <input
                  type="email"
                  disabled
                  defaultValue={session?.user?.email || ""}
                  className="bg-transparent text-xl text-primary-100 font-medium truncate outline-none cursor-not-allowed opacity-70 w-full"
                />
              </div>

              <div className="bg-primary-950 p-6 rounded-xl border border-primary-800 shadow-sm flex flex-col justify-center focus-within:ring-2 focus-within:ring-accent-500 transition-all">
                <label
                  htmlFor="whatsapp"
                  className="text-sm text-primary-400 uppercase tracking-wider mb-2 font-semibold"
                >
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  defaultValue={cliente?.telefone || ""}
                  placeholder="Ex: 11999999999"
                  className="bg-transparent text-xl text-primary-100 font-medium outline-none w-full"
                />
              </div>

              <div className="bg-primary-950 p-6 rounded-xl border border-primary-800 shadow-sm flex flex-col justify-center">
                <p className="text-sm text-primary-400 uppercase tracking-wider mb-2 font-semibold">
                  Membro Desde
                </p>
                <p className="text-xl text-primary-100 font-medium truncate opacity-70">
                  {cliente?.created_at
                    ? new Date(cliente.created_at).toLocaleDateString("pt-BR")
                    : "Data indisponível"}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
