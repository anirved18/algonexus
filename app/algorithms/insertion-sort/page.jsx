"use client";

import dynamic from "next/dynamic";

const InsertionSort = dynamic(
  () => import("@/components/visualizers/InsertionSort"),
  { ssr: false }
);

export default function InsertionSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <InsertionSort />
    </main>
  );
}
