import { useEffect, useRef, useState } from "react";
import { clamp } from "./utils/clamp";

const MAX_WALK_SPEED = 220;
const ACCELERATION = 1200;
const DECELERATION = 1400;

export function usePlayerMovement(
  worldWidth: number,
  worldHeight: number,
  playerWidth: number,
  playerHeight: number
) {
  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 300, y: 300 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });

  // --- INPUT ---
  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.key] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.key] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // --- GAME LOOP ---
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      let inputX = 0;
      let inputY = 0;

      if (keys.current["ArrowLeft"]) inputX -= 1;
      if (keys.current["ArrowRight"]) inputX += 1;
      if (keys.current["ArrowUp"]) inputY -= 1;
      if (keys.current["ArrowDown"]) inputY += 1;

      if (inputX || inputY) {
        const len = Math.hypot(inputX, inputY);
        inputX /= len;
        inputY /= len;
        setDirection({ x: inputX, y: inputY });
      }

      // --- ACCELERATION ---
      if (inputX || inputY) {
        velocity.current.x += inputX * ACCELERATION * dt;
        velocity.current.y += inputY * ACCELERATION * dt;
      } else {
        // --- DECELERATION ---
        const speed = Math.hypot(velocity.current.x, velocity.current.y);
        if (speed > 0) {
          const drop = DECELERATION * dt;
          const scale = Math.max(speed - drop, 0) / speed;
          velocity.current.x *= scale;
          velocity.current.y *= scale;
        }
      }

      // --- CLAMP SPEED ---
      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      if (speed > MAX_WALK_SPEED) {
        const s = MAX_WALK_SPEED / speed;
        velocity.current.x *= s;
        velocity.current.y *= s;
      }

      // --- APPLY POSITION ---
      setPosition((p) => ({
        x: clamp(p.x + velocity.current.x * dt, 0, worldWidth - playerWidth),
        y: clamp(p.y + velocity.current.y * dt, 0, worldHeight - playerHeight),
      }));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { position, direction };
}
