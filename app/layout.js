import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ContratoProvider } from "./_components/ContratoContext";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / Muniz Imóveis",
    default: "Bem-vindo / Muniz Imóveis",
  },
  description:
    "Encontre o seu novo lar com a Muniz Imóveis. Excelência, privacidade e segurança 100% garantidas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${josefin.className} overflow-x-hidden max-w-[100vw] antialiased bg-stone-50 text-primary-900 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-4 md:px-8 py-12 grid">
          <main className="max-w-[100rem] mx-auto w-full">
            <ContratoProvider>{children}</ContratoProvider>
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
