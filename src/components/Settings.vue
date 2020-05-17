<template>
  <div v-show="isModalOpen" class="settings-container">
    <div class="settings-content">
      <span class="settings-close" @click="closeModal">X</span>
      <div class="settings-section">
        <h3>Greitųjų mygtukų nustatymai</h3>
        <div class="input-group">
          <h4>Paleisti/Sustabdyti</h4>
          <!-- <span @click="getInput('playPause', $event)">
            {{ this.settings.keyBindings.playPause }}
          </span> -->
          <input
            ref="playPause"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.playPause'"
            @click="getInput($refs['playPause'], $event)"
            style="/*display: none;*/"
            :value.prop="settings.keyBindings.playPause || 'Nera knopkės 🤷‍♂️🤷‍♀️'"
          />
        </div>
        <div class="input-group">
          <h4>Atsukti atgal</h4>
          <!-- <span @click="getInput(settings.keyBindings.rewind, $event)">
            {{ settings.keyBindings.rewind }}
          </span> -->
          <input
            ref="rewind"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.rewind'"
            @click="getInput($refs['rewind'], $event)"
            style="/*display: none;*/"
            :value.prop="settings.keyBindings.rewind || 'Nera knopkės 🤷‍♂️🤷‍♀️'"
          />
        </div>
        <div class="input-group">
          <h4>Pasukti į priekį</h4>
          <!-- <span @click="getInput(settings.keyBindings.forward, $event)">
            {{ settings.keyBindings.forward }}
          </span> -->
          <input
            ref="forward"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.forward'"
            @click="getInput($refs['forward'], $event)"
            style="/*display: none;*/"
            :value.prop="settings.keyBindings.forward || 'Nera knopkės 🤷‍♂️🤷‍♀️'"
          />
        </div>
        <div class="input-group">
          <h4>Greitis +</h4>
          <!-- <span
            @click="
              getInput(settings.keyBindings.playbackSpeedIncrease, $event)
            "
          >
            {{ settings.keyBindings.playbackSpeedIncrease }}
          </span> -->
          <input
            ref="playbackSpeedIncrease"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.playbackSpeedIncrease'"
            @click="getInput($refs['playbackSpeedIncrease'], $event)"
            style="/*display: none;*/"
            :value.prop="
              settings.keyBindings.playbackSpeedIncrease || 'Nera knopkės 🤷‍♂️🤷‍♀️'
            "
          />
        </div>
        <div class="input-group">
          <h4>Greitis -</h4>
          <!-- <span
            @click="
              getInput(settings.keyBindings.playbackSpeedDecrease, $event)
            "
          >
            {{ settings.keyBindings.playbackSpeedDecrease }}
          </span> -->
          <input
            ref="playbackSpeedDecrease"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.playbackSpeedDecrease'"
            @click="getInput($refs['playbackSpeedDecrease'], $event)"
            style="/*display: none;*/"
            :value.prop="
              settings.keyBindings.playbackSpeedDecrease || 'Nera knopkės 🤷‍♂️🤷‍♀️'
            "
          />
        </div>
      </div>
      <div class="settings-section">
        <h3>Grotuvo valdymo pasirinktys</h3>
        <div class="input-group">
          <h4>Persukimo kiekis (sekundės)</h4>
          <!-- <span @click="getInput(settings.options.rewindSeconds, $event)">
            {{ settings.options.rewindSeconds }}
          </span> -->
          <input
            ref="rewindSeconds"
            type="number"
            v-bind:data-property="'options.rewindSeconds'"
            @input="setValue($refs['rewindSeconds'], $event)"
            style="/*display: none;*/"
            v-model="settings.options.rewindSeconds"
          />
        </div>
        <div class="input-group">
          <h4>Pagreitinimas / sulėtinimas (žingsnis)</h4>
          <input
            ref="playbackSpeedStep"
            v-bind:data-property="'options.playbackSpeedStep'"
            @input="setValue($refs['playbackSpeedStep'], $event)"
            v-model="settings.options.playbackSpeedStep"
          />
          <!-- {{ settings.options.playbackSpeedStep }}
          </span> -->
        </div>
        <div class="input-group">
          <h4>Atsukti laiką paleidžiant po pauzės?</h4>
          <input
            type="checkbox"
            ref="rewindAfterPause"
            v-bind:data-property="'options.rewindAfterPause'"
            @input="setValue($refs['rewindAfterPause'], $event)"
            name="rewindAfterPause"
            :checked="settings.options.rewindAfterPause"
          />
        </div>
        <div class="input-group">
          <h4>Atsukti sekundžių po pauzės</h4>
          <input
            type="number"
            ref="rewindAfterPauseSeconds"
            v-bind:data-property="'options.rewindAfterPauseSeconds'"
            @input="setValue($refs['rewindAfterPauseSeconds'], $event)"
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isListeningForInput: false,
    };
  },
  computed: {
    isModalOpen: function() {
      return this.$store.state.isModalOpen;
    },
    settings: function() {
      return this.$store.state.settings;
    },
  },
  mounted() {
    // if() - localstorage, then load if not define default
    document.addEventListener("keyup", this.registerInput);
  },
  methods: {
    ...mapActions(["updateSettings"]),
    closeModal: function() {
      this.$store.commit("closeModal");
    },
    setValue: function(ref, event) {
      console.log(ref, event);
      let { branch, leaf } = this.getBranchAndLeaf(ref);
      let value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      this.updateSettings({
        branch,
        leaf,
        value: value,
      });
    },
    registerInput: function(event) {
      if (!this.isListeningForInput) return;
      console.log("registered:", event.code, event);
      this.refListening.value = event.code;

      let { branch, leaf } = this.getBranchAndLeaf(this.refListening);

      this.updateSettings({
        branch,
        leaf,
        value: event.code,
      });

      // clear after
      this.isListeningForInput = false;
      this.refListening = null;
    },
    getInput: function(ref, event) {
      // event.preventDefault();
      console.log(ref, event);
      this.isListeningForInput = true;
      this.refListening = ref;
    },
    getBranchAndLeaf: function(domElement) {
      let splitProperty = domElement.getAttribute("data-property").split(".");
      return { branch: splitProperty[0], leaf: splitProperty[1] };
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
