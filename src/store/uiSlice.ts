import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  focusedGameId: string;
}

const initialState: UiState = {
  focusedGameId: "game-1",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFocusedGame(state, action: PayloadAction<string>) {
      state.focusedGameId = action.payload;
    },
  },
});

export const { setFocusedGame } = uiSlice.actions;
export default uiSlice.reducer;
