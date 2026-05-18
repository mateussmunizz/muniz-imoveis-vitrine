import { auth } from "../_lib/auth";
import Link from "next/link";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/outline";

export const revalidate = 0;

export default async function AccountDashboard() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "Cliente";

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-5xl font-extrabold text-primary-900 mb-4 tracking-tight">
        Bem-vindo(a), {firstName}
      </h1>

      <p className="text-base md:text-xl text-primary-700 mb-10 font-medium">
        Acreditamos que encontrar o lar perfeito deve ser uma jornada
        transparente e segura. Selecione uma opção no menu para gerenciar sua
        conta.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Link
          href="/account/agendamentos"
          className="bg-primary-900 border border-primary-800 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group"
        >
          <div className="bg-primary-800 w-fit p-4 rounded-full mb-6 group-hover:bg-primary-700 transition-colors">
            <CalendarDaysIcon className="h-8 w-8 text-accent-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-50 mb-3">
            Meus Agendamentos
          </h2>
          <p className="text-primary-300 text-sm md:text-base leading-relaxed">
            Acompanhe horários, status e gerencie suas visitas aos nossos
            imóveis.
          </p>
        </Link>

        <Link
          href="/account/perfil"
          className="bg-primary-900 border border-primary-800 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group"
        >
          <div className="bg-primary-800 w-fit p-4 rounded-full mb-6 group-hover:bg-primary-700 transition-colors">
            <UserIcon className="h-8 w-8 text-accent-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-50 mb-3">
            Meu Perfil
          </h2>
          <p className="text-primary-300 text-sm md:text-base leading-relaxed">
            Mantenha os seus dados e WhatsApp atualizados para facilitar nosso
            atendimento.
          </p>
        </Link>
      </div>
    </div>
  );
}
