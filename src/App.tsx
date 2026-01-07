import { useAppSelector } from "./store/hooks";
import { GameRow } from "./components/GameRow";
import { StartScreen } from "./screens/StartScreen";
import "./App.css";

export default function App() {
  const screen = useAppSelector((state) => state.screen.current);
  

  // --- START SCREEN ---
 // --- START MENU ---
  if (screen === "START_MENU") {
    return (
      <div className="app">
        <h1>Netflix Games</h1>
        <GameRow />
      </div>
    );
  }

  // --- GAME CONFIRM / START GAME SCREEN ---
  if (screen === "CONFIRM_START") {
    return (
      <StartScreen />
    );
  }

  // --- BROWSE / GAME ROW SCREEN ---
  return (
    <div className="app">
      <h1>Netflix Games</h1>
      <GameRow />
    </div>
  );
}
