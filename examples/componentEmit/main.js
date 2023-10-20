import { createApp } from '../../lib/guide-mini-vue.esm.js';
import { App } from './App.js';

const rootContaniner = document.querySelector('#app');
createApp(App).mount(rootContaniner);
