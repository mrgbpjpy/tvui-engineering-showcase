import { useState, useEffect, useRef } from "react";
import mainStart from "./assets/main_start.png";
import startButton from "./assets/Start-Button.png";
import introMusic from "./assets/audio/intro-theme.mp3";
// import { DungeonQuestWorld } from "./DungeonQuestWorld";

type GamePhase = "INTRO" | "PLAYING";

export function DungeonQuestGame() {
  const [phase, setPhase] = useState<GamePhase>("INTRO");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() =>{
    const audio = new Audio(introMusic);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play().catch(() => {});
    audioRef.current = audio;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  },[phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setPhase("PLAYING");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
const startGame = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.pause();
    }
    setPhase("PLAYING");
  };

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
              transition: "transform 180ms ease, filter 180ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
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
            color: "#8b1212ff",
            opacity: 0.75,
          }}
        >
          Music by{" "}
          <a
            href="https://pixabay.com/users/reylagstudios-36363245/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#0743c4ff" }}
          >
            ReyLagStudios
          </a>{" "}
          from{" "}
          <a
            href="https://pixabay.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#e70bc3ff" }}
          >
            Pixabay
          </a>
        </div>

        {/* PULSE ANIMATION */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: translateX(-50%) scale(1); filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
              50% { transform: translateX(-50%) scale(1.04); filter: drop-shadow(0 0 10px rgba(255,255,255,0.35)); }
              100% { transform: translateX(-50%) scale(1); filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
            }
          `}
        </style>
      </div>
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
      {/* Replace with DungeonQuestWorld */}
      <h2>Dungeon Quest – Gameplay Loaded</h2>
    </div>
  );
}

