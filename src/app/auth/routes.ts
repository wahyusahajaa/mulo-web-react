import AuthLayout from "@/layouts/auth-layout";
import type { RouteObject } from "react-router";
import { Login } from "./login/page";
import { Register } from "./register/page";
import { Verification } from "./verification/page";
import { GithubCallback } from "./callback/github-callback";

export const authRoute: RouteObject = {
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
};
