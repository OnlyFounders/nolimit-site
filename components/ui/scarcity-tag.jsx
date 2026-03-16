"use client"

import { useState } from "react"

const STRIPE_URL = "https://buy.stripe.com/7sY14naEK1B15EG1ltaZi00"

export function ScarcityTag({
  scarcityText = "Only 50 units available.",
  preOrderText = "Pre-Order",
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={STRIPE_URL}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="scarcity-tag-pill"
    >
      {/* Live pulse indicator */}
      <div className="scarcity-tag-pulse">
        <span className="scarcity-tag-pulse-outer" />
        <span className="scarcity-tag-pulse-dot" />
      </div>

      {/* Sliding text */}
      <div className="scarcity-tag-text-wrap">
        <span
          className="scarcity-tag-text scarcity-tag-text-default"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {scarcityText}
        </span>
        <span
          className="scarcity-tag-text scarcity-tag-text-hover"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {preOrderText}
        </span>
      </div>

      {/* Arrow indicator */}
      <svg
        className="scarcity-tag-arrow"
        style={{
          transform: isHovered ? "translateX(2px) rotate(-45deg)" : "translateX(0)",
          opacity: isHovered ? 1 : 0.5,
        }}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </a>
  )
}
