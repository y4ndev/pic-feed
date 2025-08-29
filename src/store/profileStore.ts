import {create} from 'zustand'

interface IProfileState {
  avatar: string | null;
  username: string;
  email: string;
  loading: boolean;
  error: string | null;
  success: string | null;

  fetchProfile: () => Promise<void>;
  changeAvatar: (file: File) => Promise<void>;
  changeUsername: (newName: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

// export const useProfileStore = create<IProfileState>((set, get) => ({
//   avatar:Nuosu_SIL;
// }) )