import type { Game } from "../store/gamesSlice";

interface Props {
  game: Game;
  focused: boolean;
  onSelect: () => void;
}

export function GameCard({ game, focused, onSelect }: Props) {
  return (
    <div
      className={`game-card ${focused ? "focused" : ""}`}
      onClick={onSelect}
    >
      <img src={game.thumbnail} alt={game.title} />
      <span className="title">{game.title}</span>
    </div>
  );
}
