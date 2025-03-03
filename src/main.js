import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'
import store from './store/index';

const vuetify = createVuetify({
    components,
    icons: {
        defaultSet: 'mdi',
    },
})

const app = createApp(App);
app.use(vuetify); 
app.use(store);
app.mount("#app");
