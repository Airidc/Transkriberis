<template>
  <div class="audio-player">
    <audio id="audioPlayer">
      <source src="intervas1.wav" type="audio/wav"
    /></audio>
    <AudioControls></AudioControls>
    <div class="player">
      <!-- <buttonn class="volume"></buttonn> -->
      <span class="audio-btn--clickable play-pause">
        <PlayIcon></PlayIcon>
      </span>
      <div class="progress-bar"> </div>
      <div class="button-row">
        <span class="audio-btn--clickable">
          <VolumeIcon></VolumeIcon>
        </span>
        <span class="audio-btn--clickable">
          <RewindIcon class="flip"></RewindIcon>
          <span class="btn-text">Atgal 3sek.</span>
        </span>
        <span class="audio-btn--clickable">
          <span class="btn-text">Atgal 3sek.</span>
          <RewindIcon></RewindIcon>
        </span>
        <span class="audio-btn">
          <MinusIcon class="flip inner-btn"></MinusIcon>
          <span class="btn-text">
            Greitis
          </span>
          <span class="btn-text">x1</span>
          <PlusIcon class="inner-btn"></PlusIcon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AudioControls from "./AudioControls";
import VolumeIcon from "../assets/icons/VolumeIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import RewindIcon from "../assets/icons/RewindIcon";
import MinusIcon from "../assets/icons/MinusIcon";
import PlusIcon from "../assets/icons/PlusIcon";

export default {
  components: {
    AudioControls,
    VolumeIcon,
    PlayIcon,
    RewindIcon,
    MinusIcon,
    PlusIcon,
  },
};
</script>
<style lang="scss" scoped>
.player {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  width: 80%;
  border-radius: 4px;
  background: linear-gradient(145deg, #f8f8f8, #d1d1d1);
  box-shadow: 5px 5px 8px #a2a2a2, -5px -5px 8px #ffffff;

  .progres-bar {
    margin: 1em 1em 1em 0em;
    width: 100px;
    height: 3px;
    background: #006b5a;
    // transition: width 0.1s linear;
    // background-color: #42b883;
  }
}

.button-row {
  display: flex;
  flex-direction: row;
}

.audio-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1em;
  padding: 0 0.5em;

  min-width: 36px;
  min-height: 46px;
  border-radius: 5px;
  background: #e8e8e8;
  box-shadow: 7px 7px 10px #bcbcbc, -7px -7px 10px #ffffff;

  &--clickable {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 1em;
    padding: 0 0.5em;

    min-width: 36px;
    min-height: 46px;
    border-radius: 5px;
    background: #e8e8e8;
    box-shadow: 7px 7px 10px #bcbcbc, -7px -7px 10px #ffffff;

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
  margin: 5px;

  border-radius: 5px;
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
