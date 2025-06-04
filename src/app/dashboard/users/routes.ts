import type { RouteObject } from "react-router";
import { userLoader } from "./loader";
import UserPage from "./page";

export const userRoute: RouteObject = {
  path: "users",
  children: [
    {
      index: true,
      loader: userLoader,
      Component: UserPage,
    },
  ],
};
