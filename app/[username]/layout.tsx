import { DashboardNavbar } from "@/components/dash-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <DashboardNavbar/>
      {children}
    </div>
  );
}