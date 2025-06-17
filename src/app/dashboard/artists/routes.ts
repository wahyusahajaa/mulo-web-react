import type { RouteObject } from "react-router";
import { artistLoader } from "./loader";
import ArtistPage from "./page";

export const artistRoute: RouteObject = {
  path: "artists",
  children: [
    {
      index: true,
      loader: artistLoader,
      Component: ArtistPage,
    },
  ],
};
