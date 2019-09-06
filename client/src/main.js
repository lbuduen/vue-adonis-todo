import Vue from "vue";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import Panel from "./components/Panel.vue";

Vue.config.productionTip = false;
Vue.component("Panel", Panel);

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
