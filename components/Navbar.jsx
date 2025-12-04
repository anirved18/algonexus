"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LearnPage from "@/app/learn/page";
import AboutPage from "@/app/about/page";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "learn", label: "Learn" },
  { id: "algos", label: "Algorithms" },
  { id: "about", label: "About" },
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
  const [sheetType, setSheetType] = useState(null);
  const router = useRouter();

  const handleNavClick = (id) => {
    setActive(id);

    if (id === "home") return router.push("/");
    if (id === "learn") return setSheetType("learn");
    if (id === "algos") return setSheetType("algos");
    if (id === "about") return setSheetType("about");
  };

  const closeSheet = () => setSheetType(null);
  const isSheetOpen = sheetType !== null;

  return (
    <>
      {/* TOP NAVBAR - CENTERED - UNDERLINE REMOVED */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050816]/80 backdrop-blur-xl shadow-lg">
        <div className="w-full flex justify-center px-6 py-5">
          <nav className="hidden md:flex items-center">
            <div className="flex gap-3 bg-slate-900/70 border border-slate-700/70 rounded-full px-8 py-2 shadow-inner">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-1.5 rounded-full text-sm transition-all ${
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

      {/* ⭐ REDUCED SPACER (removed huge top gap) */}
      <div className="h-8 md:h-16" />

      {/* MOBILE NAVBAR */}
      <nav
        className={`fixed bottom-3 left-0 right-0 z-50 px-4 md:hidden transition-opacity duration-300 ${
          isSheetOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
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
        className={`fixed inset-x-0 bottom-0 z-50 bg-slate-950 border-t border-slate-800 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto px-5 pt-4 pb-16 transition-transform duration-300 ${
          isSheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white capitalize">{sheetType}</h2>
          <button
            onClick={closeSheet}
            className="h-8 w-8 rounded-full bg-slate-900 border border-slate-700 text-slate-300"
          >
            ✕
          </button>
        </div>

        {/* SHEET CONTENT */}
        <div className="pb-4">
          {sheetType === "learn" && (
            <div className="px-1 mt-2">
              <LearnPage />
            </div>
          )}

          {sheetType === "about" && (
            <div className="px-1 mt-2">
              <AboutPage />
            </div>
          )}

          {sheetType === "algos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 mb-4">
              {ALGORITHMS.map((algo) => (
                <button
                  key={algo}
                  onClick={() => {
                    const path = ALGO_ROUTES[algo];
                    if (path) {
                      router.push(path);
                      setSheetType(null);
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
