import Cookies from 'js-cookie';
import {create} from 'zustand';

interface AuthState {
  jwt: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (jwt: string, email: string) => void;
  logout: () => void;
}

const clearAuth = () => {
  Cookies.remove('jwt');
  localStorage.removeItem('email');
};

const setAuth = (email: string, jwt: string) => {
  Cookies.set('jwt', jwt, {
    expires: 1,
    secure: true,
    sameSite: 'strict'
  });
  localStorage.setItem('email', email);
};

const useAuthStore = create<AuthState>(set => ({
  jwt: Cookies.get('jwt') ?? null,
  email: localStorage.getItem('email') ?? null,
  isAuthenticated: !!Cookies.get('jwt'),

  login: (jwt, email) => {
    try {
      setAuth(email, jwt);
      set({jwt, email, isAuthenticated: true});
    } catch (error) {
      console.error('Failed to login:', error);
    }
  },

  logout: () => {
    try {
      clearAuth();
      set({jwt: null, email: null, isAuthenticated: false});
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }
}));

export const useAuthToken = () => useAuthStore(state => state.jwt);
export const useAuthEmail = () => useAuthStore(state => state.email);
export const useIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);

export default useAuthStore;
