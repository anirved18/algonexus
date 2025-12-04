"use client";

import dynamic from "next/dynamic";

const BubbleSort = dynamic(
  () => import("@/components/visualizers/BubbleSort"),
  { ssr: false }
);

export default function BubbleSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <BubbleSort />
    </main>
  );
}
