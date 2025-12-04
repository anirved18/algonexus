"use client";

import dynamic from "next/dynamic";

const CountingSort = dynamic(
  () => import("@/components/visualizers/CountingSort"),
  { ssr: false }
);

export default function CountingSortPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <CountingSort />
    </main>
  );
}
