import { type ThemeInstance, useTheme } from 'vuetify';

export const useSetTheme = () => {
  const theme: ThemeInstance = useTheme();
  const setTheme = (userTheme: string) => {
    localStorage.setItem('user-theme', userTheme);
    theme.global.name.value = userTheme;
  };

  return { setTheme };
};
