import DashboardLayout from "@/layouts/dashboard-layout";
import type { RouteObject } from "react-router";
import { DashboardDemoPage } from "../demo-page";
import { artistRoute } from "./artists/routes";
import { userRoute } from "./users/routes";

export const dashboardRoute: RouteObject = {
  path: "dashboard",
  Component: DashboardLayout,
  children: [
    {
      index: true,
      Component: DashboardDemoPage,
    },
    userRoute,
    artistRoute,
  ],
};
