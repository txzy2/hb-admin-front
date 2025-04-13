import {
  JWTResponse,
  LogInPersonInputData
} from '@/shared/types/auth/auth.types';

import CryptoJS from 'crypto-js';
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
    try {
      if (!CryptoJS || !CryptoJS.HmacSHA256) {
        throw new Error('CryptoJS is not properly initialized');
      }
      
      const hash = CryptoJS.HmacSHA256(
        this.password,
        this.salt
      );
      
      if (!hash) {
        throw new Error('Failed to generate hash');
      }
      
      return hash.toString(CryptoJS.enc.Hex);
    } catch (error) {
      console.error('Hash error:', error);
      throw new Error('Failed to hash password');
    }
  };

  private collectData = () => {
    try {
      return {
        email: this.email,
        password: this.hashPassword()
      };
    } catch (error) {
      console.error('Data collection error:', error);
      throw error;
    }
  };

  public async sendLogInRequest(): Promise<JWTResponse> {
    try {
      const data = this.collectData();
      const response = await axios.post(
        `${this.apiUrl}/sso/login`,
        data,
        {headers: {'X-Auth-Token': this.ssoToken}}
      );

      return response.data;
    } catch (error: unknown) {
      console.error('Login request error:', error);
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
