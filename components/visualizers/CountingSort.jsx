"use client";

import { useState } from "react";

// Generate small values for counting sort
function generateArray(n) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * 50) + 1 // 1–50
  );
}

export default function CountingSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState(() => generateArray(20));
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeIndices, setActiveIndices] = useState([]); // placing/active
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleNumBarsChange = (e) => {
    if (isSorting) return;

    const value = Number(e.target.value);
    setNumBars(value);
    setArray(generateArray(value));
    setSortedIndices([]);
    setCurrentIndex(null);
    setActiveIndices([]);
  };

  const handleRandomize = () => {
    if (isSorting) return;

    setArray(generateArray(numBars));
    setSortedIndices([]);
    setCurrentIndex(null);
    setActiveIndices([]);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const countingSort = async (arr) => {
    const n = arr.length;
    if (n === 0) return;

    const maxVal = Math.max(...arr);
    const count = Array(maxVal + 1).fill(0);
    const output = Array(n).fill(0);

    // 1) Count occurrences
    for (let i = 0; i < n; i++) {
      setCurrentIndex(i);        // highlight current bar being counted
      setActiveIndices([i]);
      await sleep(210 - speed * 10);
      count[arr[i]]++;
    }

    // 2) Accumulate counts (prefix sums)
    for (let v = 1; v <= maxVal; v++) {
      count[v] += count[v - 1];
      // Optional small delay to see this phase
      await sleep(40);
    }

    // 3) Build output array (stable from right to left)
    for (let i = n - 1; i >= 0; i--) {
      const val = arr[i];
      const pos = count[val] - 1;
      output[pos] = val;
      count[val]--;

      setCurrentIndex(i);      // index in original array
      setActiveIndices([pos]); // index being filled in output / bars
      setArray([...output]);   // show partial result
      await sleep(210 - speed * 10);
    }

    // 4) Mark all as sorted
    setArray(output);
    setSortedIndices([...Array(n).keys()]);
  };

  const handleVisualize = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setSortedIndices([]);
    const arr = [...array];
    await countingSort(arr);
    setIsSorting(false);
    setCurrentIndex(null);
    setActiveIndices([]);
  };

  const maxValue = array.length ? Math.max(...array) : 1;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Counting Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch the sorting process step by step with counts and placements.
      </p>

      {/* Controls */}
      <div className="mb-6 w-full max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex-1 w-full">
            <label className="block text-center font-bold text-white text-lg mb-2">
              Number of Bars: {numBars}
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={numBars}
              onChange={handleNumBarsChange}
              disabled={isSorting}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
                isSorting ? "opacity-50 cursor-not-allowed" : "bg-gray-700"
              }`}
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-center font-bold text-white text-lg mb-2">
              Speed: {speed}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isSorting}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
                isSorting ? "opacity-50 cursor-not-allowed" : "bg-gray-700"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
          <button
            onClick={handleVisualize}
            disabled={isSorting}
            className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSorting ? "Sorting..." : "Visualize"}
          </button>

          <button
            onClick={handleRandomize}
            disabled={isSorting}
            className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Randomize
          </button>
        </div>
      </div>

      {/* Bars – same dimensions as Bubble Sort */}
      <div
        className="flex items-end justify-center gap-1 w-full max-w-5xl border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
        style={{ height: "50vh" }} // responsive height
      >
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg"; // default

          if (sortedIndices.includes(idx)) bgColor = "bg-green-500 shadow-lg";         // sorted
          else if (idx === currentIndex) bgColor = "bg-red-500 shadow-lg";             // currently scanning
          else if (activeIndices.includes(idx)) bgColor = "bg-purple-500 shadow-lg";   // active placement

          return (
            <div
              key={idx}
              className={`${bgColor} rounded-t-lg transition-all transform hover:scale-y-105`}
              style={{
                height: `${(num / maxValue) * 100}%`,   // same % style as Bubble Sort
                width: `${600 / numBars}px`,            // same width logic
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
