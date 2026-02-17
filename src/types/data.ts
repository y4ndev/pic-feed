export interface IAuthState {
  user: any | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  success: string | null;
  isLogin: boolean;
  isAuth: boolean;
}

export interface IAuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export interface IAuthHelpers {
  resetUI: () => void;
}

export interface IAuthSetters {
  setError: (error: string | null) => void;
  setLoading: (value: boolean) => void;
  setSuccess: (msg: string | null) => void;
  setIsAuth: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
  toggleMode: () => void;
}

export type IAuth = IAuthState & IAuthActions & IAuthHelpers & IAuthSetters;
