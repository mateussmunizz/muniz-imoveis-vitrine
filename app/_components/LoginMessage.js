import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800">
      <p className="text-center text-xl py-12 self-center">
        Por favor, faça o{" "}
        <Link
          href="/login"
          className="underline text-accent-500 hover:text-accent-400 transition-colors"
        >
          login
        </Link>{" "}
        para alugar este imóvel agora mesmo.
      </p>
    </div>
  );
}

export default LoginMessage;
