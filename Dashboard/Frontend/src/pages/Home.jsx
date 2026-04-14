import React, { useEffect, useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "Features", link: "#features" },
    { name: "How it works", link: "#HowItWorks" },
  ];

  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      
      {/* 🌊 Background Ripple */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundRippleEffect />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <FloatingNav navItems={navItems} />
      </div>

      {/* 🌗 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl 
        bg-card border border-border shadow-md backdrop-blur
        hover:scale-105 transition-all duration-200"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Sections */}
      <main className="relative z-10">
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="HowItWorks">
          <HowItWorks />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 text-center border-t border-border text-sm text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-foreground">
          Omniproctor
        </span>{" "}
        — All rights reserved
      </footer>
    </div>
  );
}