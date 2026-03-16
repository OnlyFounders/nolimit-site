import "./js/main.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { LiquidMetalButton } from "./components/ui/liquid-metal-button.jsx";
import { PreloaderHeatmap } from "./components/ui/preloader-heatmap.jsx";

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

function mount() {
  const preloaderEl = document.getElementById("preloader-root");
  if (preloaderEl) {
    preloaderEl.innerHTML = "";
    createRoot(preloaderEl).render(<PreloaderHeatmap />);
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
