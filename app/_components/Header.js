import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary-950 text-primary-50 border-b border-primary-900 shadow-xl transition-all">
      <div className="max-w-[100rem] mx-auto flex flex-col items-center justify-center px-4 py-3 md:py-8 gap-2 md:gap-8">
        <div className="transform md:scale-125 transition-transform origin-center">
          <Logo />
        </div>
        <div className="w-full flex justify-center md:scale-105 transition-transform origin-center">
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
