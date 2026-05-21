import AccountSidebar from "@/components/layout/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* SURGICAL FIX: Added dark:bg-[#0D0D0D] and transition */
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0D0D0D] pt-32 pb-20 px-4 md:px-10 lg:px-16 transition-colors duration-500">
      {/* RESPONSIVE UPGRADE: Shifted breakpoint from md:flex-row to lg:flex-row to give components max breathing room */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-10">
        <AccountSidebar />
        <main className="flex-1 w-full lg:max-w-none">{children}</main>
      </div>
    </div>
  );
}
