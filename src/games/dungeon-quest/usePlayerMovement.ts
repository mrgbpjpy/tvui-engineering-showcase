import { useEffect, useRef, useState } from "react";
import { clamp } from "./utils/clamp";
import { SOLIDS } from "./data/solids";
import { intersects } from "./collision/aabb";
import type { AABB } from "./collision/types";
import { TREES } from "./data/trees";

const MAX_WALK_SPEED = 220;
const ACCELERATION = 1200;
const DECELERATION = 1400;
const COLLIDERS = [...SOLIDS,...TREES]

export function usePlayerMovement(
  worldWidth: number,
  worldHeight: number,
  playerWidth: number,
  playerHeight: number
) {
  /* ---------------- STATE ---------------- */

  const [position, setPosition] = useState({ x: 13, y: 250 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });

  const velocity = useRef({ x: 0, y: 0 });

  /* ---------------- INPUT ---------------- */

  const keys = useRef<Record<string, boolean>>({});
  const pointerActive = useRef(false);
  const pointerDir = useRef({ x: 0, y: 0 });

  /* ---------- KEYBOARD ---------- */
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

  /* ---------- POINTER (MOUSE + TOUCH) ---------- */
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

    const down = (e: PointerEvent) => {
      pointerActive.current = true;
      updatePointerDir(e.clientX, e.clientY);
    };

    const move = (e: PointerEvent) => {
      if (pointerActive.current) {
        updatePointerDir(e.clientX, e.clientY);
      }
    };

    const up = () => {
      pointerActive.current = false;
      pointerDir.current.x = 0;
      pointerDir.current.y = 0;
    };

    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  /* ---------------- GAME LOOP ---------------- */

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      /* -------- INPUT VECTOR -------- */
      let ix = pointerActive.current ? pointerDir.current.x : 0;
      let iy = pointerActive.current ? pointerDir.current.y : 0;

      if (keys.current["ArrowLeft"] || keys.current["a"]) ix -= 1;
      if (keys.current["ArrowRight"] || keys.current["d"]) ix += 1;
      if (keys.current["ArrowUp"] || keys.current["w"]) iy -= 1;
      if (keys.current["ArrowDown"] || keys.current["s"]) iy += 1;

      if (ix || iy) {
        const len = Math.hypot(ix, iy);
        ix /= len;
        iy /= len;
        setDirection({ x: ix, y: iy });
      }

      /* -------- ACCELERATION -------- */
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

      /* -------- CLAMP MAX SPEED -------- */
      const speed = Math.hypot(
        velocity.current.x,
        velocity.current.y
      );
      if (speed > MAX_WALK_SPEED) {
        const s = MAX_WALK_SPEED / speed;
        velocity.current.x *= s;
        velocity.current.y *= s;
      }

      /* -------- MOVE + COLLISION -------- */
      setPosition((p) => {
        let nextX = p.x + velocity.current.x * dt;
        let nextY = p.y;

        const boxX: AABB = {
          x: nextX,
          y: p.y,
          width: playerWidth,
          height: playerHeight,
        };

        for (const solid of COLLIDERS) {
          if (intersects(boxX, solid)) {
            velocity.current.x = 0;
            nextX = p.x;
            break;
          }
        }

        nextY = p.y + velocity.current.y * dt;

        const boxY: AABB = {
          x: nextX,
          y: nextY,
          width: playerWidth,
          height: playerHeight,
        };

        for (const solid of COLLIDERS) {
          if (intersects(boxY, solid)) {
            velocity.current.y = 0;
            nextY = p.y;
            break;
          }
        }

        return {
          x: clamp(nextX, 0, worldWidth - playerWidth),
          y: clamp(nextY, 0, worldHeight - playerHeight),
        };
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [worldWidth, worldHeight, playerWidth, playerHeight]);

  return { position, direction };
}
