import { ErrorBoundary } from "@/components/error-boundary";
import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import { GithubCallback } from "@/pages/auth/github-callback";
import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { Verification } from "@/pages/auth/verification";
import { DashboardHome } from "@/pages/home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
          {
            path: "verification",
            Component: Verification,
          },
          {
            path: "callback",
            Component: GithubCallback,
          },
        ],
      },
      {
        Component: DashboardLayout,
        children: [{ index: true, Component: DashboardHome }],
      },
    ],
  },
]);

export default router;
