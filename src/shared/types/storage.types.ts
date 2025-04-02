export type LoginReturnType = {status: boolean; message?: string};

export type LoginSetAuthType = {
  jwt: string;
  email: string;
  username?: string;
};

export interface AuthState {
  jwt: string | null;
  email: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: ({jwt, email, username}: LoginSetAuthType) => Promise<LoginReturnType>;
  logout: () => void;
}
