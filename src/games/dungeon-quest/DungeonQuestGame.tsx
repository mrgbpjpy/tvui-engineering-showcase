import { useState, useEffect } from "react";
import mainStart from "./assets/main_start.png";
// import { DungeonQuestWorld } from "./DungeonQuestWorld";

type GamePhase = "INTRO" | "PLAYING";

export function DungeonQuestGame() {
  const [phase, setPhase] = useState<GamePhase>("INTRO");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setPhase("PLAYING");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // --- INTRO SCREEN ---
  if (phase === "INTRO") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${mainStart})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundColor: "#000", // letterbox color
        }}
      />
    );
  }

  // --- GAMEPLAY ---
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Replace with <DungeonQuestWorld /> */}
      <h2>Dungeon Quest – Gameplay Loaded</h2>
    </div>
  );
}
