export interface LocaleOption {
  name: string;
  value: string;
  icon: string;
}

const localeOptions: LocaleOption[] = [
  {
    name: 'English',
    value: 'en-US',
    icon: 'fi fi-us fis',
  },
  {
    name: 'Deutsch',
    value: 'de-DE',
    icon: 'fi fi-de fis',
  },
];
export default localeOptions;
