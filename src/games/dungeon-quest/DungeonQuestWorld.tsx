import BG from "./assets/BG.png";

import { Player } from "./Player";
import { usePlayerMovement } from "./usePlayerMovement";
import { clamp } from "./utils/clamp";
import { useEffect, useState } from "react";
import { SOLIDS } from "./data/solids";
import { DEBUG_COLLISION } from "./utils/debug";
import { TreesLayer } from "./TreeLayers";


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
      {/* Tree */}
        
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
          {/* TREES */}
          <TreesLayer />

        {
          DEBUG_COLLISION &&
           SOLIDS.map((s,i)=>(
            <div
              key={i}
              style={{
                position: "absolute",
                left: s.x,
                top: s.y,
                width: s.width,
                height: s.height,
                background: "#ff000078",
                outline: "2px solid white",
                pointerEvents: "none"
              }}
            />
           ))
        }
        
           {/* <div
      className="Tree"
          style={{
            position: "absolute",
            inset: 15,
            backgroundImage: `url(${Tree1})`,
            top: 194,
            left: 1368,
            height: 457,
            width: 339,
            scale: 0.6
          }}
        />
        <div
      className="Tree"
          style={{
            position: "absolute",
            inset: 15,
            backgroundImage: `url(${Tree2})`,
            top: 480,
            left: 1368,
            height: 457,
            width: 385,
            scale: 0.6
          }}
        /> */}
        {/* PLAYER */}
        <Player x={position.x} y={position.y} />
        
      </div>
     
    </div>
  );
}