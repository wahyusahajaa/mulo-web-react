import type { Session } from "@/types/session.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  session: Session | null;
  login: (session: Session) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      login: (session: Session) =>
        set(() => ({
          session,
        })),
      logout: () =>
        set(() => ({
          session: null,
        })),
    }),
    {
      name: "session",
    }
  )
);
