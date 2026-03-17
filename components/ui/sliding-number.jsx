"use client";

import { useEffect, useId } from "react";
import {
  motion,
  useSpring,
  useTransform,
  motionValue,
} from "framer-motion";
import useMeasure from "react-use-measure";

const TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.2,
};

function Digit({ value, place }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "1ch",
        overflowX: "visible",
        overflowY: "clip",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <div style={{ visibility: "hidden" }}>0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <SingleNumber key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function SingleNumber({ mv, number }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;
    if (offset > 5) {
      memo -= 10 * bounds.height;
    }
    return memo;
  });

  if (!bounds.height) {
    return (
      <span ref={ref} style={{ visibility: "hidden", position: "absolute" }}>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        y,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      layoutId={`${uniqueId}-${number}`}
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

export function SlidingNumber({ value, padStart = false, decimalSeparator = "." }) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split(".");
  const integerValue = parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split("");
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  );

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {value < 0 && "-"}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split("").map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </span>
  );
}
