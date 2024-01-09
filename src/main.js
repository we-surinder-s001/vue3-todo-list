import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./index.css";
import "./assets/main.css";
import "vue3-toastify/dist/index.css";

createApp(App).use(createPinia()).mount("#app");
