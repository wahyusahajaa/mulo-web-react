import { create } from "zustand";

type Count = {
  count: number;
  disableIncrease: boolean;
  increateCount: () => void;
  decreaseCount: () => void;
};

export const useCount = create<Count>((set) => ({
  count: 0,
  disableIncrease: false,
  increateCount: () =>
    set((state) => ({
      count: state.count + 1,
      disableIncrease: state.count > 10,
    })),
  decreaseCount: () =>
    set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
}));


