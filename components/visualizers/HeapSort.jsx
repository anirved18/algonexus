"use client";

import { useState } from "react";

function generateArray(n) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * 100) + 10
  );
}

export default function HeapSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState(() => generateArray(20));
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleNumBarsChange = (e) => {
    if (isSorting) return;

    const value = Number(e.target.value);
    setNumBars(value);
    setArray(generateArray(value));
    setSortedIndices([]);
    setCurrentCompare([]);
    setActiveIndices([]);
  };

  const handleRandomize = () => {
    if (isSorting) return;

    setArray(generateArray(numBars));
    setSortedIndices([]);
    setCurrentCompare([]);
    setActiveIndices([]);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setCurrentCompare([largest, left]);
      await sleep(210 - speed * 10);
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setCurrentCompare([largest, right]);
      await sleep(210 - speed * 10);
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      setActiveIndices([i, largest]);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep(210 - speed * 10);

      await heapify(arr, n, largest);
    }
  };

  const heapSort = async (arr) => {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i >= 0; i--) {
      setActiveIndices([0, i]);
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await sleep(210 - speed * 10);

      setSortedIndices((prev) => [...prev, i]); // mark as sorted
      await heapify(arr, i, 0);
    }
  };

  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedIndices([]);
    const arr = [...array];
    await heapSort(arr);
    setSortedIndices([...Array(arr.length).keys()]);
    setIsSorting(false);
    setCurrentCompare([]);
    setActiveIndices([]);
  };

  const maxValue = array.length ? Math.max(...array) : 1;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Heap Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch Heap Sort build a max-heap and extract elements step by step.
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

      {/* Bars – same dimensions as Bubble / Counting sort */}
      <div
        className="flex items-end justify-center gap-1 w-full max-w-5xl border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
        style={{ height: "50vh" }} // responsive height
      >
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg"; // default

          if (sortedIndices.includes(idx))
            bgColor = "bg-green-500 shadow-lg"; // finally sorted
          else if (currentCompare.includes(idx))
            bgColor = "bg-red-500 shadow-lg"; // comparing
          else if (activeIndices.includes(idx))
            bgColor = "bg-purple-500 shadow-lg"; // swapping / active

          return (
            <div
              key={idx}
              className={`${bgColor} rounded-t-lg transition-all transform hover:scale-y-105`}
              style={{
                height: `${(num / maxValue) * 100}%`, // % of container
                width: `${600 / numBars}px`, // same width logic
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
