import {
  JWTResponse,
  LogInPersonInputData
} from '@/shared/types/auth/auth.types';

import axios from 'axios';

const getEnvVar = (name: string): string => {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};

const hashPassword = async (password: string, salt: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export class LoginCore {
  private email: string;
  private password: string;
  private readonly salt: string;
  private readonly apiUrl: string;
  private readonly ssoToken: string;

  public constructor({email, password}: LogInPersonInputData) {
    this.email = email;
    this.password = password;
    this.salt = getEnvVar('VITE_SALT');
    this.apiUrl = getEnvVar('VITE_API_SSO');
    this.ssoToken = getEnvVar('VITE_SSO_TOKEN');
  }

  private collectData = async () => {
    return {
      email: this.email,
      password: await hashPassword(this.password, this.salt)
    };
  };

  public async sendLogInRequest(): Promise<JWTResponse> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/sso/login`,
        await this.collectData(),
        {headers: {'X-Auth-Token': this.ssoToken}}
      );

      return response.data;
    } catch (error: unknown) {
      console.log(error);
      return {
        error: true,
        message: `Ошибка авторизации: ${
          axios.isAxiosError(error) && error.response
            ? error.response.data.Message
            : 'Неизвестная ошибка'
        }`
      };
    }
  }
}
