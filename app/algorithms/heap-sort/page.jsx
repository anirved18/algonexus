"use client";

import dynamic from "next/dynamic";

const HeapSort = dynamic(
  () => import("@/components/visualizers/HeapSort"),
  { ssr: false } // ⬅ important to avoid hydration mismatch
);

export default function HeapSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <HeapSort />
    </main>
  );
}
