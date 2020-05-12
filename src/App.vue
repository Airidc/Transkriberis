<template>
  <div id="app">
    <h1><span class="label">BETA</span> Transkriberis 😎🎤🎚</h1>
    <div class="container">
      <AudioPlayer></AudioPlayer>
      <TextEditor></TextEditor>
      <Settings></Settings>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer";
import TextEditor from "./components/TextEditor";
import Settings from "./components/Settings";

export default {
  name: "App",
  components: {
    AudioPlayer,
    TextEditor,
    Settings,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    handleModalOpen: function(modalValue) {
      this.isModalOpen = modalValue;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap");
@import "@/assets/style/normalize.scss";

html,
body,
#app {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #e8e8e8;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

.label {
  vertical-align: super;
  border: 2px solid #abcd12;
  border-radius: 8px;
  font-size: 0.75rem;
  padding: 0.3em;
}

ul,
ul li {
  list-style-type: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

#app {
  font-family: "Montserrat", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 1em;
}

.container {
  margin: 2em auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
