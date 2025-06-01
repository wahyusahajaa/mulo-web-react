import { create } from "zustand";
import { persist } from "zustand/middleware";

type Auth = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuth = create<Auth>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set(() => ({ isLoggedIn: true })),
      logout: () => set(() => ({ isLoggedIn: false })),
    }),
    {
      name: "session",
    }
  )
);
