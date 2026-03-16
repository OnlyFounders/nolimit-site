import "./js/main.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { LiquidMetalButton } from "./components/ui/liquid-metal-button.jsx";

const STRIPE_URL = "https://buy.stripe.com/7sY14naEK1B15EG1ltaZi00";

function HeroButtons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
      <a href={STRIPE_URL} style={{ textDecoration: "none" }}>
        <LiquidMetalButton label="Pre-Order" />
      </a>
      <a href="#how-it-works" style={{ textDecoration: "none" }} onClick={(e) => {
        e.preventDefault();
        document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
      }}>
        <LiquidMetalButton label="How It Works" />
      </a>
    </div>
  );
}

function NavCta() {
  return (
    <a href={STRIPE_URL} style={{ textDecoration: "none" }}>
      <LiquidMetalButton label="Pre-Order" size="nav" />
    </a>
  );
}

function mount() {
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
