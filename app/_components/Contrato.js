import DateSelector from "./DateSelector";
import ContratoForm from "./ContratoForm";
import LoginMessage from "./LoginMessage";
import { auth } from "../_lib/auth";

export default async function Contrato({ imovel }) {
  const session = await auth();

  return (
    <div className="grid grid-cols-1 border border-primary-800 min-h-[400px] md:grid-cols-2">
      <DateSelector imovel={imovel} />

      {session?.user ? (
        <ContratoForm imovel={imovel} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
