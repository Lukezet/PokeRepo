import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);  // ✅ Install Pinia before using stores
pinia.use(piniaPluginPersistedstate);  // ✅ Add persistence after installing Pinia

app.use(router)
   .mount("#app");
