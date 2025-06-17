import { authRoute } from "@/app/auth/routes";
import { dashboardRoute } from "@/app/dashboard/routes";
import { ErrorBoundary } from "@/components/error-boundary";
import AppLayout from "@/layouts/app-layout";
import RootLayout from "@/layouts/root-layout";
import { createBrowserRouter } from "react-router";
import DashboardHome from "./app/page";

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
            Component: DashboardHome,
          },
          dashboardRoute,
        ],
      },
    ],
  },
]);

export default router;
