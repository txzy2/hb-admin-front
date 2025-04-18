import {
  JWTResponse,
  LogInPersonInputData
} from '@/shared/types/auth/auth.types';

import CryptoJS from 'crypto-js';
import axios from 'axios';

const getEnvVar = (name: string): string => {
  const value = import.meta.env[name];
  return value;
};

export class LoginCore {
  private email: string;
  private password: string;
  private readonly salt: string;
  private readonly apiUrl: string;
  private readonly ssoToken: string;

  private t: any;

  public constructor({email, password}: LogInPersonInputData, t: any) {
    this.email = email;
    this.password = password;
    this.salt = getEnvVar('VITE_SALT');
    this.apiUrl = getEnvVar('VITE_API_SSO');
    this.ssoToken = getEnvVar('VITE_SSO_TOKEN');

    this.t = t;
  }

  private hashPassword = async (): Promise<string> => {
    try {
      const salt = CryptoJS.enc.Utf8.parse(this.salt);
      return CryptoJS.HmacSHA256(this.password, salt).toString(
        CryptoJS.enc.Hex
      );
    } catch (error) {
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
      const response = await axios.post(`${this.apiUrl}/sso/login`, data, {
        headers: {'X-Auth-Token': this.ssoToken}
      });

      return response.data;
    } catch (error: unknown) {
      console.log(error);
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
