"use client";

import dynamic from "next/dynamic";

const QuickSort = dynamic(
  () => import("@/components/visualizers/QuickSort"),
  { ssr: false }
);

export default function QuickSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <QuickSort />
    </main>
  );
}
