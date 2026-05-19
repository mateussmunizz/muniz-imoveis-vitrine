import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src="/logo.png"
        height={300}
        width={300}
        alt="Logo Muniz Imóveis"
        className="h-12 w-auto md:h-[150px] md:w-auto object-contain transition-all"
      />
    </Link>
  );
}

export default Logo;
