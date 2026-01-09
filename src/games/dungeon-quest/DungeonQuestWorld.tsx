import BG from "./assets/BG.png";
import { Player } from "./Player";
import { usePlayerMovement } from "./usePlayerMovement";
import { clamp } from "./utils/clamp";
import { useEffect, useState } from "react";

const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 2000;

const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;

export function DungeonQuestWorld() {
  const { position } = usePlayerMovement(
    WORLD_WIDTH,
    WORLD_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );

  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track screen resize
  useEffect(() => {
    const onResize = () =>
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // CAMERA CALCULATION
  const cameraX = clamp(
    position.x + PLAYER_WIDTH / 2 - screen.width / 2,
    0,
    WORLD_WIDTH - screen.width
  );

  const cameraY = clamp(
    position.y + PLAYER_HEIGHT / 2 - screen.height / 2,
    0,
    WORLD_HEIGHT - screen.height
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* CAMERA / WORLD */}
      <div
        style={{
          position: "absolute",
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate(-${cameraX}px, -${cameraY}px)`,
        }}
      >
        {/* MAP */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${BG})`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* PLAYER */}
        <Player x={position.x} y={position.y} />
      </div>
    </div>
  );
}