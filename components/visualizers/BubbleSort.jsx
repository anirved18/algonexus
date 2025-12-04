"use client";

import { useState } from "react";

function generateArray(n) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * 100) + 10
  );
}

export default function BubbleSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState(() => generateArray(20)); // initial array
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null); // current element
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleNumBarsChange = (e) => {
    if (isSorting) return; // don't allow change while sorting

    const value = Number(e.target.value);
    setNumBars(value);
    setArray(generateArray(value)); // new array for new bar count
    setSortedIndices([]);
    setCurrentCompare([]);
    setCurrentIndex(null);
  };

  const handleRandomize = () => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentCompare([]);
      setCurrentIndex(null);
    }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arr = [...array];
    const n = arr.length;
    const sorted = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndex(j); // highlight current element
        setCurrentCompare([j, j + 1]); // highlight comparison
        await sleep(210 - speed * 10);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(210 - speed * 10);
        }
      }
      sorted.push(n - 1 - i);
      setSortedIndices([...sorted]);
    }

    sorted.push(0);
    setSortedIndices([...sorted]);
    setCurrentCompare([]);
    setCurrentIndex(null);
    setIsSorting(false);
  };

  const maxValue = array.length ? Math.max(...array) : 1;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Bubble Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch the sorting process step by step with animated bars.
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

      {/* Bars */}
      <div
        className="flex items-end justify-center gap-1 w-full max-w-5xl border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
        style={{ height: "50vh" }} // responsive height
      >
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg";

          if (sortedIndices.includes(idx)) bgColor = "bg-green-500 shadow-lg";
          else if (currentCompare.includes(idx)) bgColor = "bg-red-500 shadow-lg";
          else if (idx === currentIndex) bgColor = "bg-indigo-500 shadow-lg";

          return (
            <div
              key={idx}
              className={`${bgColor} rounded-t-lg transition-all transform hover:scale-y-105`}
              style={{
                height: `${(num / maxValue) * 100}%`, // fill % of container height
                width: `${600 / numBars}px`, // thinner bars
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
