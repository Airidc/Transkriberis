<template>
  <div id="app">
    <h1>Transkriberis 😎🎤🎚</h1>
    <div class="container">
      <AudioPlayer></AudioPlayer>
      <TextEditor></TextEditor>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer";
import TextEditor from "./components/TextEditor";

export default {
  name: "App",
  components: {
    AudioPlayer,
    TextEditor,
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

ul,
ul li {
  list-style-type: none;
}

#app {
  font-family: "Montserrat", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
