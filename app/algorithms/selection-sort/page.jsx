"use client";

import dynamic from "next/dynamic";

const SelectionSort = dynamic(
  () => import("@/components/visualizers/SelectionSort"),
  { ssr: false }
);

export default function SelectionSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <SelectionSort />
    </main>
  );
}
