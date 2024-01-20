import './assets/main.css'

import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';


import '@ionic/core/css/ionic.bundle.css';

import { IonicVue } from '@ionic/vue';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import { registerSW } from 'virtual:pwa-register';

const app = createApp(App)

app.config.globalProperties.$token = null;

app.use(IonicVue)
app.use(router)


//if ('serviceWorker' in navigator) {
// Uncomment the following line if you want to exclude service worker registration during local development
// if (!import.meta.env.DEV) {
//    registerSW();
// }
//}

//app.mount('#app')
router.isReady().then(() => {
    app.mount('#app');
});

