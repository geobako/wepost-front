import { createApp } from "vue";
import { VuesticPlugin } from "vuestic-ui";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "vuestic-ui/dist/vuestic-ui.css";
import App from "./App.vue";

import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(VuesticPlugin)
  .use(Toast)
  .mount("#app");
