"use client";

import { useState } from "react";
import { Palette, Sun, Moon, Sparkles } from "lucide-react";

export default function Themes() {
  const [themeColor, setThemeColor] = useState("#6366f1");
  const [blur, setBlur] = useState(20);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`mt-18 min-h-screen px-6 py-14 lg:px-16 transition-all duration-700 bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 flex flex-col items-center p-6 relative overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-gradient-to-br from-white to-gray-200"
      }`}
    >
      {/* PAGE HEADER */}
      <div className="mb-12 fade-in">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight flex items-center gap-3">
          <Palette size={40} /> Themes & Personalization
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
          Shape your workspace ambience — soft hues, glass glow, and serene tones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">

        {/* LEFT SETTINGS PANEL */}
        <div
          className="
            p-8 rounded-3xl glass-card
            backdrop-blur-2xl bg-white/10 dark:bg-white/5
            border border-white/20 shadow-2xl
            animate-[glassGlow_6s_ease-in-out_infinite]
          "
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles size={26} /> Customize
          </h2>

          {/* COLOR PICKER */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium opacity-80">
              Theme Color
            </label>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-20 h-12 rounded-lg cursor-pointer border border-white/30"
            />
          </div>

          {/* BLUR SLIDER */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium opacity-80">
              Glass Blur Strength ({blur}px)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* DARK MODE */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium opacity-80">
              Display Mode
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                px-4 py-2 rounded-xl border border-white/20 
                bg-white/10 backdrop-blur-xl 
                hover:bg-white/20 transition-all duration-300
                flex items-center gap-2
              "
            >
              {darkMode ? (
                <>
                  <Sun size={18} /> Light
                </>
              ) : (
                <>
                  <Moon size={18} /> Dark
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT LIVE PREVIEW */}
        <div
          className="rounded-3xl p-10 flex flex-col justify-center items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.15)]"
          style={{
            backdropFilter: `blur(${blur}px)`,
            background: `${themeColor}20`,
            border: `2px solid ${themeColor}50`,
          }}
        >
          <h2 className="text-3xl font-semibold mb-3">
            Live Preview
          </h2>
          <p className="opacity-80 max-w-sm">
            Watch your theme blend softly into the workspace.  
            A gentle shift, a steady presence — your style, your atmosphere.
          </p>

          <div
            className="w-full h-56 mt-10 rounded-2xl shadow-xl transition-all duration-500"
            style={{
              background: themeColor,
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes glassGlow {
          0% { box-shadow: 0 0 20px rgba(255,255,255,0.15); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.35); }
          100% { box-shadow: 0 0 20px rgba(255,255,255,0.15); }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
