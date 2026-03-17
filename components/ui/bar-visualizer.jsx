"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export const useBarAnimator = (state, columns, interval) => {
  const indexRef = useRef(0);
  const [currentFrame, setCurrentFrame] = useState([]);
  const animationFrameId = useRef(null);

  const sequence = useMemo(() => {
    if (state === "thinking" || state === "listening") {
      const center = Math.floor(columns / 2);
      return [[center], [-1]];
    }
    if (state === "connecting" || state === "initializing") {
      const seq = [];
      for (let x = 0; x < columns; x++) {
        seq.push([x, columns - 1 - x]);
      }
      return seq;
    }
    if (state === undefined || state === "speaking") {
      return [Array.from({ length: columns }, (_, i) => i)];
    }
    return [[]];
  }, [state, columns]);

  useEffect(() => {
    indexRef.current = 0;
    setCurrentFrame(sequence[0] || []);
  }, [sequence]);

  useEffect(() => {
    let startTime = performance.now();

    const animate = (time) => {
      const timeElapsed = time - startTime;
      if (timeElapsed >= interval) {
        indexRef.current = (indexRef.current + 1) % sequence.length;
        setCurrentFrame(sequence[indexRef.current] || []);
        startTime = time;
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [interval, sequence]);

  return currentFrame;
};

export const AGENT_STATES = ["connecting", "initializing", "listening", "speaking", "thinking"];

export function BarVisualizer({
  state = "listening",
  barCount = 20,
  mediaStream,
  minHeight = 15,
  maxHeight = 90,
  demo = true,
  centerAlign = false,
  className = "",
  style = {},
  ...props
}) {
  const fakeVolumeBandsRef = useRef(new Array(barCount).fill(0.2));
  const [fakeVolumeBands, setFakeVolumeBands] = useState(() =>
    new Array(barCount).fill(0.2)
  );
  const fakeAnimationRef = useRef(undefined);

  useEffect(() => {
    if (!demo) return;

    if (state !== "speaking" && state !== "listening") {
      const bands = new Array(barCount).fill(0.2);
      fakeVolumeBandsRef.current = bands;
      setFakeVolumeBands(bands);
      return;
    }

    let lastUpdate = 0;
    const updateInterval = 50;
    const startTime = Date.now() / 1000;

    const updateFakeVolume = (timestamp) => {
      if (timestamp - lastUpdate >= updateInterval) {
        const time = Date.now() / 1000 - startTime;
        const newBands = new Array(barCount);

        for (let i = 0; i < barCount; i++) {
          const waveOffset = i * 0.5;
          const baseVolume = Math.sin(time * 2 + waveOffset) * 0.3 + 0.5;
          const randomNoise = Math.random() * 0.2;
          newBands[i] = Math.max(0.1, Math.min(1, baseVolume + randomNoise));
        }

        let hasChanged = false;
        for (let i = 0; i < barCount; i++) {
          if (Math.abs(newBands[i] - fakeVolumeBandsRef.current[i]) > 0.05) {
            hasChanged = true;
            break;
          }
        }

        if (hasChanged) {
          fakeVolumeBandsRef.current = newBands;
          setFakeVolumeBands(newBands);
        }
        lastUpdate = timestamp;
      }
      fakeAnimationRef.current = requestAnimationFrame(updateFakeVolume);
    };

    fakeAnimationRef.current = requestAnimationFrame(updateFakeVolume);

    return () => {
      if (fakeAnimationRef.current) {
        cancelAnimationFrame(fakeAnimationRef.current);
      }
    };
  }, [demo, state, barCount]);

  const volumeBands = demo ? fakeVolumeBands : new Array(barCount).fill(0.2);

  const highlightedIndices = useBarAnimator(
    state,
    barCount,
    state === "connecting"
      ? 2000 / barCount
      : state === "thinking"
        ? 150
        : state === "listening"
          ? 500
          : 1000
  );

  return (
    <div
      data-state={state}
      className={`bar-visualizer ${centerAlign ? "bar-visualizer-center" : ""} ${className}`}
      style={style}
      {...props}
    >
      {volumeBands.map((volume, index) => {
        const heightPct = Math.min(
          maxHeight,
          Math.max(minHeight, volume * 100 + 5)
        );
        const isHighlighted = highlightedIndices?.includes(index) ?? false;
        const barHeightPx = (heightPct / 100) * 72;

        return (
          <div
            key={index}
            data-highlighted={isHighlighted}
            data-state={state}
            className="bar-visualizer-bar"
            style={{ height: `${barHeightPx}px` }}
          />
        );
      })}
    </div>
  );
}
