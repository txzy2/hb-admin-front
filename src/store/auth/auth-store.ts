import {
  AuthState,
  LoginReturnType,
  LoginSetAuthType
} from '@/shared/types/storage.types';

import Cookies from 'js-cookie';
import {create} from 'zustand';
import {jwtDecode} from 'jwt-decode';

const clearAuth = () => {
  Cookies.remove('jwt');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
  localStorage.setItem('theme', 'dark');
};

/**
 * Проверяет JWT и возвращает результат валидации.
 *
 * @param {string} jwt - JSON Web Token для проверки.
 * @returns {boolean} - Результат валидации JWT.
 */
const validateJWT = (jwt: string): boolean => {
  try {
    const decoded = jwtDecode(jwt);
    const currentTime = Date.now() / 1000;
    
    // Проверяем, что токен не истек
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('JWT validation error:', error);
    return false;
  }
};

/**
 * Устанавливает куки и email в локальное хранилище.
 *
 * @param {string} email - Email пользователя.
 * @param {string} jwt - JSON Web Token.
 * @param {number} expires - Время истечения токена в днях.
 */
const setCookiesAndEmail = (email: string, jwt: string, expires: number) => {
  Cookies.set('jwt', jwt, {
    expires,
    secure: true,
    sameSite: 'strict'
  });
  localStorage.setItem('email', email);
};

/**
 * Устанавливает аутентификацию пользователя.
 *
 * @param {string} email - Email пользователя.
 * @param {string} jwt - JSON Web Token.
 * @returns {Promise<boolean>} - Возвращает true, если аутентификация успешна, иначе false.
 */
const setAuth = async (email: string, jwt: string): Promise<boolean> => {
  const isValid = validateJWT(jwt);
  
  if (isValid) {
    const decoded = jwtDecode(jwt);
    if (decoded.exp) {
      const expiresInDays = (decoded.exp * 1000 - Date.now()) / 1000 / 60 / 60 / 24;
      setCookiesAndEmail(email, jwt, expiresInDays);
      return true;
    }
  }

  return false;
};

const setUsername = (username: string): void => {
  const firstName = username.split(' ')[1];
  localStorage.setItem('username', firstName);
};

/**
 * Хук для использования состояния аутентификации.
 *
 * @returns {AuthState} - Состояние аутентификации.
 */
const useAuthStore = create<AuthState>(set => ({
  jwt: Cookies.get('jwt') ?? null,
  username: localStorage.getItem('username') ?? null,
  email: localStorage.getItem('email') ?? null,
  isAuthenticated: !!Cookies.get('jwt'),

  login: async ({
    jwt,
    email,
    username
  }: LoginSetAuthType): Promise<LoginReturnType> => {
    try {
      const auth = await setAuth(email, jwt);

      if (auth) {
        set({
          jwt,
          email,
          username,
          isAuthenticated: true
        });

        if (username) {
          setUsername(username);
        }

        return {status: true};
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }

    return {
      status: false,
      message: 'Ошибка регистрации. Не получен токен'
    };
  },

  logout: () => {
    try {
      clearAuth();
      set({jwt: null, email: null, username: null, isAuthenticated: false});
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }
}));

export const useAuthToken = () => useAuthStore(state => state.jwt);
export const useAuthEmail = () => useAuthStore(state => state.email);
export const useAuthUsername = () => useAuthStore(state => state.username);
export const useIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);

export default useAuthStore;
