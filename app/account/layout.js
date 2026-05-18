import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[18rem_1fr] gap-8 md:gap-16 w-full px-4 md:px-0 mt-6">
      <div className="bg-primary-950 rounded-2xl p-4 shadow-xl border border-primary-900/50 h-fit">
        <SideNavigation />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
