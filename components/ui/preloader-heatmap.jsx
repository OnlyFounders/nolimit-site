import React, { useRef, useEffect } from "react";
import { Heatmap } from "@paper-design/shaders-react";

const LOGO_URL = "/Nolimitslogo.png";

/* Target frame when pattern is black (reachable in ~4.5s from -2800 at speed 1.1) */
const TARGET_FRAME = 2100;
const DECEL_START_OFFSET = 2500; /* start slowing this many ms before target */
const FULL_SPEED = 1.1;
const MIN_SPEED = 0.02;

/* Cult UI Hero Heatmap exact palette — deep blue → teal → lime → yellow → orange → magenta */
const CULT_UI_HEATMAP_COLORS = [
  "#112069",
  "#1f3ca3",
  "#367c66",
  "#adfa1e",
  "#ffe77a",
  "#ff9a1f",
  "#ed40b3",
];

export function PreloaderHeatmap() {
  const heatmapRef = useRef(null);

  useEffect(() => {
    let rafId;
    const runDecel = () => {
      const el = heatmapRef.current?.querySelector?.("[data-paper-shader]");
      const mount = el?.paperShaderMount;
      if (!mount) {
        rafId = requestAnimationFrame(runDecel);
        return;
      }
      const decelStartFrame = TARGET_FRAME - DECEL_START_OFFSET;
      const tick = () => {
        const frame = mount.getCurrentFrame();
        if (frame >= TARGET_FRAME) {
          mount.setSpeed(0);
          return;
        }
        if (frame < decelStartFrame) {
          mount.setSpeed(FULL_SPEED);
        } else {
          const decelProgress = (frame - decelStartFrame) / DECEL_START_OFFSET;
          const easeOut = 1 - (1 - Math.min(1, decelProgress)) ** 3;
          const speed = FULL_SPEED * (1 - easeOut) + MIN_SPEED * easeOut;
          mount.setSpeed(speed);
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(runDecel);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="preloader-content">
      <div className="preloader-heatmap-bg" ref={heatmapRef}>
        <Heatmap
          image={LOGO_URL}
          colors={CULT_UI_HEATMAP_COLORS}
          colorBack="#000000"
          contour={0.6}
          angle={0}
          noise={0.05}
          frame={-2800}
          innerGlow={0.55}
          outerGlow={0.30}
          speed={1.1}
          scale={0.38}
          offsetY={-0.02}
          width={1280}
          height={720}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "#000000",
          }}
        />
      </div>
      <div className="preloader-word">
        <span>N</span>
        <span>O</span>
        <span>L</span>
        <span>I</span>
        <span>M</span>
        <span>I</span>
        <span>T</span>
      </div>
    </div>
  );
}
