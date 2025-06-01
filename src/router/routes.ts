import Home from "@/home";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { Verification } from "@/pages/auth/verification";
import { VerificationSuccess } from "@/pages/auth/verification-success";
import { DashboardHome } from "@/pages/home";
import Sample from "@/pages/sample/page";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    index: true,
    Component: Home,
  },
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
        children: [
          {
            index: true,
            Component: Verification,
          },
          {
            path: "success",
            Component: VerificationSuccess,
          },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      {
        path: "sample",
        Component: Sample,
      },
    ],
  },
]);

export default router;
