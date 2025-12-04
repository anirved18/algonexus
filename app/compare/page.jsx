"use client";

import Navbar from "@/components/Navbar";
import CompareVisualizer from "@/components/visualizers/compare";

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100 page-enter">
      <Navbar />
      <CompareVisualizer />
    </main>
  );
}
