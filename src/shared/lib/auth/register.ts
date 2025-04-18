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

  private t: any;

  public constructor(user: RegisterPersonInputData, t: any) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;

    this.t = t;
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
        message: `${this.t('error.first', {ns: 'validator'})}: ${
          axios.isAxiosError(error) && error.response
            ? error.response.data.Message
            : this.t('error.second', {ns: 'validator'})
        }`
      };
    }
  }
}
