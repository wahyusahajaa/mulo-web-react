import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/protected-route";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";

export default function AppLayout() {
  const location = useLocation();

  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
          <SiteHeader />
          <main className="p-4 md:p-6 mt-12">
            <Outlet key={location.key} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
