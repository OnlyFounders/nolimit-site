"use client";

import { useEffect, useState } from "react";
import { BarVisualizer } from "./bar-visualizer.jsx";

const LOOP_STATES = ["initializing", "listening", "connecting", "speaking", "thinking"];
const STATE_DURATION_MS = 2500;

const STATE_LABELS = {
  initializing: "Initializing",
  listening: "Quad Vastus Medialis",
  connecting: "Quad, Rectus Femoris",
  speaking: "Hamstring, Biceps Femoris",
  thinking: "Hamstring Semitendinosus",
};

export function EmgVisualizerBlock() {
  const [state, setState] = useState("initializing");

  useEffect(() => {
    let index = 0;
    const tick = () => {
      index = (index + 1) % LOOP_STATES.length;
      setState(LOOP_STATES[index]);
    };
    const id = setInterval(tick, STATE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="emg-visualizer-block">
      <BarVisualizer
        state={state}
        demo={true}
        barCount={20}
        minHeight={15}
        maxHeight={90}
        className="emg-bar-visualizer"
      />
      <div className="emg-visualizer-buttons" data-state={state}>
        <span className="emg-visualizer-step-label">{STATE_LABELS[state]}</span>
      </div>
    </div>
  );
}
