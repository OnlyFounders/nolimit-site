import "./js/main.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { LiquidMetalButton } from "./components/ui/liquid-metal-button.jsx";
import { PreloaderHeatmap } from "./components/ui/preloader-heatmap.jsx";
import { TextEffect } from "./components/ui/text-effect.jsx";

const STRIPE_URL = "https://buy.stripe.com/7sY14naEK1B15EG1ltaZi00";

function HeroButtons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
      <LiquidMetalButton label="Pre-Order" href={STRIPE_URL} />
      <LiquidMetalButton label="How It Works" href="#how-it-works" />
    </div>
  );
}

function NavCta() {
  return <LiquidMetalButton label="Pre-Order" size="nav" href={STRIPE_URL} />;
}

function CtaButtons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
      <LiquidMetalButton label="Join the Founders Edition" size="lg" href={STRIPE_URL} />
      <LiquidMetalButton label="Contact Us" href="mailto:contact@nolimit.pro" />
    </div>
  );
}

const PRELOADER_DURATION_MS = 5500;

function HeroHeadline() {
  return (
    <TextEffect
      per="line"
      as="h1"
      delay={PRELOADER_DURATION_MS / 1000 + 0.3}
      className="hero-headline-text"
      segmentWrapperClassName="overflow-hidden block"
      variants={{
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        },
        item: {
          hidden: { opacity: 0, filter: 'blur(12px)', y: 24 },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration: 0.5 },
          },
        },
      }}
    >
      {`Train With
Muscle-Level
Intelligence.`}
    </TextEffect>
  );
}

function HeroBody() {
  return (
    <TextEffect
      per="word"
      as="p"
      preset="blur"
      delay={PRELOADER_DURATION_MS / 1000 + 0.6}
      className="hero-body-text"
    >
      NOLIMIT integrates EMG, motion tracking and AI directly into elite compression wear. Track fatigue. Prevent injury. Unlock performance.
    </TextEffect>
  );
}

function mount() {
  const preloaderEl = document.getElementById("preloader-root");
  if (preloaderEl) {
    preloaderEl.innerHTML = "";
    createRoot(preloaderEl).render(<PreloaderHeatmap />);
  }

  const headlineEl = document.getElementById("hero-headline-root");
  if (headlineEl) {
    headlineEl.innerHTML = "";
    createRoot(headlineEl).render(<HeroHeadline />);
  }

  const bodyEl = document.getElementById("hero-body-root");
  if (bodyEl) {
    bodyEl.innerHTML = "";
    createRoot(bodyEl).render(<HeroBody />);
  }

  const heroEl = document.getElementById("hero-buttons-root");
  if (heroEl) {
    heroEl.innerHTML = "";
    createRoot(heroEl).render(<HeroButtons />);
  }

  const navEl = document.getElementById("nav-cta-root");
  if (navEl) {
    navEl.innerHTML = "";
    createRoot(navEl).render(<NavCta />);
  }

  const ctaEl = document.getElementById("cta-buttons-root");
  if (ctaEl) {
    ctaEl.innerHTML = "";
    createRoot(ctaEl).render(<CtaButtons />);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
