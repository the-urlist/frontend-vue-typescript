import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

// import styles
import "@/styles/site.scss";

// directives
import blurOnEnterKey from "@/directives/blurOnEnterKey";
Vue.directive("blur-on-enter-key", blurOnEnterKey);

// Initialize API which has some global settings which will be kept in memory
import ApiService from "@/services/api.service";
ApiService.init();

// The base JavaScript array type is overriden to provide for easier retrieval of
// members by their id.
import "@/shared/Array";

// No idea what this does
Vue.config.productionTip = false;

// New up the app, passing in the store and router
new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
