import { useState, useEffect, useRef } from "react";
import mainStart from "./assets/main_start.png";
import startButton from "./assets/Start-Button.png";
import introMusic from "./assets/audio/intro-theme.mp3";
import { DungeonQuestWorld } from "./DungeonQuestWorld";

type GamePhase = "INTRO" | "PLAYING";

export function DungeonQuestGame() {
  const [phase, setPhase] = useState<GamePhase>("INTRO");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startGame = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPhase("PLAYING");
  };

  // 🎵 Intro music lifecycle (INTRO only)
  useEffect(() => {
    if (phase !== "INTRO") return;

    const audio = new Audio(introMusic);
    audio.loop = true;
    audio.volume = 0.5;

    audio.play().catch(() => {});
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [phase]);

  // ⌨️ Enter key to start (INTRO only)
  useEffect(() => {
    if (phase !== "INTRO") return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        startGame();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // ─────────────────────────────────────────
  // INTRO SCREEN
  // ─────────────────────────────────────────
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
          backgroundColor: "#000",
        }}
      >
        {/* START BUTTON */}
        <div
          onClick={startGame}
          style={{
            position: "absolute",
            bottom: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            animation: "pulse 1.8s infinite ease-in-out",
          }}
        >
          <img
            src={startButton}
            alt="Start Game"
            style={{
              width: "260px",
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* MUSIC CREDIT */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            width: "100%",
            textAlign: "center",
            fontSize: "12px",
            color: "#bbb",
            opacity: 0.8,
          }}
        >
          Music by{" "}
          <a
            href="https://pixabay.com/users/reylagstudios-36363245/"
            target="_blank"
            rel="noreferrer"
          >
            ReyLagStudios
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
            Pixabay
          </a>
        </div>

        {/* PULSE ANIMATION */}
        <style>
          {`
            @keyframes pulse {
              0%   { transform: translateX(-50%) scale(1); }
              50%  { transform: translateX(-50%) scale(1.05); }
              100% { transform: translateX(-50%) scale(1); }
            }
          `}
        </style>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // GAMEPLAY
  // ─────────────────────────────────────────
  return <DungeonQuestWorld />;
}