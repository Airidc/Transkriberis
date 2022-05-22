<template>
  <div v-show="isModalOpen" class="settings-container">
    <div class="settings-content">
      <span class="settings-close" @click="closeModal">X</span>
      <div class="settings-section">
        <h3>Klaviatūros nustatymai</h3>
        <div class="input-group">
          <h4>Groti/Sustabdyti</h4>
          <input
            ref="playPause"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.playPause'"
            @click="getInput($refs['playPause'], $event)"
            :value.prop="settings.keyBindings.playPause || 'No Bindings 🤷‍♂️🤷‍♀️'"
          />
        </div>
        <div class="input-group">
          <h4>Atsukti atgal</h4>
          <input
            ref="rewind"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.rewind'"
            @click="getInput($refs['rewind'], $event)"
            :value.prop="settings.keyBindings.rewind || 'No Bindings 🤷‍♂️🤷‍♀️'"
          />
        </div>
        <div class="input-group">
          <h4>Pasukti į priekį</h4>
          <input
            ref="forward"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.forward'"
            @click="getInput($refs['forward'], $event)"
            :value.prop="settings.keyBindings.forward || 'No Bindings 🤷‍♂️🤷‍♀️'"
          />
        </div>
        <div class="input-group">
          <h4>Padidinti grojimo spartą</h4>
          <input
            ref="playbackSpeedIncrease"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.playbackSpeedIncrease'"
            @click="getInput($refs['playbackSpeedIncrease'], $event)"
            :value.prop="
              settings.keyBindings.playbackSpeedIncrease || 'No Bindings 🤷‍♂️🤷‍♀️'
            "
          />
        </div>
        <div class="input-group">
          <h4>Sumažinti grojimo spartą</h4>
          <input
            ref="playbackSpeedDecrease"
            type="text"
            readonly
            v-bind:data-property="'keyBindings.playbackSpeedDecrease'"
            @click="getInput($refs['playbackSpeedDecrease'], $event)"
            :value.prop="
              settings.keyBindings.playbackSpeedDecrease || 'No Bindings 🤷‍♂️🤷‍♀️'
            "
          />
        </div>
      </div>
      <div class="settings-section">
        <h3>Audio grotuvo nustatymai</h3>
        <div class="input-group">
          <h4>Atsukimo kiekis (sekundėmis)</h4>
          <input
            ref="rewindSeconds"
            type="number"
            v-bind:data-property="'options.rewindSeconds'"
            @input="setValue($refs['rewindSeconds'], $event)"
            v-model="settings.options.rewindSeconds"
          />
        </div>
        <div class="input-group">
          <h4>Atsukimo spartos žingsnis</h4>
          <input
            type="number"
            ref="playbackSpeedStep"
            v-bind:data-property="'options.playbackSpeedStep'"
            @input="setValue($refs['playbackSpeedStep'], $event)"
            v-model="settings.options.playbackSpeedStep"
          />
        </div>
        <div class="input-group">
          <h4>Atsukti įrašą po sustabdymo?</h4>
          <div class="checkbox-container">
            <input
              type="checkbox"
              ref="rewindAfterPause"
              v-bind:data-property="'options.rewindAfterPause'"
              @input="setValue($refs['rewindAfterPause'], $event)"
              name="rewindAfterPause"
              style="opacity: 1;"
              :checked="settings.options.rewindAfterPause"
            />
            <span
              @click="handleCheckbox($refs['rewindAfterPause'])"
              class="checkbox"
            ></span>
          </div>
        </div>
        <div class="input-group">
          <h4>Sekundžių kiekis atsukimui po pauzės</h4>
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
      error: "",
    };
  },
  computed: {
    isModalOpen: function() {
      return this.$store.state.isModalOpen;
    },
    settings: function() {
      return this.$store.state.settings;
    },
    keysBind: function() {
      let usedKeys = [];
      Object.keys(this.settings.keyBindings).forEach((key) => {
        let keyBindingValue = this.settings.keyBindings[key];
        if (!keyBindingValue) return;
        usedKeys.push(keyBindingValue);
      });

      return usedKeys;
    },
  },
  mounted() {
    document.addEventListener("keyup", this.registerInput);
  },
  methods: {
    ...mapActions(["updateSettings"]),
    closeModal: function() {
      // clear after
      this.isListeningForInput = false;
      if (this.refListening) {
        this.refListening.classList.remove("active");
        this.refListening.classList.remove("error");
        this.error = null;
        this.refListening = null;
      }
      this.$store.commit("closeModal");
    },
    handleCheckbox: function(ref) {
      ref.click();
    },
    setValue: function(ref, event) {
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
      if (this.keysBind.some((val) => val === event.code)) {
        this.refListening.classList.add("error");
        this.$toastr.e({ msg: "Mygtukas jau naudojamas!" });
        return;
      }

      this.refListening.value = event.code;
      this.refListening.classList.remove("active");

      let { branch, leaf } = this.getBranchAndLeaf(this.refListening);

      if (this.settings[branch][leaf] == event.code) {
        this.isListeningForInput = false;
        return;
      }

      this.updateSettings({
        branch,
        leaf,
        value: event.code,
      });

      // clear after
      this.isListeningForInput = false;
      this.refListening.classList.remove("error");
      this.error = null;
      this.refListening = null;
    },
    getInput: function(ref, event) {
      event.preventDefault();
      if (this.isListeningForInput) {
        this.isListeningForInput = false;
        this.refListening.classList.remove("active");
        this.refListening.classList.remove("error");
        this.error = null;
        return;
      }
      this.isListeningForInput = true;
      this.refListening = ref;
      ref.classList.add("active");
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
    .input-group {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input[type="text"],
      input[type="number"] {
        width: 45%;
        border-radius: 5px;
        border: none;
        padding: 8px;
        background: #e8e8e8;
        box-shadow: 7px 7px 10px #bcbcbc, -7px -7px 10px #ffffff;

        &.active {
          box-shadow: inset 5px 5px 8px #a2a2a2, inset -5px -5px 8px #ffffff;
        }

        &.error {
          border: 1px solid red;
        }
      }

      .checkbox-container {
        align-content: center;
        display: flex;
        position: relative;
        width: 36px;
        height: 36px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .checkbox {
          position: absolute;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          cursor: pointer;
          background: #e8e8e8;
          border-radius: 5px;
          box-shadow: 5px 4px 10px #bcbcbc, -5px -4px 10px #ffffff;
        }

        input[type="checkbox"] {
          // padding: 10px;
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        &:hover input[type="checkbox"] ~ .checkbox {
          box-shadow: inset 5px 5px 8px #a2a2a2, inset -5px -5px 8px #ffffff;
        }

        .checkbox:after {
          content: "";
          position: absolute;
          display: none;
        }

        input[type="checkbox"]:checked ~ .checkbox:after {
          display: block;
        }

        .checkbox:after {
          left: 14px;
          top: 8px;
          width: 7px;
          height: 12px;
          border: solid #a2a2a2;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
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
