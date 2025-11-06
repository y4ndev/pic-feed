import {
  updatePassword,
  updateUserAvatar,
  updateUserName,
  uploadAvatar,
} from '@/lib/api';
import { getUserIdFromToken } from '@/lib/utils';
import { create } from 'zustand';

interface IProfileState {
  avatar: string | null;
  username: string;
  email: string;
  loadingProfile: boolean;
  errorProfile: string | null;
  successProfile: string | null;

  fetchProfile: () => Promise<void>;
  changeAvatar: (file: File) => Promise<void>;
  changeUsername: (newName: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const useProfileStore = create(set => ({
  avatar: '',
  username: '',
  email: '',
  loadingProfile: false,
  errorProfile: '',
  successProfile: '',

  fetchProfile: async () => {
    try {
      set({ loadingProfile: true, errorProfile: null });
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      set({
        avatar: data.avatar?.url || null,
        username: data.username,
        email: data.email,
        loadingProfile: false,
      });
    } catch {
      set({ errorProfile: 'Ошибка загрузки профиля', loadingProfile: false });
    }
  },

  changeAvatar: async (file: File) => {
    try {
      set({ loadingProfile: true, errorProfile: null });
      const token = localStorage.getItem('token');
      if (!token) {
        set({
          errorProfile: 'Токен отсутствует. Пожалуйста, войдите заново.',
          loadingProfile: false,
        });
        return;
      }
      const userId = getUserIdFromToken(token);
      if (!userId)
        throw new Error('Не удалось получить ID пользователя из токена');
      const uploaded = await uploadAvatar(file, token);
      const updated = await updateUserAvatar(uploaded.id, token);
      set({
        avatar: updated.avatar?.url || null,
        successProfile: 'Аватар обновлен!',
        loadingProfile: false,
      });
    } catch {
      set({ errorProfile: 'Ошибка загрузки аватара', loadingProfile: false });
    }
  },

  changeUsername: async (newName: string) => {
    try {
      set({ loadingProfile: true, errorProfile: null });
      const token = localStorage.getItem('token');
      await updateUserName(newName, token);
      set({
        username: newName,
        successProfile: 'Имя обновлено!',
        loadingProfile: false,
      });
    } catch {
      set({ errorProfile: 'Ошибка обновления имени', loadingProfile: false });
    }
  },

  changePassword: async (current, newPass) => {
    try {
      set({ loadingProfile: true, errorProfile: null });
      const token = localStorage.getItem('token');
      await updatePassword(current, newPass, token);
      set({ successProfile: 'Пароль обновлен!', loadingProfile: false });
    } catch {
      set({ errorProfile: 'Ошибка обновления пароля', loadingProfile: false });
    }
  },
}));
