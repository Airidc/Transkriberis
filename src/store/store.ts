import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { audioPlayerSlice } from "./slices/audioPlayerSlice";

const combinedReducers = combineReducers({
  audioPlayerReducer: audioPlayerSlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

const rootReducer = (state: RootState, action: AnyAction) => {
  return combinedReducers(state, action);
};

export const store = configureStore<RootState>({
  //@ts-ignore
  reducer: rootReducer,
  devTools: true, //process.env.NODE_ENV !== "production",
});
