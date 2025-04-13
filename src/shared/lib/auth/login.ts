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

  private hashPassword = async (): Promise<string> => {
    try {
      if (!this.salt) throw new Error('Salt is not defined');
      if (!this.password) throw new Error('Password is not defined');
      
      const salt = CryptoJS.enc.Utf8.parse(this.salt);
      return CryptoJS.HmacSHA256(this.password, salt).toString(CryptoJS.enc.Hex);
    } catch (error) {
      console.error('Hashing error:', error);
      throw new Error('Password hashing failed');
    }
  };

  private collectData = async (): Promise<LogInPersonInputData> => {
    return {
      email: this.email,
      password: await this.hashPassword()
    };
  };

  public async sendLogInRequest(): Promise<JWTResponse> {
    const data = await this.collectData();
    console.log(data);
    
    try {
      const response = await axios.post(
        `${this.apiUrl}/sso/login`,
        data,
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

