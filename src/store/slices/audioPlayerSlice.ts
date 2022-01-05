import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AudioPlayerSliceStore {
  isPlaying: boolean;
  isMuted: boolean;
  playbackSpeed: number;
  duration: number;
  currentTime: number;
  name: string;
  src: string;
}

const initialState: AudioPlayerSliceStore = {
  isPlaying: false,
  isMuted: false,
  playbackSpeed: 1.0,
  duration: 0,
  currentTime: 0,
  name: "",
  src: "",
};

export const audioPlayerSlice = createSlice({
  name: "audioPlayerSlice",
  initialState,
  reducers: {
    setIsPlaying: (state: AudioPlayerSliceStore, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsMuted: (state: AudioPlayerSliceStore, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setPlaybackSpeed: (state: AudioPlayerSliceStore, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },
    setDuration: (state: AudioPlayerSliceStore, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state: AudioPlayerSliceStore, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setName: (state: AudioPlayerSliceStore, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSource: (state: AudioPlayerSliceStore, action: PayloadAction<string>) => {
      state.src = action.payload;
    },
  },
});

export const { setIsPlaying, setIsMuted, setPlaybackSpeed, setCurrentTime, setDuration, setName, setSource } =
  audioPlayerSlice.actions;
export const selectAudioPlayerData = (state: RootState) => state.audioPlayerReducer;
