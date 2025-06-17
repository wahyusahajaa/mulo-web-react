import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Artist, PaginateResponse } from "@/types/types";
import { IconLoader2 } from "@tabler/icons-react";
import React from "react";
import { Await, useLoaderData } from "react-router";

export default function ArtistPage() {
  const { artistsPromise } = useLoaderData() as {
    artistsPromise: PaginateResponse<Artist[]>;
  };

  return (
    <>
      <h1 className="text-2xl mb-2">Artists</h1>
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center">
            <IconLoader2 className="animate-spin" />
          </div>
        }
      >
        <Await
          resolve={artistsPromise}
          errorElement={<div>Oops</div>}
          children={(resolvedPromise) => (
            <ArtistLists artists={resolvedPromise.data} />
          )}
        />
      </React.Suspense>
    </>
  );
}

function getInitials(name: string): string {
  if (!name) return "";

  const parts = name.trim().split(" ").filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0].toUpperCase());

  return initials.join("");
}

const ArtistLists = ({ artists }: { artists: Artist[] }) => {
  return (
    <ul className="flex flex-col divide-y">
      {artists.map((artist) => (
        <li
          key={artist.id}
          className="flex items-center gap-4 py-4 select-none"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={artist.image.src} />
            <AvatarFallback>{getInitials(artist.name)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div>
              <p className="text-sm font-semibold">{artist.name}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
