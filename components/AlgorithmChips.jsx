"use client";

import Link from "next/link";

export default function AlgorithmChips() {
  return (
    <div className="flex flex-col items-center gap-4 mt-6 hero-chips">

      {/* Row 1 */}
      <div className="flex flex-wrap justify-center gap-4 max-w-full">
        <Chip name="Bubble Sort" delay={0} href="/algorithms/bubble-sort" />
        <Chip name="Insertion Sort" delay={0.05} href="/algorithms/insertion-sort" />
        <Chip name="Selection Sort" delay={0.1} href="/algorithms/selection-sort" />
        <Chip name="Quick Sort" delay={0.15} href="/algorithms/quick-sort" />
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap justify-center gap-4 max-w-full">
        <Chip name="Merge Sort" delay={0.2} href="/algorithms/merge-sort" />
        <Chip name="Heap Sort" delay={0.25} href="/algorithms/heap-sort" />
        <Chip name="Counting Sort" delay={0.3} href="/algorithms/counting-sort" />
      </div>
    </div>
  );
}

function Chip({ name, delay, href }) {
  return (
    <Link
      href={href}
      className="
        px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 
        hover:border-sky-500/60 hover:bg-slate-800 transition 
        text-sm font-semibold text-slate-200 chip-pop
      "
      style={{ animationDelay: `${delay}s` }}
    >
      {name}
    </Link>
  );
}
