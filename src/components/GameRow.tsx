import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFocusedGame } from "../store/uiSlice";
import { GameCard } from "./GameCard";

export function GameRow() {
  const games = useAppSelector((state) => state.games.games);
  const focusedGameId = useAppSelector((state) => state.ui.focusedGameId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const index = games.findIndex((g) => g.id === focusedGameId);

      if (e.key === "ArrowRight" && index < games.length - 1) {
        dispatch(setFocusedGame(games[index + 1].id));
      }

      if (e.key === "ArrowLeft" && index > 0) {
        dispatch(setFocusedGame(games[index - 1].id));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [games, focusedGameId, dispatch]);

  return (
    <div className="game-row">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          focused={game.id === focusedGameId}
          onSelect={() => dispatch(setFocusedGame(game.id))}
        />
      ))}
    </div>
  );
}
