<template>
  <div class="audio-player">
    <audio id="audioPlayer" @timeupdate="handleTimeUpdate">
      <source id="audioPlayerSource" />
    </audio>
    <!-- <AudioControls></AudioControls> -->
    <div class="player">
      <div class="main-row">
        <span @click="handlePlayPause" class="audio-btn--clickable play-pause">
          <PlayIcon v-if="!audio.isPlaying"></PlayIcon>
          <PauseIcon v-else></PauseIcon>
        </span>
        <div class="progress-bar-container">
          <h4>{{ audio.name ? audio.name : "Niekas negroja 🙉" }}</h4>
          <div @click="handleProgressbarClick" class="progres-bar--wrapper">
            <span class="progress-bar" id="progress-bar"> </span>
            <span class="progress-bar--background"> </span>
          </div>
        </div>
      </div>
      <div class="button-row">
        <span
          @click="handleVolumeClick"
          class="audio-btn--clickable volume-controls"
        >
          <VolumeIcon v-if="!audio.isMuted"></VolumeIcon>
          <VolumeMuteIcon v-else></VolumeMuteIcon>
          <input
            v-show="isVolumeSliderVisible"
            @input="handleVolume"
            type="range"
            name="volume"
            id="volume"
            value="1"
            class="slider"
            min="0"
            max="1"
            step="0.01"
          />
        </span>
        <span @click="handleRewind(false)" class="audio-btn--clickable">
          <RewindIcon class="flip"></RewindIcon>
          <span class="btn-text">Atgal 3sek.</span>
        </span>
        <span @click="handleRewind(true)" class="audio-btn--clickable">
          <span class="btn-text">Pirmyn 3sek.</span>
          <RewindIcon></RewindIcon>
        </span>
        <span class="audio-btn">
          <!--  -->
          <span @click="handlePlaybackSpeed(false)">
            <MinusIcon class="flip inner-btn"></MinusIcon>
          </span>
          <span class="btn-text">
            Greitis
          </span>
          <span class="btn-text">x{{ audio.playbackSpeed }}</span>
          <!--  -->
          <span @click="handlePlaybackSpeed(true)">
            <PlusIcon class="inner-btn"></PlusIcon>
          </span>
        </span>
      </div>
    </div>

    <Playlist @mountAudio="handleAudioMount"></Playlist>
  </div>
</template>

<script>
// import AudioControls from "./AudioControls";
import Playlist from "./Playlist";
import VolumeIcon from "../assets/icons/VolumeIcon";
import VolumeMuteIcon from "../assets/icons/VolumeMuteIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import PauseIcon from "../assets/icons/PauseIcon";
import RewindIcon from "../assets/icons/RewindIcon";
import MinusIcon from "../assets/icons/MinusIcon";
import PlusIcon from "../assets/icons/PlusIcon";

