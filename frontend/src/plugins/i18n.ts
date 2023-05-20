import { createI18n } from 'vue-i18n';
import messages from '@/lang';

export default createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages,
  legacy: false,
});
