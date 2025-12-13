export interface User {
  id: string;
  name: string;
  lastname?: string;
  email: string;
}

export interface OAuthUser {
  id : string;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface AuthResponse {
  token: string;
  user: User;
}