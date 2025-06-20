// store/useUserStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  // add other user properties as needed
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));


