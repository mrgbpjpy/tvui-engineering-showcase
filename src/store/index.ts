import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import uiReducer from "./uiSlice";
import screenReducer from "./screenSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    ui: uiReducer,
    screen: screenReducer,
  },
});

// ✅ RTK-recommended inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
