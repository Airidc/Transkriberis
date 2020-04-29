<template>
  <div class="playlist">
    <div class="top">
      <h2>Playlist</h2>
      <span
        @click="handleViewClick"
        class="audio-btn--clickable"
        style="height: 40px; margin-left: 2.5em;"
      >
        {{ isPlaylistView ? "Upload files" : "Show playlist" }}
      </span>
      <span class="audio-btn--clickable settings-btn">
        <GearIcon></GearIcon
      ></span>
    </div>
    <ul v-if="isPlaylistView" class="file-list">
      <li class="file-list--item">
        <h4>1.</h4>
        <h4>MG International - Juoda Orchideja.mp3</h4>
      </li>
      <li class="file-list--item">
        <h4>1.</h4>
        <h4>MG International - Juoda Orchideja.mp3</h4>
      </li>
      <li class="file-list--item">
        <h4>1.</h4>
        <h4>MG International - Juoda Orchideja.mp3</h4>
      </li>
      <li class="file-list--item" v-for="file in files" :key="file.name">
        <h4>{{ index }}.</h4>
        <h4>{{ file.name }}</h4>
      </li>
    </ul>
    <div
      v-else
      class="drop-zone"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragleave="handleDragLeave"
    >
      <h4>Drop the 🎵 files here!</h4>
      <UploadIcon></UploadIcon>
    </div>
  </div>
</template>

<script>
import UploadIcon from "../assets/icons/UploadIcon";
import GearIcon from "../assets/icons/GearIcon";

export default {
  components: {
    UploadIcon,
    GearIcon,
  },
  data() {
    return {
      isPlaylistView: false,
      files: [],
    };
  },
  methods: {
    handleViewClick(event) {
      event.preventDefault();
      this.isPlaylistView = !this.isPlaylistView;
    },
    handleDragEnter(event) {
      event.preventDefault();
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
    },
    handleDragLeave(event) {
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2em auto;

  width: 90%;
  border-radius: 4px;
  background: linear-gradient(145deg, #f8f8f8, #d1d1d1);
  box-shadow: 5px 5px 8px #a2a2a2, -5px -5px 8px #ffffff;
}

.top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto auto;
  width: 90%;
}

.drop-zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 85%;
  min-width: 100px;
  min-height: 200px;
  margin: 2em auto;

  border-radius: 5px;
  box-shadow: 7px 7px 10px #bcbcbc, -7px -7px 10px #ffffff;

  &--enter,
  &:hover {
    box-shadow: inset 7px 7px 10px #bcbcbc, inset -7px -7px 10px #ffffff;
  }
}

.settings-btn {
  margin-left: auto;
}

.file-list {
  display: flex;
  flex-direction: column;

  &--item {
    display: flex;
    flex-direction: row;

    h4 {
      margin: 0.5em;
      font-style: italic;
      font-weight: 400;
    }
  }
}
</style>
