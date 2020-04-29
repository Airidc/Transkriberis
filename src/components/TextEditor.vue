<template>
  <div class="text-container">
    <h2>Tekstas:</h2>
    <div class="text-area-containter">
      <textarea
        name="text"
        id="text-area"
        cols="60"
        rows="40"
        resize
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.text-container {
  width: 50%;
  border-radius: 4px;
  background: linear-gradient(145deg, #f8f8f8, #d1d1d1);
  box-shadow: 5px 5px 8px #a2a2a2, -5px -5px 8px #ffffff;

  textarea {
    box-sizing: border-box; /* fit parent width */
    border: 0;
    height: 90%;
    width: 95%;
  }
}
</style>
