import { create } from 'zustand';


const useThemeStore = create((set) => ({
  theme: 'light', // начальная тема
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));

export default useThemeStore;