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
      />
    </Link>
  );
}

export default Logo;
