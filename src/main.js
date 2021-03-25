import { createApp } from 'vue';
// import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import '../node_modules/bulma/css/bulma.css';

createApp(App).use(router).mount('#app');
