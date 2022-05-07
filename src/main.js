import { createApp } from "vue";
import VueGoogleHeatmap from "vue-google-heatmap";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "../node_modules/bulma/css/bulma.css";

createApp(App)
  .use(router)
  .use(VueGoogleHeatmap, {
    apiKey: "AIzaSyDLAbJ3ZoW5hU5-4wBTuRirRWSxNkNTtd4"
  })
  .mount("#app");
