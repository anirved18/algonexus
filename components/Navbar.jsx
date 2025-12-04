"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Import Learn & About content
import LearnPage from "@/app/learn/page";
import AboutPage from "@/app/about/page";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "learn", label: "Learn" },
  { id: "algos", label: "Algorithms" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const ALGORITHMS = [
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Quick Sort",
  "Merge Sort",
  "Heap Sort",
  "Counting Sort",
];

// mapping algo name → route
const ALGO_ROUTES = {
  "Bubble Sort": "/algorithms/bubble-sort",
  "Insertion Sort": "/algorithms/insertion-sort",
  "Selection Sort": "/algorithms/selection-sort",
  "Quick Sort": "/algorithms/quick-sort",
  "Merge Sort": "/algorithms/merge-sort",
  "Heap Sort": "/algorithms/heap-sort",
  "Counting Sort": "/algorithms/counting-sort",
};

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [sheetType, setSheetType] = useState(null); // null | "learn" | "algos" | "about"
  const router = useRouter();

  const handleNavClick = (id) => {
    setActive(id);

    if (id === "home") return router.push("/");
    if (id === "learn") return setSheetType("learn");
    if (id === "algos") return setSheetType("algos");
    if (id === "about") return setSheetType("about");

    setSheetType(null);
  };

  const closeSheet = () => setSheetType(null);
  const isSheetOpen = sheetType !== null;

  return (
    <>
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050816]/80 backdrop-blur-xl border-b border-slate-800/70 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center font-bold text-xs shadow-lg shadow-sky-500/40">
              AN
            </div>
            <div>
              <p className="font-semibold text-lg text-white">AlgoNexus</p>
              <p className="text-xs text-slate-400">Algorithm Visualizer</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center">
            <div className="flex gap-2 bg-slate-900/60 border border-slate-700/70 rounded-full px-4 py-1.5 shadow-inner">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                    active === item.id
                      ? "bg-gradient-to-r from-sky-400 to-indigo-400 text-black shadow"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20 md:h-24" />

      {/* MOBILE NAVBAR */}
      <nav className="fixed bottom-3 left-0 right-0 z-50 px-4 md:hidden">
        <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-lg border border-slate-700/60 rounded-3xl px-3 py-2 flex justify-between shadow-xl">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex-1 flex flex-col items-center text-[11px] py-1 rounded-xl ${
                active === item.id
                  ? "bg-sky-500/90 text-black"
                  : "text-slate-300 hover:bg-slate-800/70"
              }`}
            >
              <span className="text-lg">
                {item.id === "home" && "🏠"}
                {item.id === "learn" && "📘"}
                {item.id === "algos" && "⚙️"}
                {item.id === "about" && "ℹ️"}
                {item.id === "contact" && "✉️"}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition duration-300 ${
          isSheetOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSheet}
      />

      {/* BOTTOM SHEET */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-slate-950 border-t border-slate-800 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto px-5 pt-4 pb-6 transition-transform duration-300 ${
          isSheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white capitalize">
            {sheetType}
          </h2>

          <button
            onClick={closeSheet}
            className="h-8 w-8 rounded-full bg-slate-900 border border-slate-700 text-slate-300"
          >
            ✕
          </button>
        </div>

        {/* SHEET CONTENT */}
        <div className="pb-6">
          {/* Learn sheet (imported page) */}
          {sheetType === "learn" && (
            <div className="px-1 mt-2">
              <LearnPage />
            </div>
          )}

          {/* About sheet (imported page) */}
          {sheetType === "about" && (
            <div className="px-1 mt-2">
              <AboutPage />
            </div>
          )}

          {/* Algorithms sheet */}
          {sheetType === "algos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {ALGORITHMS.map((algo) => (
                <button
                  key={algo}
                  onClick={() => {
                    const path = ALGO_ROUTES[algo];
                    if (path) {
                      router.push(path);
                      setSheetType(null); // close sheet after navigation
                    }
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-200 hover:border-sky-500/70 hover:bg-slate-800 transition"
                >
                  {algo}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
