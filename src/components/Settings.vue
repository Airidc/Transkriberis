<template>
  <div v-show="isModalOpen" class="settings-container">
    <div class="settings-content">
      <span class="settings-close" @click="closeModal">X</span>
      <div class="settings-section">
        <h3>Greitųjų mygtukų nustatymai</h3>
        <div class="input-group">
          <h4>Paleisti/Sustabdyti</h4>
          <!-- <span @click="getInput(settings.keyBindings.playPause, $event)">
            {{ settings.keyBindings.playPause }}
          </span> -->
          <input
            @click="getInputInput"
            type="text"
            name="playPause"
            v-model="settings.keyBindings.playPause"
          />
        </div>
        <div class="input-group">
          <h4>Atsukti atgal</h4>
          <span @click="getInput(settings.keyBindings.rewind, $event)">
            {{ settings.keyBindings.rewind }}
          </span>
        </div>
        <div class="input-group">
          <h4>Pasukti į priekį</h4>
          <span @click="getInput(settings.keyBindings.forward, $event)">
            {{ settings.keyBindings.forward }}
          </span>
        </div>
        <div class="input-group">
          <h4>Greitis +</h4>
          <span
            @click="
              getInput(settings.keyBindings.playbackSpeedIncrease, $event)
            "
          >
            {{ settings.keyBindings.playbackSpeedIncrease }}
          </span>
        </div>
        <div class="input-group">
          <h4>Greitis -</h4>
          <span
            @click="
              getInput(settings.keyBindings.playbackSpeedDecrease, $event)
            "
          >
            {{ settings.keyBindings.playbackSpeedDecrease }}
          </span>
        </div>
      </div>
      <div class="settings-section">
        <h3>Grotuvo valdymo pasirinktys</h3>
        <div class="input-group">
          <h4>Persukimo kiekis (sekundės)</h4>
          <span @click="getInput(settings.options.rewindSeconds, $event)">
            {{ settings.options.rewindSeconds }}
          </span>
        </div>
        <div class="input-group">
          <h4>Pagreitinimas / sulėtinimas (žingsnis)</h4>
          <span @click="getInput(settings.options.playbackSpeedStep, $event)">
            {{ settings.options.playbackSpeedStep }}
          </span>
        </div>
        <div class="input-group">
          <h4>Atsukti laiką paleidžiant po pauzės?</h4>
          <input
            type="checkbox"
            name="rewindAfterPause"
            v-model="settings.options.rewindAfterPause"
          />
        </div>
        <div class="input-group">
          <h4>Atsukti sekundžių po pauzės</h4>
          <input
            type="number"
            name="rewindAfterPauseSeconds"
            min="0"
            step="1"
            v-model="settings.options.rewindAfterPauseSeconds"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      isListeningForInput: false,
    };
  },
  computed: {
    isModalOpen: function() {
      return this.$store.state.isModalOpen;
    },
  },
  mounted() {
    // if() - localstorage, then load if not define default
    // document.addEventListener("keypress", this.registerInput);
  },
  methods: {
    closeModal: function() {
      this.$store.commit("closeModal");
    },
    registerInput: function(event) {
      if (!this.isListeningForInput) return;
      console.log("registered:", event);
      this.propertyListening = event.code;
      this.isListeningForInput = false;
    },
    getInputInput: function(event) {
      console.log("INPUT", event);
      event.target.addEventListener("keyup", function(ev) {
        event.value = ev.code;
      });
    },
    getInput: function(settingsField, event) {
      // event.preventDefault();
      console.log(settingsField, event);
      this.isListeningForInput = true;
      this.propertyListening = settingsField;
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  &-container {
    // display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
  }

  &-content {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    width: 70%;
    margin: 3em auto;
    padding: 1em;
    border-radius: 16px;
    background: linear-gradient(145deg, #f8f8f8, #d1d1d1);
  }

  &-section {
    //max-width: 45%;
    .input-group {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        flex-grow: 1;
        width: 50%;
        background: #f8f8f8;
        border: 1px solid #111111;
        margin-left: 1em;
        padding: 10px;
        height: fit-content;
      }
    }
  }

  &-close {
    position: absolute;
    right: 1.5em;
    top: 1em;

    font-weight: bolder;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      box-shadow: inset 5px 5px 8px #a2a2a2, inset -5px -5px 8px #ffffff;
    }
  }
}
</style>
