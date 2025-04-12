import * as CryptoJS from 'crypto-js';

import {
  JWTResponse,
  LogInPersonInputData
} from '@/shared/types/auth/auth.types';

import axios from 'axios';

export class LoginCore {
  private email: string;
  private password: string;

  public constructor({email, password}: LogInPersonInputData) {
    this.email = email;
    this.password = password;
  }

  private hashPassword = () => {
    return CryptoJS.HmacSHA256(
      this.password,
      import.meta.env.VITE_SALT
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
        import.meta.env.VITE_API_SSO + '/sso/login',
        this.collectData(),
        {
          headers: {'X-Auth-Token': import.meta.env.VITE_SSO_TOKEN}
        }
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
