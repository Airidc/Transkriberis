<template>
  <div class="text-container">
    <h2>Tekstas:</h2>
    <button class="btn" @click="clearTextArea">Išvalyti teksto lauką</button>
    <div class="text-area-containter">
      <textarea
        name="text"
        id="text-area"
        cols="60"
        rows="25"
        style="resize: none;"
        :value="savedText"
        @input="saveProgress"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      savedText: "",
    };
  },
  mounted() {
    this.savedText = localStorage.getItem("savedText") || "";
  },
  methods: {
    saveProgress(event) {
      localStorage.setItem("savedText", event.srcElement.value);
    },
    clearTextArea() {
      this.savedText = "";
      localStorage.setItem("savedText", event.srcElement.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-container {
  position: relative;
  width: 90%;
  border-radius: 4px;
  background: linear-gradient(145deg, #f8f8f8, #d1d1d1);
  box-shadow: 5px 5px 8px #a2a2a2, -5px -5px 8px #ffffff;

  textarea {
    padding: 15px;
    box-sizing: border-box; /* fit parent width */
    border: 0;
    height: 90%;
    width: 95%;
    background-color: #f8f8f8;
    box-shadow: inset 5px 5px 8px #a2a2a2, inset -5px -5px 8px #ffffff;
  }
}

.btn {
  position: absolute;

  padding: 0.2em;
  top: 0.75em;
  right: 0.75em;
}

@media (min-width: 1235px) {
  .text-container {
    width: 45%;
  }
}
</style>
