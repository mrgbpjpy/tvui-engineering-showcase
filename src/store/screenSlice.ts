import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type Screen = "START_MENU" | "BROWSE" | "CONFIRM_START" | "OPTIONS"

interface ScreenState {
  current: Screen;
  selectedGameId: string | null;
}

const initialState: ScreenState = {
  current: "START_MENU",
  selectedGameId: null,
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    goToBrowse(state) {
      state.current = "BROWSE";
      state.selectedGameId = null;
    },
    selectGame(state, action: PayloadAction<string>) {
      state.current = "CONFIRM_START";
      state.selectedGameId = action.payload;
    },
    goToStartMenu(state) {
      state.current = "START_MENU";
      state.selectedGameId = null;
    },
    goToOptions(state) {
      state.current = "OPTIONS";
    },
  },
});


export const {
  goToBrowse,
  selectGame,
  goToStartMenu,
  goToOptions,
} = screenSlice.actions;

export default screenSlice.reducer;

