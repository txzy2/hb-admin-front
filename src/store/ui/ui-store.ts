import {create} from 'zustand';

interface ThemeState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const useThemeStore = create<ThemeState>(set => {
  const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;

  return {
    theme: storedTheme ?? 'dark',
    setTheme: theme => {
      localStorage.setItem('theme', theme);
      set({theme});
    }
  };
});

export const useTheme = () => useThemeStore(state => state.theme);
export const useSetTheme = () => useThemeStore(state => state.setTheme);

export default useThemeStore;
