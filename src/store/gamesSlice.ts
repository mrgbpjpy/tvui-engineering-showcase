import { createSlice } from "@reduxjs/toolkit";

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
}

interface GamesState {
  games: Game[];
}

const initialState: GamesState = {
  games: [
    {
      id: "space-runner",
      title: "Space Runner",
      thumbnail: "/images/game-1.jpg",
    },
    {
      id: "dungeon-quest",
      title: "Dungeon Quest",
      thumbnail: "/images/game-2.jpg",
    },
    {
      id: "cyber-arena",
      title: "Cyber Arena",
      thumbnail: "/images/game-3.jpg",
    },
  ],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
});

export default gamesSlice.reducer;
