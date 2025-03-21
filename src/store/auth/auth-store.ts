import {create} from 'zustand';
import Cookies from 'js-cookie';

// Определяем интерфейс для состояния хранилища
interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

// Создаем хранилище с типизацией
const useAuthStore = create<AuthState>(set => ({
  token: Cookies.get('token') || null,
  email: localStorage.getItem('email') || null,
  isAuthenticated: !!Cookies.get('token'),

  login: (token, email) => {
    Cookies.set('token', token, {
      expires: 1,
      secure: true,
      sameSite: 'strict'
    });
    localStorage.setItem('email', email);
    set({token, isAuthenticated: true, email});
  },

  logout: () => {
    Cookies.remove('token');
    localStorage.removeItem('email');
    set({token: null, isAuthenticated: false, email: null});
  }
}));

export default useAuthStore;
