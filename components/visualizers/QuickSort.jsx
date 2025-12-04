"use client";

import { useState } from "react";

function generateArray(n) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * 100) + 10
  );
}

export default function QuickSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState(() => generateArray(20));
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleNumBarsChange = (e) => {
    if (isSorting) return;

    const value = Number(e.target.value);
    setNumBars(value);
    setArray(generateArray(value));
    setSortedIndices([]);
    setCurrentCompare([]);
    setPivotIndex(null);
  };

  const handleRandomize = () => {
    if (isSorting) return;

    setArray(generateArray(numBars));
    setSortedIndices([]);
    setCurrentCompare([]);
    setPivotIndex(null);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    } else if (low === high) {
      // single element segment is sorted
      setSortedIndices((prev) =>
        prev.includes(low) ? prev : [...prev, low]
      );
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    setPivotIndex(high);

    let i = low - 1;
    for (let j = low; j < high; j++) {
      setCurrentCompare([j, high]); // compare with pivot
      await sleep(210 - speed * 10);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(210 - speed * 10);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(210 - speed * 10);

    setPivotIndex(null);
    setCurrentCompare([]);
    setSortedIndices((prev) =>
      prev.includes(i + 1) ? prev : [...prev, i + 1]
    );

    return i + 1;
  };

  const handleVisualize = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setSortedIndices([]);
    const arr = [...array];
    if (arr.length > 0) {
      await quickSort(arr, 0, arr.length - 1);
      // ensure all indices are marked sorted at the end
      setSortedIndices([...Array(arr.length).keys()]);
    }
    setIsSorting(false);
    setPivotIndex(null);
    setCurrentCompare([]);
  };

  const maxValue = array.length ? Math.max(...array) : 1;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Quick Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch Quick Sort partition around a pivot and sort the array step by step.
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
              max="100"
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

      {/* Bars – same dimensions as others */}
      <div
        className="flex items-end justify-center gap-1 w-full max-w-5xl border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
        style={{ height: "50vh" }} // responsive height
      >
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg"; // default

          if (sortedIndices.includes(idx))
            bgColor = "bg-green-500 shadow-lg"; // sorted
          else if (currentCompare.includes(idx))
            bgColor = "bg-red-500 shadow-lg"; // currently compared with pivot
          else if (idx === pivotIndex)
            bgColor = "bg-indigo-500 shadow-lg"; // pivot

          return (
            <div
              key={idx}
              className={`${bgColor} rounded-t-lg transition-all transform hover:scale-y-105`}
              style={{
                height: `${(num / maxValue) * 100}%`,
                width: `${600 / numBars}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
