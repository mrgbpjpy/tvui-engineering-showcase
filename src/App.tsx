import { useAppSelector } from "./store/hooks";
import { GameRow } from "./components/GameRow";
import { StartScreen } from "./screens/StartScreen";
import { DungeonQuestGame } from "./games/dungeon-quest/DungeonQuestGame";
import "./App.css";

export default function App() {
  const screen = useAppSelector((state) => state.screen.current);
  const selectedGameId = useAppSelector(
    (state) => state.screen.selectedGameId
  );

  // --- PLAYING (GAME RUNTIME) ---
  if (screen === "PLAYING") {
    console.log("SCREEN:", screen, selectedGameId);

    switch (selectedGameId) {
      case "dungeon-quest":
        return <DungeonQuestGame />;

      default:
        return <div>No game found</div>;
    }
  }

  // --- CONFIRM START ---
  if (screen === "CONFIRM_START") {
    return <StartScreen />;
  }

  // --- START MENU / BROWSE ---
  return (
    <div className="app">
      <h1>Netflix Games</h1>
      <GameRow />
    </div>
  );
}
