"use client";

import { useRouter } from "next/navigation";
import Equalizer from "@/components/Equalizer";
import AlgorithmChips from "@/components/AlgorithmChips";

export default function HeroSection() {
  const router = useRouter();

  const handleCompareClick = () => {
    // later you can change this to /compare or another page
    console.log("Compare Visualizer clicked");
  };

  const handleLearnMoreClick = () => {
    router.push("/learn"); // ✅ goes to your Learn page
  };

  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 pb-16 text-center">
      {/* Title */}
      <h1 className="hero-title">
        Algorithm
        <br />
        <span className="hero-title-highlight">Visualizer</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Master algorithms effortlessly with interactive visualizations, turning
        complex concepts into engaging learning experiences.
      </p>

      {/* Equalizer animation */}
      <Equalizer />

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 hero-buttons">
        <button
          onClick={handleCompareClick}
          className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-900 text-sm font-semibold hover:bg-white transition shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0 transform-gpu"
        >
          Compare Visualizer
        </button>

        <button
          onClick={handleLearnMoreClick}
          className="px-6 py-3 rounded-2xl border border-slate-500 text-sm font-semibold hover:border-slate-300 hover:bg-slate-900 transition hover:-translate-y-0.5 active:translate-y-0 transform-gpu"
        >
          Learn More
        </button>
      </div>

      {/* Algorithm chips */}
      <AlgorithmChips />
    </section>
  );
}
