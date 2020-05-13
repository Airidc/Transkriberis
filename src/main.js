import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";

Vue.config.productionTip = false;

import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isModalOpen: false,
    settings: {
      keyBindings: {
        playPause: "Nera knopkės 🤷‍♂️🤷‍♀️",
        rewind: "Nera knopkės 🤷‍♂️🤷‍♀️",
        forward: "Nera knopkės 🤷‍♂️🤷‍♀️",
        playbackSpeedIncrease: "Nera knopkės 🤷‍♂️🤷‍♀️",
        playbackSpeedDecrease: "Nera knopkės 🤷‍♂️🤷‍♀️",
      },
      options: {
        rewindSeconds: 0,
        playbackSpeedStep: 0.25,
        rewindAfterPause: true,
        rewindAfterPauseSeconds: 0,
      },
    },
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
    updateKeyBinding(state, data) {
      console.log("state", state);
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
            state.settings.options.rewindSeconds = data.value;
            break;

          case "playbackSpeedStep":
            state.settings.options.playbackSpeedStep = data.value;
            break;

          case "rewindAfterPause":
            state.settings.options.rewindAfterPause = data.value;
            break;

          case "rewindAfterPauseSeconds":
            state.settings.options.rewindAfterPauseSeconds = data.value;
            break;

          default:
            break;
        }
      }
      // getDeepValue(state, data.property, data.value);
    },
  },
  actions: {
    test: function(context, data) {
      // console.log("context", context);
      console.log("data:", data);
      context.commit("updateKeyBinding", data);
      // console.log("is is working?", );
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
