import React from "react";
import { Heatmap } from "@paper-design/shaders-react";

const LOGO_URL = "/Nolimitslogo.png";

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
  return (
    <div className="preloader-content">
      <div className="preloader-heatmap-wrap">
        <Heatmap
          image={LOGO_URL}
          colors={CULT_UI_HEATMAP_COLORS}
          colorBack="#000000"
          contour={0.5}
          angle={0}
          noise={0}
          innerGlow={0.6}
          outerGlow={0}
          speed={1}
          scale={0.85}
          offsetY={-0.05}
          width={512}
          height={512}
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
