import { create } from "zustand";

interface IAuthStore {
  mode: "register" | "login" | null;
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  setMode: (value: "register" | "login" | null) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setError: (value: string | null) => void;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  //state
  mode: null,
  email: "",
  password: "",
  error: null,
  loading: true,

  //actions
  setMode: (value) => set({ mode: value }),
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setError: (value) => set({ error: value }),
  setLoading: (value) => set({ loading: value }),
}));
