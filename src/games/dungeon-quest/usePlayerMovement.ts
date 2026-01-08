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

  const pointerActive = useRef(false);
  const pointerDir = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 600, y: 600 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });

  /* ---------------- INPUT ---------------- */

  // Keyboard
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

  // Pointer (mouse + touch)
  useEffect(() => {
    const updatePointerDir = (x: number, y: number) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const dx = x - cx;
      const dy = y - cy;

      const len = Math.hypot(dx, dy);
      if (len > 0) {
        pointerDir.current.x = dx / len;
        pointerDir.current.y = dy / len;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerActive.current = true;
      updatePointerDir(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerActive.current) return;
      updatePointerDir(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      pointerActive.current = false;
      pointerDir.current.x = 0;
      pointerDir.current.y = 0;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  /* ---------------- GAME LOOP ---------------- */

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      // Base input (pointer has priority)
      let ix = pointerActive.current ? pointerDir.current.x : 0;
      let iy = pointerActive.current ? pointerDir.current.y : 0;

      // Keyboard adds to it
      if (keys.current["ArrowLeft"] || keys.current["a"]) ix -= 1;
      if (keys.current["ArrowRight"] || keys.current["d"]) ix += 1;
      if (keys.current["ArrowUp"] || keys.current["w"]) iy -= 1;
      if (keys.current["ArrowDown"] || keys.current["s"]) iy += 1;

      // Normalize direction
      if (ix || iy) {
        const len = Math.hypot(ix, iy);
        ix /= len;
        iy /= len;
        setDirection({ x: ix, y: iy });
      }

      // Acceleration / deceleration
      if (ix || iy) {
        velocity.current.x += ix * ACCELERATION * dt;
        velocity.current.y += iy * ACCELERATION * dt;
      } else {
        const speed = Math.hypot(
          velocity.current.x,
          velocity.current.y
        );
        if (speed > 0) {
          const drop = DECELERATION * dt;
          const scale = Math.max(speed - drop, 0) / speed;
          velocity.current.x *= scale;
          velocity.current.y *= scale;
        }
      }

      // Clamp max speed
      const speed = Math.hypot(
        velocity.current.x,
        velocity.current.y
      );
      if (speed > MAX_WALK_SPEED) {
        const s = MAX_WALK_SPEED / speed;
        velocity.current.x *= s;
        velocity.current.y *= s;
      }

      // Apply movement
      setPosition((p) => ({
        x: clamp(
          p.x + velocity.current.x * dt,
          0,
          worldWidth - playerWidth
        ),
        y: clamp(
          p.y + velocity.current.y * dt,
          0,
          worldHeight - playerHeight
        ),
      }));

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { position, direction };
}
