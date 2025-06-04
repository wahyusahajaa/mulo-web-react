import type { RouteObject } from "react-router";
import DashboardPage from "./page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { userRoute } from "./users/routes";

export const dashboardRoute: RouteObject = {
  path: "dashboard",
  Component: DashboardLayout,
  children: [
    {
      index: true,
      Component: DashboardPage,
    },
    userRoute,
  ],
};
