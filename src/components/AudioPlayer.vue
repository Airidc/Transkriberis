<template>
  <div class="audio-player">
    <audio id="audioPlayer" controls>
      <source id="audioPlayerSource" />
    </audio>
    <AudioControls></AudioControls>
    <div class="player">
      <!-- <buttonn class="volume"></buttonn> -->
      <div class="main-row">
        <span @click="handlePlayPause" class="audio-btn--clickable play-pause">
          <PlayIcon v-if="!audio.isPlaying"></PlayIcon>
          <PauseIcon v-else></PauseIcon>
        </span>
        <div class="progress-bar-container">
          <h4>{{ audio.name ? audio.name : "Niekas negroja 🙉" }}</h4>
          <span class="progress-bar"> </span>
          <span class="progress-bar--background"> </span>
        </div>
      </div>
      <div class="button-row">
        <span @click="handleVolumeClick" class="audio-btn--clickable">
          <VolumeIcon></VolumeIcon>
        </span>
        <span @click="handleRewind" class="audio-btn--clickable">
          <RewindIcon class="flip"></RewindIcon>
          <span class="btn-text">Atgal 3sek.</span>
        </span>
        <span @click="handleRewind" class="audio-btn--clickable">
          <span class="btn-text">Pirmyn 3sek.</span>
          <RewindIcon></RewindIcon>
        </span>
        <span class="audio-btn">
          <MinusIcon
            @click="handlePlaybackSpeed"
            class="flip inner-btn"
          ></MinusIcon>
          <span class="btn-text">
            Greitis
          </span>
          <span class="btn-text">x1</span>
          <PlusIcon @click="handlePlaybackSpeed" class="inner-btn"></PlusIcon>
        </span>
      </div>
    </div>

    <Playlist @mountAudio="handleAudioMount"></Playlist>
  </div>
</template>

<script>
import AudioControls from "./AudioControls";
import Playlist from "./Playlist";
import VolumeIcon from "../assets/icons/VolumeIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import PauseIcon from "../assets/icons/PauseIcon";
import RewindIcon from "../assets/icons/RewindIcon";
import MinusIcon from "../assets/icons/MinusIcon";
import PlusIcon from "../assets/icons/PlusIcon";

export default {
  components: {
    AudioControls,
    VolumeIcon,
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
        name: null,
        src: null,
      },
      audioPlayer: null,
      audioPlayerSource: null,
      isPlaying: false,
      isFileLoaded: false,
      settings: {
        playbackSpeed: 1,
        volume: 1,
        autoplay: false,
        muted: false,
      },
    };
  },
  mounted: function() {
    this.audioPlayer = document.getElementById("audioPlayer");
    this.audioPlayerSource = document.getElementById("audioPlayerSource");
  },

  methods: {
    handleAudioMount: function(event) {
      // console.log("audio mount", event.src);
      // console.log("audio", this.audioPlayer, this.audio);

      // let audioPlayer = document.getElementById("audioPlayer");
      // let audioPlayerSource = document.getElementById("audioPlayerSource");
      this.audio.name = event.name;
      this.audio.src = event.src;
      this.audioPlayerSource.src = event.src;
      this.audioPlayer.load();
    },
    handlePlayPause: function(event) {
      event.preventDefault();
      if (this.audio.isPlaying) {
        //pause
        this.audioPlayer.pause();
      } else {
        this.audioPlayer.play();
      }

      this.audio.isPlaying = !this.audio.isPlaying;
    },
    handleVolumeClick: function(event) {
      event.preventDefault();
    },
    handleRewind: function(event) {
      event.preventDefault();
    },
    handleForward: function(event) {
      event.preventDefault();
    },
    handlePlaybackSpeed: function(event) {
      event.preventDefault();
    },
  },
};
</script>
<style lang="scss">
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
      width: 0px;
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
