import { useAppDispatch, useAppSelector } from "../store/hooks";
import { goToBrowse, goToStartMenu } from "../store/screenSlice";
//import "./StartScreen.css";


export function StartScreen() {
  const dispatch = useAppDispatch();
  const selectedGameId = useAppSelector(
    (state) => state.screen.selectedGameId
  );

   const selectedGame = useAppSelector((state) =>
    state.games.games.find((g) => g.id === selectedGameId)
  );

  return (
    <div className="start-screen">
      <h1>Netflix Games</h1>
      <p>Selected game: <strong>{selectedGame?.title}</strong></p>

      <button onClick={() => dispatch(goToStartMenu())}>
        Start Game
      </button>

      <button onClick={() => dispatch(goToBrowse())}>
        Back
      </button>

      <button onClick={() => window.close()}>
        Exit
      </button>
    </div>
  );
}
