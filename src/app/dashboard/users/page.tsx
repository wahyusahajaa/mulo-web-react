import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PaginateResponse, User } from "@/types/types";
import { IconLoader2 } from "@tabler/icons-react";
import React from "react";
import { Await, useLoaderData } from "react-router";

export default function UserPage() {
  const { usersPromise } = useLoaderData() as {
    usersPromise: PaginateResponse<User[]>;
  };

  return (
    <>
      <h1 className="text-2xl mb-2">Users</h1>
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center">
            <IconLoader2 className="animate-spin" />
          </div>
        }
      >
        <Await
          resolve={usersPromise}
          errorElement={<div>Oops</div>}
          children={(resolvedPromise) => (
            <UsersList users={resolvedPromise.data} />
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

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <ul className="flex flex-col divide-y">
      {users.map((user) => (
        <li key={user.id} className="flex items-center gap-4 py-4 select-none">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image.src} />
            <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div>
              <p className="text-sm font-semibold">{user.full_name}</p>
              <p className="text-sm font-light text-muted-foreground">
                {user.email}
              </p>
              <p className="text-sm font-light text-muted-foreground">
                {user.username}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
