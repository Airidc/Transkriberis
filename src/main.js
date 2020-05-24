import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import VueToastr from "vue-toastr";

Vue.config.productionTip = false;

import Vuex from "vuex";

Vue.use(Vuex);
Vue.use(VueToastr, {
  defaultTimeout: 3000,
});

let settings = JSON.parse(localStorage.getItem("userSettings")) || {
  keyBindings: {
    playPause: null,
    rewind: null,
    forward: null,
    playbackSpeedIncrease: null,
    playbackSpeedDecrease: null,
  },
  options: {
    rewindSeconds: 1,
    playbackSpeedStep: 0.25,
    rewindAfterPause: true,
    rewindAfterPauseSeconds: 1,
  },
};

const store = new Vuex.Store({
  state: {
    isModalOpen: false,
    settings,
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
    updateSettings(state, data) {
      if (data.branch === "keyBindings") {
        switch (data.leaf) {
          case "playPause":
            state.settings.keyBindings.playPause = data.value;
            break;

          case "rewind":
            state.settings.keyBindings.rewind = data.value;
            break;

          case "forward":
            state.settings.keyBindings.forward = data.value;
            break;

          case "playbackSpeedIncrease":
            state.settings.keyBindings.playbackSpeedIncrease = data.value;
            break;

          case "playbackSpeedDecrease":
            state.settings.keyBindings.playbackSpeedDecrease = data.value;
            break;

          default:
            break;
        }
      } else {
        switch (data.leaf) {
          case "rewindSeconds":
            state.settings.options.rewindSeconds = parseFloat(data.value);
            break;

          case "playbackSpeedStep":
            state.settings.options.playbackSpeedStep = data.value;
            break;

          case "rewindAfterPause":
            state.settings.options.rewindAfterPause = data.value;
            break;

          case "rewindAfterPauseSeconds":
            state.settings.options.rewindAfterPauseSeconds = parseFloat(
              data.value
            );
            break;

          default:
            break;
        }
      }

      localStorage.setItem("userSettings", JSON.stringify(state.settings));
    },
  },
  actions: {
    updateSettings: function(context, data) {
      context.commit("updateSettings", data);
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
