import AccountSidebar from "@/components/layout/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* SURGICAL FIX: Added dark:bg-[#0D0D0D] and transition */
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0D0D0D] pt-32 pb-20 px-4 md:px-10 lg:px-16 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start gap-10">
        <AccountSidebar />
        <main className="flex-1 w-full lg:max-w-none">{children}</main>
      </div>
    </div>
  );
}
