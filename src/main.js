import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import store from './store/index';

const vuetify = createVuetify({
    components
})

const app = createApp(App);
app.use(vuetify); 
app.use(store);
app.mount("#app");
