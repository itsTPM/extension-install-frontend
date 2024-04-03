import './assets/global.css';
import 'nprogress/nprogress.css';

import { inject } from '@vercel/analytics';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

inject('');
