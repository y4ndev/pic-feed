import { loginUser, registerUser } from '@/lib/api';
import { IAuth } from '@/types/data';
import { create } from 'zustand';

const useAuthStore = create<IAuth>(set => ({
  user: null,
  loading: false,
  token: '',
  error: null,
  success: null,
  isAuth: false,
  isLogin: true,

  //auth-methods
  login: async (email, password) => {
    try {
      set({ loading: true, error: null, success: null });
      await new Promise(resolve => setTimeout(resolve, 700));
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.jwt);
      set({
        isAuth: true,
        user: data.user,
        token: data.jwt,
        loading: false,
        success: 'Вход успешно выполнен',
      });
      setTimeout(() => set({ success: '' }), 3000);
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Ошибка входа',
      });
      throw err;
    }
  },

  register: async (username, email, password) => {
    const data = await registerUser(username, email, password);
    localStorage.setItem('token', data.jwt);
    set({ isAuth: true, token: data.jwt });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuth: false, token: null });
  },

  //ui-helpers
 
  resetUI: () => set({ error: null, success: null }),

  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setSuccess: msg => set({ success: msg }),
  setIsAuth: value => set({ isAuth: value }),
  setIsLogin: value => set({ isLogin: value }),
  toggleMode: () =>
    set(state => ({
      isLogin: !state.isLogin,
      error: null,
      success: null,
      loading: false,
    })),
}));
export default useAuthStore;