export default {
  components: {
    // AudioControls,
    VolumeIcon,
    VolumeMuteIcon,
    PlayIcon,
    PauseIcon,
    RewindIcon,
    MinusIcon,
    PlusIcon,
    Playlist,
  },
  data() {
    return {
      audio: {
        isPlaying: false,
        isMuted: false,
        playbackSpeed: 1,
        name: null,
        src: null,
      },
      audioPlayer: null,
      audioPlayerSource: null,
      progressBarElement: null,
      progressBarWidth: 0,
      isPlaying: false,
      isVolumeSliderVisible: false,
      isFileLoaded: false,
    };
  },
  mounted: function() {
    this.audioPlayer = document.getElementById("audioPlayer");
    this.audioPlayerSource = document.getElementById("audioPlayerSource");
    this.progressBarElement = document.querySelector("#progress-bar");
    this.progressBarWidth = parseInt(
      window
        .getComputedStyle(document.querySelector(".progress-bar--background"))
        .getPropertyValue("width")
        .replace("px", "")
    );
  },
  methods: {
    handleAudioMount: function(event) {
      this.audio.name = event.name;
      this.audio.src = event.src;
      this.audioPlayerSource.src = event.src;
      this.audioPlayer.load();
    },
    handleTimeUpdate: function(event) {
      // console.log(event);
      let duration = event.target.duration;
      let currentTime = event.target.currentTime;

      this.progressBarElement.style.width = `${(currentTime / duration) *
        100}%`;
    },
    handlePlayPause: function() {
      if (!this.audio.src) {
        return;
      }

      if (this.audio.isPlaying) {
        //pause
        this.audioPlayer.pause();
      } else {
        this.audioPlayer.play();
      }

      this.audio.isPlaying = !this.audio.isPlaying;
    },
    handleProgressbarClick: function(event) {
      // console.log("clicking!!!", event);
      if (!this.audio.src) {
        return;
      }

      let progression = event.offsetX / this.progressBarWidth;
      this.progressBarElement.style.width = `${progression * 100}%`;

      // console.log(event.offsetX, this.progressBarWidth);
      this.audioPlayer.currentTime = this.audioPlayer.duration * progression;
      // console.log(this.audioPlayer.duration, progression, clickedTime);
    },
    handleVolumeClick: function() {
      this.isVolumeSliderVisible = !this.isVolumeSliderVisible;
    },
    handleVolume: function(event) {
      if (event.target.value == 0) {
        this.audio.isMuted = true;
      } else {
        this.audio.isMuted = false;
      }

      this.audioPlayer.volume = event.target.value;
    },
    handleRewind: function(forward) {
      console.log(
        "REWIND:",
        forward,
        this.audioPlayer.duration - this.audioPlayer.currentTime,
        this.audioPlayer.currentTime
      );
      if (!this.audio.src) {
        // || this.audioPlayer.currentTime < 3000) {
        return;
      }

      if (
        forward &&
        this.audioPlayer.duration - this.audioPlayer.currentTime >= 3
      ) {
        this.audioPlayer.currentTime = this.audioPlayer.currentTime + 3;
      } else if (!forward && this.audioPlayer.currentTime >= 3) {
        this.audioPlayer.currentTime = this.audioPlayer.currentTime - 3;
      }
    },
    handlePlaybackSpeed: function(increased) {
      console.log("playback", increased);
      if (
        (increased && this.audio.playbackSpeed === 3) ||
        (!increased && this.audio.playbackSpeed === 0)
      ) {
        console.log("returning");
        return;
      }

      this.audio.playbackSpeed = increased
        ? this.audio.playbackSpeed + 0.25
        : this.audio.playbackSpeed - 0.25;

      this.audioPlayer.playbackRate = this.audio.playbackSpeed;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/slider.scss";

.volume-controls {
  position: relative;
}

#volume {
  position: absolute;
  max-width: 170px;
  min-width: 100px;
  transform: rotate(-90deg);
  width: 10%;
  top: -1em;
  left: 1em;

  background-color: #d1d1d1;
  padding: 10px;
  border: 2px solid #006b5a;
  border-radius: 5px;
  z-index: 3;
}

.player {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  width: 100%;
  border-radius: 4px;
  background: linear-gradient(145deg, #f8f8f8, #d1d1d1);
  box-shadow: 5px 5px 8px #a2a2a2, -5px -5px 8px #ffffff;

  .main-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress-bar-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 75%;
    height: 26px;
    margin-right: 2em;

    .progress-bar {
      position: absolute;
      top: 1.75em;
      left: 0;
      margin: auto auto;
      width: 0%;
      height: 8px;
      z-index: 2;
      background: #006b5a;
      // transition: width 0.1s linear;
      // background-color: #42b883;

      &--background {
        position: absolute;
        top: 1.75em;
        left: 0;
        width: 100%;
        height: 8px;
        z-index: 1;
        background: #006b5a55;
      }
    }
  }
}

.button-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.audio-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0.5em;
  padding: 0 0.5em;

  min-width: 36px;
  min-height: 46px;
  border-radius: 5px;
  background: #e8e8e8;
  box-shadow: 7px 7px 10px #bcbcbc, -7px -7px 10px #ffffff;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &--clickable {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0.5em;
    padding: 0 0.5em;

    min-width: 36px;
    min-height: 46px;
    border-radius: 5px;
    background: #e8e8e8;
    box-shadow: 7px 7px 10px #bcbcbc, -7px -7px 10px #ffffff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      box-shadow: inset 7px 7px 10px #bcbcbc, inset -7px -7px 10px #ffffff;
    }
  }

  svg {
    margin: 0 auto;
  }
}

.flip {
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.inner-btn {
  height: auto;
  margin: 3px;

  border-radius: 3px;
  &:hover {
    box-shadow: inset 7px 7px 10px #bcbcbc, inset -7px -7px 10px #ffffff;
  }
}

.play-pause {
  width: 36px;
}

.btn-text {
  padding: 0 0.5em;
}
</style>
