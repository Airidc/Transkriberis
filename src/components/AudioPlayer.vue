<template>
  <div class="audio-player">
    <audio id="audioPlayer" @timeupdate="handleTimeUpdate">
      <source id="audioPlayerSource" />
    </audio>
    <div class="player">
      <div class="main-row">
        <span @click="handlePlayPause" class="audio-btn--clickable play-pause">
          <PlayIcon v-if="!audio.isPlaying"></PlayIcon>
          <PauseIcon v-else></PauseIcon>
        </span>
        <div class="progress-bar-container">
          <div class="audio--text">
            <h4 v-if="audio.src" class="time">{{ currentPlayTime }}</h4>
            <h4>{{ audio.name ? audio.name : "Nothing is playing 🙉" }}</h4>
          </div>
          <div class="progress-bar--wrapper">
            <input
              type="range"
              name="progress-bar"
              min="0"
              step="0.5"
              @input="handleProgressbarClick"
              id="progress-bar"
              class="progress-slider progress-bar"
            />
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
          <span class="btn-text">
            Rewind {{ this.settings.options.rewindSeconds }}sec
          </span>
        </span>
        <span @click="handleRewind(true)" class="audio-btn--clickable">
          <span class="btn-text">
            Forward {{ this.settings.options.rewindSeconds }}sec
          </span>
          <RewindIcon></RewindIcon>
        </span>
        <span class="audio-btn">
          <span @click="handlePlaybackSpeed(false)">
            <MinusIcon class="flip inner-btn"></MinusIcon>
          </span>
          <span class="btn-text">
            Playback Speed
          </span>
          <span class="btn-text">
            x{{ parseFloat(audio.playbackSpeed).toFixed(2) }}
          </span>
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
        playbackSpeed: 1.0,
        duration: undefined,
        currentTime: null,
        name: null,
        src: null,
      },
      audioPlayer: null,
      audioPlayerSource: null,
      progressBarElement: null,
      isVolumeSliderVisible: false,
      isFileLoaded: false,
    };
  },
  computed: {
    currentPlayTime: function() {
      return (
        this.convertSeconds(this.audio.currentTime) +
        " / " +
        this.convertSeconds(this.audio.duration)
      );
    },
    isModalOpen: function() {
      return this.$store.state.isModalOpen;
    },
    settings: function() {
      return this.$store.state.settings;
    },
  },
  mounted() {
    this.audioPlayer = document.getElementById("audioPlayer");
    this.audioPlayerSource = document.getElementById("audioPlayerSource");
    this.progressBarElement = document.querySelector("#progress-bar");
    this.progressBarElement.value = 0;

    this.audioPlayer.addEventListener("loadeddata", this.addPlayTimeValues);
    document.addEventListener("keyup", this.handleKeyUp);
  },
  methods: {
    addPlayTimeValues: function(event) {
      this.audio.duration = parseInt(event.target.duration) || 0;
      this.audio.currentTime = parseInt(event.target.currentTime) || 0;
      this.progressBarElement.max = this.audio.duration;
    },
    handleAudioMount: function(event) {
      this.audio.isPlaying = false;
      this.audio.playbackSpeed = 1;
      this.audio.duration = undefined;
      this.audio.currentTime = null;
      this.audio.name = null;
      this.audio.src = null;

      this.audio.name = event.name;
      this.audio.src = event.src;
      this.audioPlayerSource.src = event.src;
      this.audioPlayer.load();
    },
    handleTimeUpdate: function(event) {
      let duration = event.target.duration;
      let currentTime = event.target.currentTime;
      if (duration === currentTime) {
        this.audio.isPlaying = false;
        this.audioPlayer.pause();
      }

      this.audio.duration = parseInt(duration);
      this.audio.currentTime = parseInt(currentTime);

      this.progressBarElement.value = parseInt(currentTime);
    },
    handlePlayPause: function() {
      if (!this.audio.src) {
        return;
      }

      if (this.audio.isPlaying) {
        //pause
        this.audioPlayer.pause();
      } else {
        if (this.settings.options.rewindAfterPause)
          this.handleRewind(
            false,
            this.settings.options.rewindAfterPauseSeconds
          );
        this.audioPlayer.play();
      }

      this.audio.isPlaying = !this.audio.isPlaying;
    },
    handleProgressbarClick: function() {
      if (!this.audio.src) {
        return;
      }

      this.audioPlayer.currentTime = this.progressBarElement.value;
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
    handleRewind: function(isForward, amount = null) {
      if (!this.audio.src) {
        return;
      }

      if (!amount) {
        amount = parseFloat(this.settings.options.rewindSeconds);
      }

      if (
        isForward &&
        this.audioPlayer.duration - this.audioPlayer.currentTime >= amount
      ) {
        this.audioPlayer.currentTime = this.audioPlayer.currentTime + amount;
      } else if (!isForward && this.audioPlayer.currentTime >= amount) {
        this.audioPlayer.currentTime = this.audioPlayer.currentTime - amount;
      }
    },
    handlePlaybackSpeed: function(isIncreased) {
      let speedStep = parseFloat(this.settings.options.playbackSpeedStep);
      if (
        (isIncreased &&
          (this.audio.playbackSpeed === 3 ||
            this.audio.playbackSpeed + speedStep >= 3.01)) ||
        (!isIncreased &&
          (this.audio.playbackSpeed === 0 ||
            this.audio.playbackSpeed - speedStep <= 0.01))
      ) {
        return;
      }

      this.audio.playbackSpeed = isIncreased
        ? this.audio.playbackSpeed + parseFloat(speedStep)
        : this.audio.playbackSpeed - speedStep;

      this.audioPlayer.playbackRate = this.audio.playbackSpeed;
    },
    handleKeyUp: function(event) {
      if (this.isModalOpen) {
        return;
      }

      if (
        this.settings.keyBindings.playPause &&
        event.code === this.settings.keyBindings.playPause
      ) {
        this.handlePlayPause();
      }

      if (
        this.settings.keyBindings.rewind &&
        event.code === this.settings.keyBindings.rewind
      ) {
        this.handleRewind(false);
      }

      if (
        this.settings.keyBindings.forward &&
        event.code === this.settings.keyBindings.forward
      ) {
        this.handleRewind(true);
      }

      if (
        this.settings.keyBindings.playbackSpeedIncrease &&
        event.code === this.settings.keyBindings.playbackSpeedIncrease
      ) {
        this.handlePlaybackSpeed(true);
      }

      if (
        this.settings.keyBindings.playbackSpeedDecrease &&
        event.code === this.settings.keyBindings.playbackSpeedDecrease
      ) {
        this.handlePlaybackSpeed(false);
      }
    },
    convertSeconds: function(seconds) {
      if (!seconds) {
        return "00:00:00";
      }

      let hours = Math.floor(seconds / 3600);
      hours >= 1 ? (seconds = seconds - hours * 3600) : (hours = 0);

      let minutes = Math.floor(seconds / 60);
      minutes >= 1 ? (seconds = seconds - minutes * 60) : (minutes = 0);

      hours.toString().length == 1 ? (hours = "0" + hours) : void 0;
      minutes.toString().length == 1 ? (minutes = "0" + minutes) : void 0;
      seconds.toString().length == 1 ? (seconds = "0" + seconds) : void 0;

      return `${hours === 0 ? "" : hours + ":"}${
        minutes === 0 ? "00:" : minutes + ":"
      }${seconds}`;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/slider.scss";

.time {
  margin-right: 1em;
  width: 33%;
}

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
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    margin: auto 1em;

    h4 {
      margin: 0.33em;
    }

    .progress-bar {
      margin: auto auto;
      width: 100%;

      &--wrapper {
        width: 95%;
      }
    }
  }
}

.audio--text {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.button-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.audio-btn {
  display: flex;
  justify-content: space-between;
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

  .btn-text {
    width: 25%;
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
