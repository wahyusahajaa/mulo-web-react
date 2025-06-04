import { authRoute } from "@/app/auth/routes";
import DashboardPage from "@/app/dashboard/page";
import { dashboardRoute } from "@/app/dashboard/routes";
import { ErrorBoundary } from "@/components/error-boundary";
import AppLayout from "@/layouts/app-layout";
import RootLayout from "@/layouts/root-layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      authRoute,
      {
        Component: AppLayout,
        children: [
          {
            index: true,
            Component: DashboardPage,
          },
          dashboardRoute,
        ],
      },
    ],
  },
]);

export default router;
