import * as CryptoJS from 'crypto-js';

import {
  JWTResponse,
  RegisterParams,
  RegisterPersonInputData
} from '@/shared/types/auth/auth.types';

import axios from 'axios';

export class RegisterCore {
  private email: string;
  private username: string;
  private password: string;

  public constructor(user: RegisterPersonInputData) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
  }

  private hashPassword(): string {
    return CryptoJS.HmacSHA256(
      this.password,
      import.meta.env.VITE_SALT
    ).toString(CryptoJS.enc.Hex);
  }

  private collectData(): RegisterParams {
    return {
      email: this.email,
      is_active: false,
      name: this.username,
      password: this.hashPassword(),
      role: 'admin'
    };
  }

  public async firstStepRegiserUser(): Promise<JWTResponse> {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_SSO + '/sso/register',
        this.collectData(),
        {
          headers: {'X-Auth-Token': import.meta.env.VITE_SSO_TOKEN}
        }
      );

      return response.data;
    } catch (error: unknown) {
      return {
        error: true,
        message: `Ошибка регистрации: ${
          axios.isAxiosError(error) && error.response
            ? error.response.data.Message
            : 'Неизвестная ошибка'
        }`
      };
    }
  }
}
