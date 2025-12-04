"use client";

import { useState } from "react";

function generateArray(n) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * 100) + 10
  );
}

export default function SelectionSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState(() => generateArray(20));
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [currentMinIndex, setCurrentMinIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleNumBarsChange = (e) => {
    if (isSorting) return;
    const value = Number(e.target.value);
    setNumBars(value);
    setArray(generateArray(value));
    setSortedIndices([]);
    setCurrentCompare([]);
    setCurrentMinIndex(null);
  };

  const handleRandomize = () => {
    if (isSorting) return;
    setArray(generateArray(numBars));
    setSortedIndices([]);
    setCurrentCompare([]);
    setCurrentMinIndex(null);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleVisualize = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setSortedIndices([]);

    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      setCurrentMinIndex(minIdx);

      for (let j = i + 1; j < n; j++) {
        setCurrentCompare([minIdx, j]);
        await sleep(210 - speed * 10);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setCurrentMinIndex(minIdx);
          await sleep(210 - speed * 10);
        }
      }

      // Swap the found min with element at i
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await sleep(210 - speed * 10);

      setSortedIndices((prev) => [...prev, i]);
      setCurrentCompare([]);
      setCurrentMinIndex(null);
    }

    // Last element is sorted
    setSortedIndices([...Array(n).keys()]);
    setIsSorting(false);
  };

  const maxValue = array.length ? Math.max(...array) : 1;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Selection Sort Visualizer
      </h1>

      <p className="mb-8 text-lg text-gray-300">
        Watch Selection Sort find the minimum, swap, and grow the sorted region.
      </p>

      {/* Controls */}
      <div className="mb-6 w-full max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">

          {/* Number of Bars */}
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
              className={`w-full h-3 rounded-lg cursor-pointer accent-indigo-500 ${
                isSorting ? "opacity-50 cursor-not-allowed" : "bg-gray-700"
              }`}
            />
          </div>

          {/* Speed */}
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
              className={`w-full h-3 rounded-lg cursor-pointer accent-indigo-500 ${
                isSorting ? "opacity-50 cursor-not-allowed" : "bg-gray-700"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
          <button
            onClick={handleVisualize}
            disabled={isSorting}
            className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg 
                       transform transition-transform hover:scale-105 hover:shadow-2xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSorting ? "Sorting..." : "Visualize"}
          </button>

          <button
            onClick={handleRandomize}
            disabled={isSorting}
            className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg 
                       transform transition-transform hover:scale-105 hover:shadow-2xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Randomize
          </button>
        </div>
      </div>

      {/* Bars – same dimensions as all others */}
      <div
        className="flex items-end justify-center gap-1 w-full max-w-5xl border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
        style={{ height: "50vh" }}
      >
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg";

          if (sortedIndices.includes(idx))
            bgColor = "bg-green-500 shadow-lg";
          else if (currentCompare.includes(idx))
            bgColor = "bg-red-500 shadow-lg";
          else if (idx === currentMinIndex)
            bgColor = "bg-indigo-500 shadow-lg";

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
