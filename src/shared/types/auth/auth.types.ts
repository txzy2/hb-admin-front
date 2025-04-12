export interface LogInPersonInputData {
  email: string;
  password: string;
}

export interface RegisterPersonInputData {
  email: string;
  username: string;
  password: string;
}

export interface JWTResponse {
  error: boolean;
  jwt?: string;
  message: string;
}

export type RegisterParams = {
  email: string;
  is_active: boolean;
  name: string;
  password: string;
  role: string;
};
