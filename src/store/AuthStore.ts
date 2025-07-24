import { loginUser, registerUser } from '@/lib/api';
import { create } from 'zustand';

interface IAuth {
  username: string;
  token: string | null;
  error: string | null;
  success: string | null;
  isLogin: boolean;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  setUsername: (name: string) => void;
  setError: (error: string | null) => void;
  setSuccess: (msg: string | null) => void;
  setIsAuth: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
  toggleMode: () => void;
}

const useAuthStore = create<IAuth>(set => ({
  username: '',
  token: '',
  error: null,
  success: null,
  isLogin: true,
  isAuth: false,
  login: async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem('token', data.jwt);
    set({ isAuth: true, token: data.jwt });
  },
  register: async (email, username, password) => {
    const data = await registerUser(email, username, password);
    localStorage.setItem('token', data.jwt);
    set({ isAuth: true, token: data.jwt });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuth: false, token: null });
  },

  setUsername: username => set({ username }),
  setError: error => set({ error }),
  setSuccess: msg => set({ success: msg }),
  setIsAuth: value => set({ isAuth: value }),
  setIsLogin: value => set({ isLogin: value }),
  toggleMode: () => set(state => ({ isLogin: !state.isLogin })),
}));
export default useAuthStore;
