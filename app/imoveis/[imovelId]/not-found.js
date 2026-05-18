import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Este imovel não pôde ser encontrado :(
      </h1>
      <Link
        href="/imoveis"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Voltar a todos os imóveis
      </Link>
    </main>
  );
}

export default NotFound;
