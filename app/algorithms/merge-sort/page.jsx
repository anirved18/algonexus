"use client";

import dynamic from "next/dynamic";

const MergeSort = dynamic(
  () => import("@/components/visualizers/MergeSort"),
  { ssr: false }
);

export default function MergeSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <MergeSort />
    </main>
  );
}
