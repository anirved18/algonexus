"use client";

import { useState } from "react";

function generateArray(n) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * 100) + 10
  );
}

export default function InsertionSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState(() => generateArray(20));
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [keyIndex, setKeyIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);

  const handleNumBarsChange = (e) => {
    if (isSorting) return;

    const value = Number(e.target.value);
    setNumBars(value);
    setArray(generateArray(value));
    setSortedIndices([]);
    setCurrentCompare([]);
    setKeyIndex(null);
  };

  const handleRandomize = () => {
    if (isSorting) return;

    setArray(generateArray(numBars));
    setSortedIndices([]);
    setCurrentCompare([]);
    setKeyIndex(null);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      setKeyIndex(i); // highlight the key
      await sleep(210 - speed * 10);

      while (j >= 0 && arr[j] > key) {
        setCurrentCompare([j, j + 1]); // highlight comparison
        arr[j + 1] = arr[j]; // shift element
        setArray([...arr]);
        await sleep(210 - speed * 10);
        j--;
      }

      arr[j + 1] = key; // insert key
      setArray([...arr]);

      // mark from 0..i as sorted-ish (already in correct region)
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));

      setCurrentCompare([]);
      setKeyIndex(null);
      await sleep(210 - speed * 10);
    }

    setSortedIndices([...Array(arr.length).keys()]);
    setIsSorting(false);
  };

  const maxValue = array.length ? Math.max(...array) : 1;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Insertion Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch the Insertion Sort algorithm build a sorted portion step by step.
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

      {/* Bars – same dimensions as Bubble / Counting / Heap */}
      <div
        className="flex items-end justify-center gap-1 w-full max-w-5xl border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
        style={{ height: "50vh" }} // responsive
      >
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg";

          if (sortedIndices.includes(idx))
            bgColor = "bg-green-500 shadow-lg"; // sorted
          else if (currentCompare.includes(idx))
            bgColor = "bg-red-500 shadow-lg"; // comparing
          else if (idx === keyIndex)
            bgColor = "bg-indigo-500 shadow-lg"; // key element

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
