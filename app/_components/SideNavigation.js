"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  HomeIcon,
  CalendarDaysIcon,
  HeartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  {
    name: "Painel",
    href: "/account",
    icon: <HomeIcon className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    name: "Agendamentos",
    href: "/account/contratos",
    icon: <CalendarDaysIcon className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    name: "Favoritos",
    href: "/account/favoritos",
    icon: <HeartIcon className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    name: "Perfil",
    href: "/account/perfil",
    icon: <UserIcon className="h-4 w-4 md:h-5 md:w-5" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <ul className="flex flex-wrap justify-center md:flex-col gap-2 w-full">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`py-2 px-3 md:py-3 md:px-4 text-xs md:text-base hover:bg-primary-900 transition-colors flex items-center gap-2 font-semibold text-primary-200 rounded-lg ${
                pathname === link.href ? "bg-primary-900 text-accent-400" : ""
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-base hover:bg-primary-900 transition-colors flex items-center gap-2 font-semibold text-primary-200 rounded-lg w-full text-left"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>Sair</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
