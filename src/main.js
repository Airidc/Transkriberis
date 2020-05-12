import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";

Vue.config.productionTip = false;

import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isModalOpen: false,
  },
  mutations: {
    changeModalState(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
