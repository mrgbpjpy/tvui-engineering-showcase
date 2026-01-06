import { useAppDispatch } from "../store/hooks";
import { goToBrowse, goToOptions } from "../store/screenSlice";
//import "./StartScreen.css";

export function StartScreen() {
  const dispatch = useAppDispatch();

  return (
    <div className="start-screen">
      <h1>Netflix Games</h1>

      <button onClick={() => dispatch(goToBrowse())}>
        Start Game
      </button>

      <button onClick={() => dispatch(goToOptions())}>
        Options
      </button>

      <button onClick={() => window.close()}>
        Exit
      </button>
    </div>
  );
}
