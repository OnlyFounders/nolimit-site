import React from "react";
import { Heatmap } from "@paper-design/shaders-react";

const LOGO_URL = "/Nolimitslogo.png";

const HEATMAP_COLORS = [
  "#0f172a",
  "#1e3a5f",
  "#166534",
  "#4ade80",
  "#86efac",
  "#bbf7d0",
];

export function PreloaderHeatmap() {
  return (
    <div className="preloader-content">
      <div className="preloader-heatmap-wrap">
        <Heatmap
          image={LOGO_URL}
          colors={HEATMAP_COLORS}
          colorBack="#0a0a0a"
          contour={0.5}
          angle={0}
          noise={0}
          innerGlow={0.6}
          outerGlow={0.5}
          speed={1}
          scale={0.8}
          width={400}
          height={400}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
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
