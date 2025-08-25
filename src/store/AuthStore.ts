import { loginUser, registerUser } from '@/lib/api';
import { IAuth } from '@/types/data';
import { create } from 'zustand';

const useAuthStore = create<IAuth>(set => ({
  loading: false,
  password: '',
  email: '',
  username: '',
  token: '',
  error: null,
  success: null,
  isLogin: true,
  isAuth: false,

  //auth-methods
  login: async (email, password) => {
    try {
      set({ loading: true, error: null, success: null });
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('email', data.user.email);
      set({
        email: data.user.email,
        username: data.user.username,
        isAuth: true,
        token: data.jwt,
        loading: false,
        success: 'Вход успешно выполнен!',
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Ошибка входа',
      });
      throw err;
    }
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

  //ui-helpers
  startLoading: () => set({ loading: true, error: null, success: null }),
  finishLoading: msg => set({ loading: false, success: msg || null }),
  fail: errorMsg => set({ loading: false, error: errorMsg }),
  resetUI: () => set({ error: null, success: null }),

  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setUsername: username => set({ username }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setSuccess: msg => set({ success: msg }),
  setIsAuth: value => set({ isAuth: value }),
  setIsLogin: value => set({ isLogin: value }),
  toggleMode: () =>
    set(state => ({
      isLogin: !state.isLogin,
      username: '',
      error: null,
      success: null,
      loading: false,
    })),
}));
export default useAuthStore;
