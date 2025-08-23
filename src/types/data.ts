export interface IAuthState {
  email: string;
  password: string;
  username: string;
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
  startLoading: () => void;
  finishLoading: (msg?: string) => void;
  fail: (errorMsg: string) => void;
  resetUI: () => void;
}

export interface IAuthSetters {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername: (name: string) => void;
  setError: (error: string | null) => void;
  setLoading: (value: boolean) => void;
  setSuccess: (msg: string | null) => void;
  setIsAuth: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
  toggleMode: () => void;
}

export type IAuth = IAuthState & IAuthActions & IAuthHelpers & IAuthSetters;
