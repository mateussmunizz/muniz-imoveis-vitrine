import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 w-full md:w-auto mt-4 md:mt-0">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm md:text-base w-full">
        <li>
          <Link
            href="/imoveis"
            className="hover:text-accent-400 transition-colors font-medium"
          >
            IMÓVEIS
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors font-medium"
          >
            SOBRE NÓS
          </Link>
        </li>

        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2 font-medium"
            >
              <img
                className="h-8 md:h-10 rounded-full border border-primary-800"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>ÁREA DO CLIENTE</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors font-medium"
            >
              ÁREA DO CLIENTE
            </Link>
          )}
        </li>

        <li className="w-full flex justify-center md:w-auto md:block mt-2 md:mt-0">
          <Link
            href="/anunciar"
            className="bg-accent-500 px-6 py-2.5 md:py-3 rounded-lg text-primary-900 font-bold hover:bg-accent-600 transition-all shadow-md text-center w-full md:w-auto block"
          >
            ANUNCIAR IMÓVEL
          </Link>
        </li>
      </ul>
    </nav>
  );
}
