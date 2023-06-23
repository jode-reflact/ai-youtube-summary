import { type App, createApp } from 'vue';
import MainApp from './MainApp.vue';
import { createPinia } from 'pinia';
import router from './router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import SlideFadeY from '@/components/transitions/SlideFadeY.vue';
import './assets/styles/main.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faIcons from '@/plugins/font-awesome';

const app: App<Element> = createApp(MainApp);

app.use(createPinia());
app.use(router);
app.component('SlideFadeY', SlideFadeY);
app.component('FontAwesomeIcon', FontAwesomeIcon);
library.add(...faIcons);
app.use(vuetify);
app.use(i18n);

app.mount('#app');
