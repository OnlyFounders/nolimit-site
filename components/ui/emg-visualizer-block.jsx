"use client";

import { useEffect, useState } from "react";
import { BarVisualizer, AGENT_STATES } from "./bar-visualizer.jsx";

const LOOP_STATES = ["initializing", "connecting", "listening", "speaking", "thinking"];
const STATE_DURATION_MS = 2500;

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
      <div className="emg-visualizer-buttons">
        {AGENT_STATES.map((s) => (
          <button
            key={s}
            type="button"
            className={`emg-visualizer-btn ${state === s ? "emg-visualizer-btn-active" : ""}`}
            onClick={() => setState(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
