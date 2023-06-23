import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';
import 'vuetify/styles';
import { aliases, fa } from 'vuetify/iconsets/fa-svg';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#dff0ff',
    surface: '#ffffff',
    'nav-surface': '#ffffff',
    primary: '#178ae7',
    'on-primary': '#ffffff',
    secondary: '#6fc8ff',
    'on-secondary': '#ffffff',
    'scroll-bar': '#000000',
    shadow: '#0f548c',
    error: '#b44257',
    info: '#75dcf1',
    success: '#6eb671',
    warning: '#fabf77',
  },
  variables: {
    'high-emphasis-opacity': 0.95,
    'activated-opacity': 0.1,
    'hover-opacity': 0.15,
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#041633',
    surface: '#082350',
    'nav-surface': '#092f69',
    primary: '#178ae7',
    secondary: '#c0e9ff',
    'on-secondary': '#010711',
    'scroll-bar': '#ffffff',
    shadow: '#030e1f',
    error: '#b44257',
    info: '#ADE8F4',
    success: '#6eb671',
    warning: '#fabf77',
  },
  variables: {
    'high-emphasis-opacity': 0.95,
    'activated-opacity': 0.1,
    'hover-opacity': 0.1,
  },
};

export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: {
      height: 'auto',
      minWidth: '0',
    },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1450,
      xxl: 2560,
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
});
