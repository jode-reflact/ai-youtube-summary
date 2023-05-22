import { useI18n } from 'vue-i18n';

export const useSetLocale = () => {
  const { locale } = useI18n({ useScope: 'global' });
  const setLocale = (lang: string) => {
    localStorage.setItem('user-lang', lang);
    locale.value = lang;
  };

  return { setLocale };
};
