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

  private async hashPassword(): Promise<string> {
    if (!window.crypto?.subtle) {
      throw new Error("Web Crypto API is not available");
    }

    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(import.meta.env.VITE_SALT),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await window.crypto.subtle.sign(
      'HMAC',
      keyMaterial,
      encoder.encode(this.password)
    );

    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async collectData() {
    return {
      email: this.email,
      password: await this.hashPassword()
    };
  }

  public async sendLogInRequest(): Promise<JWTResponse> {
    try {
      const data = await this.collectData();
      const response = await axios.post(
        import.meta.env.VITE_API_SSO + '/sso/login',
        data,
        {
          headers: {'X-Auth-Token': import.meta.env.VITE_SSO_TOKEN}
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Login error:', error);
      return {
        error: true,
        message: `Authentication error: ${
          axios.isAxiosError(error) && error.response
            ? error.response.data.Message
            : 'Unknown error'
        }`
      };
    }
  }
}
