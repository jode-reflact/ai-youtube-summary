import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import SlideFadeY from '@/components/transitions/SlideFadeY.vue';
import './assets/styles/main.scss';

const app: App<Element> = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);
app.component('SlideFadeY', SlideFadeY);

app.mount('#app');
