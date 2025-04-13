import * as CryptoJS from 'crypto-js';

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

  private hashPassword = () => {
    return CryptoJS.HmacSHA256(
      this.password,
      this.salt
    ).toString(CryptoJS.enc.Hex);
  };

  private collectData = () => {
    return {
      email: this.email,
      password: this.hashPassword()
    };
  };

  public async sendLogInRequest(): Promise<JWTResponse> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/sso/login`,
        this.collectData(),
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
