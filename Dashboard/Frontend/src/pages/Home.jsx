import React, { useEffect, useState } from "react"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"

export default function Home() {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "Features", link: "#features" },
    { name: "How it works", link: "#HowItWorks" },
  ]

  const [dark, setDark] = useState(false)

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !dark
    setDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors">

      {/* 🌊 GLOBAL Ripple Background */}
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
        <BackgroundRippleEffect />
      </div>

      {/* Floating Navbar */}
      <FloatingNav navItems={navItems} />

      {/* 🌗 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-800 shadow-lg"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <Hero/>
      <Features/>
      <div id="HowItWorks"><HowItWorks/></div>
      
      <footer
        className="p-20 text-center text-gray-500 dark:text-gray-400"
      >
        © {new Date().getFullYear()} Omniproctor — All rights reserved
      </footer>

    </div>
  )
}
