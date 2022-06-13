export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface RegisterFormInterface {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type LoginFunctionType = (data: LoginFormInterface) => void;

export type LogoutFunctionType = () => void;

export type RegisterFunctionType = (data: RegisterFormInterface) => void;

export interface AuthInterface {
  login: LoginFunctionType;
  register: RegisterFunctionType;
  logout: LogoutFunctionType;
}

export type UseAuthFunctionType = () => AuthInterface;