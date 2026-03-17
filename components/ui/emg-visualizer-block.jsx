"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarVisualizer } from "./bar-visualizer.jsx";
import { SlidingNumber } from "./sliding-number.jsx";

const COUNT_DURATION = 1200;

function AnimatedValue({ target, active }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, target]);

  if (!active) return null;

  return (
    <>
      <SlidingNumber value={value} />
      <span>%</span>
    </>
  );
}

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
        <span className={`emg-visualizer-step-label ${!isTransitioning ? "emg-step-shimmer" : ""}`}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={state}
              initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="emg-step-text"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <div className="step-progress">
        {MUSCLE_LABELS.map((muscleLabel, i) => {
          const stepStatus =
            currentStep > i + 1 ? "complete" :
            currentStep === i + 1 ? "in_progress" :
            "pending";
          const isLast = i === MUSCLE_LABELS.length - 1;
          const isFinal = isLast && currentStep >= 5;

          return (
            <div key={muscleLabel} className="step-progress-item">
              {!isLast && (
                <div className={`step-progress-line ${stepStatus === "complete" ? "step-line-done" : ""}`} />
              )}
              <div className="step-circle-wrap">
                {(stepStatus === "in_progress" || stepStatus === "complete") && (
                  <div className={`step-spinner ${stepStatus === "complete" ? "step-spinner-out" : ""}`} />
                )}
                <div className={`step-progress-circle${
                  stepStatus === "complete" ? (isFinal ? " step-completed-final" : " step-completed") : ""
                }`}>
                  {stepStatus === "complete" && (
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15, delay: 0.05, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </div>
              </div>
              <div className="step-progress-content">
                <span className={`step-progress-label${
                  stepStatus === "in_progress" ? " step-label-shimmer" :
                  stepStatus === "complete" ? " step-label-done" : ""
                }`}>
                  {muscleLabel}
                </span>
                <span className={`step-progress-value ${stepStatus === "complete" ? "step-value-active" : ""}`}>
                  <AnimatedValue target={MUSCLE_VALUES[i]} active={stepStatus === "complete"} />
                </span>
              </div>
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
          <AnimatedValue target={61} active={currentStep >= 5} />
        </span>
      </div>
    </div>
  );
}
