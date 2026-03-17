"use client";

import { useEffect, useRef, useState } from "react";
import { BarVisualizer } from "./bar-visualizer.jsx";
import { BlurredStagger } from "./blurred-stagger-text.jsx";
import { ShiningText } from "./shining-text.jsx";

const LOOP_STATES = ["initializing", "listening", "connecting", "speaking", "thinking", "total"];
const STATE_DURATION_MS = 2500;

const STATE_LABELS = {
  initializing: "Initializing",
  listening: "Quad Vastus Medialis",
  connecting: "Quad, Rectus Femoris",
  speaking: "Hamstring, Biceps Femoris",
  thinking: "Hamstring Semitendinosus",
  total: "Muscle Activation",
};

const MUSCLE_VALUES = [85, 20, 76, 12];
const MUSCLE_LABELS = [
  "Quad Vastus Medialis",
  "Quad, Rectus Femoris",
  "Hamstring, Biceps Femoris",
  "Hamstring Semitendinosus",
];

const STEP_INDEX = { initializing: 0, listening: 1, connecting: 2, speaking: 3, thinking: 4, total: 5 };
const TRANSITION_DURATION_MS = 1000;

export function EmgVisualizerBlock() {
  const [state, setState] = useState("initializing");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const stateRef = useRef(state);

  useEffect(() => {
    let index = 0;
    const tick = () => {
      index = (index + 1) % LOOP_STATES.length;
      setState(LOOP_STATES[index]);
    };
    const id = setInterval(tick, STATE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (state !== stateRef.current) {
      stateRef.current = state;
      setIsTransitioning(true);
    }
    const t = setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION_MS);
    return () => clearTimeout(t);
  }, [state]);

  const currentStep = STEP_INDEX[state];
  const label = STATE_LABELS[state];

  return (
    <div className="emg-visualizer-block">
      <BarVisualizer
        state={state === "total" ? "speaking" : state}
        demo={true}
        barCount={20}
        minHeight={15}
        maxHeight={90}
        className="emg-bar-visualizer"
      />
      <div className="emg-visualizer-buttons" data-state={state}>
        <span className="emg-visualizer-step-label">
          {isTransitioning ? (
            <BlurredStagger text={label} />
          ) : (
            <ShiningText variant={state === "initializing" ? "red" : "green"}>{label}</ShiningText>
          )}
        </span>
      </div>

      <div className="muscle-meter">
        {MUSCLE_LABELS.map((label, i) => {
          const revealed = currentStep >= i + 1;
          const fillPct = revealed ? MUSCLE_VALUES[i] : 0;
          const intensityClass =
            fillPct >= 70
              ? "muscle-intensity-high"
              : fillPct >= 40
                ? "muscle-intensity-mid"
                : fillPct >= 20
                  ? "muscle-intensity-low"
                  : "muscle-intensity-lowest";
          return (
            <div key={label} className="muscle-meter-row">
              <span className="muscle-meter-label">{label}</span>
              <div className="muscle-meter-bar">
                <div
                  className={`muscle-meter-fill ${intensityClass}`}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
              <span className="muscle-meter-val">{revealed ? `${MUSCLE_VALUES[i]}%` : "—"}</span>
            </div>
          );
        })}
      </div>

      <div className="card-stat">
        <span className="card-stat-label">Muscle Activation</span>
        <span
          className="card-stat-value stat-green card-stat-total"
          style={{ opacity: currentStep >= 5 ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          61%
        </span>
      </div>
    </div>
  );
}
