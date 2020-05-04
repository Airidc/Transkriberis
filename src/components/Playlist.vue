<template>
  <div class="playlist">
    <div class="top">
      <h2>{{ !isPlaylistView ? "Failų įkėlimas" : "Grojaraštis" }}</h2>
      <span
        @click="handleViewClick"
        class="audio-btn--clickable"
        style="height: 40px; margin-left: 2.5em;"
      >
        {{ isPlaylistView ? "Įkelti failus" : "Rodyti grojaraštį" }}
      </span>
      <span class="audio-btn--clickable settings-btn">
        <GearIcon></GearIcon
      ></span>
    </div>
    <ul v-if="isPlaylistView" class="file-list">
      <li
        class="file-list--item"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="handleSongClick(file, $event)"
        v-for="(file, index) in audioSources"
        :key="file.name + index"
      >
        <PlayIcon class="invisible"></PlayIcon>
        <h4>{{ ++index }}.</h4>
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
import PlayIcon from "../assets/icons/PlayIcon";

export default {
  components: {
    UploadIcon,
    GearIcon,
    PlayIcon,
  },
  data() {
    return {
      audioSources: [],
      isPlaylistView: false,
    };
  },
  methods: {
    handleMouseEnter(event) {
      event.preventDefault();
      let icon = event.target.querySelector("svg");
      if (!icon || !icon.classList.contains("invisible")) {
        return;
      }

      icon.classList.remove("invisible");
    },
    handleMouseLeave(event) {
      event.preventDefault();
      let icon = event.target.querySelector("svg");
      if (
        !icon ||
        icon.classList.contains("invisible") ||
        icon.parentElement.classList.contains("file-list--item-playing")
      ) {
        return;
      }

      icon.classList.add("invisible");
    },
    handleSongClick(audio, event) {
      event.preventDefault();

      //clear all other active items
      document.querySelectorAll(".file-list--item-playing").forEach((el) => {
        el.classList.remove("file-list--item-playing");
        el.querySelector("svg").classList.add("invisible");
      });

      let target = event.target;

      if (event.target.tagName === "H4" || event.target.tagName === "svg") {
        target = target.parentElement;
      }

      target.classList.add("file-list--item-playing");
      target.querySelector("svg").classList.remove("invisible");

      this.$emit("mountAudio", audio);
    },
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
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (event.dataTransfer.items[i].kind === "file") {
            let file = event.dataTransfer.items[i].getAsFile();
            this.audioSources.push({
              src: URL.createObjectURL(file),
              name: file.name,
              isPlaying: false,
            });
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          let file = event.dataTransfer.files[i];
          this.audioSources.push({
            src: URL.createObjectURL(file),
            name: file.name,
            isPlaying: false,
          });
        }
      }
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

  width: 100%;
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
  box-shadow: inset 7px 7px 10px #bcbcbc, inset -7px -7px 10px #ffffff;
}

.settings-btn {
  margin-left: auto;
}

.file-list {
  display: flex;
  flex-direction: column;
  margin: 1em auto;
  width: 90%;

  &--item {
    display: flex;
    flex-direction: row;
    align-self: auto;
    border: 1px solid transparent;
    margin-bottom: 4px;
    justify-self: center;

    &:hover,
    &-playing {
      border-radius: 5px;
      border: 1px solid #006b5a;
      box-shadow: inset 7px 7px 10px #bcbcbc, inset -7px -7px 10px #ffffff;
    }

    h4 {
      margin: 0.5em;
      padding-top: 2px;
      font-style: italic;
      font-weight: 400;
    }
  }
}

.invisible {
  visibility: hidden;
}
</style>
