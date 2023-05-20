import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';
import 'vuetify/styles';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#eff8ff',
    surface: '#ffffff',
    'nav-surface': '#ffffff',
    primary: '#178ae7',
    'on-primary': '#ffffff',
    'primary-darken-1': '#1265a8',
    secondary: '#E3F2FD',
    'secondary-darken-1': '#90CAF9',
    'scroll-bar': '#000000',
    shadow: '#5ba5d7',
    error: '#b44257',
    info: '#ADE8F4',
    success: '#6eb671',
    warning: '#fabf77',
  },
  variables: {
    'high-emphasis-opacity': 0.95,
    'activated-opacity': 0,
    'hover-opacity': 0.15,
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#041633',
    surface: '#082350',
    'nav-surface': '#092f69',
    primary: '#bee3ff',
    'on-primary': '#010711',
    'primary-darken-1': '#90CAF9',
    secondary: '#178ae7',
    'secondary-darken-1': '#1976D2',
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
});
