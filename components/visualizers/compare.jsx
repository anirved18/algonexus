"use client";

import { useState } from "react";

// -------- Sorting algorithms with animation logic --------
const sortingAlgorithms = {
  "Bubble Sort": {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          setComparing([j, j + 1]);
          await new Promise((r) => setTimeout(r, delay));

          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            setArray([...array]);
          }
        }
        setSorted([...Array(i + 1).keys()]);
      }

      setSorted([...Array(n).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },

  "Insertion Sort": {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const sorted = [];

      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
          setComparing([j, j + 1]);
          await new Promise((r) => setTimeout(r, delay));

          array[j + 1] = array[j];
          j--;
          setArray([...array]);
        }

        array[j + 1] = key;
        sorted.push(i);
        setSorted([...sorted]);
      }

      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },

  "Selection Sort": {
    time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const sorted = [];

      for (let i = 0; i < array.length; i++) {
        let minIdx = i;

        for (let j = i + 1; j < array.length; j++) {
          setComparing([minIdx, j]);
          await new Promise((r) => setTimeout(r, delay));

          if (array[j] < array[minIdx]) minIdx = j;
        }

        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        sorted.push(i);
        setSorted([...sorted]);
        setArray([...array]);
      }

      setComparing([]);
      setArray([...array]);
    },
  },

  "Quick Sort": {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    space: "O(log n)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const sorted = [];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const partition = async (low, high) => {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          setComparing([j, high]);
          await sleep(delay);

          if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            setArray([...array]);
            await sleep(delay);
          }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        setArray([...array]);
        return i + 1;
      };

      const quickSort = async (low, high) => {
        if (low < high) {
          const pi = await partition(low, high);
          sorted.push(pi);
          setSorted([...sorted]);
          await quickSort(low, pi - 1);
          await quickSort(pi + 1, high);
        }
      };

      await quickSort(0, array.length - 1);
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },

  "Merge Sort": {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(n)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const merge = async (l, m, r) => {
        const L = array.slice(l, m + 1);
        const R = array.slice(m + 1, r + 1);

        let i = 0,
          j = 0,
          k = l;

        while (i < L.length && j < R.length) {
          setComparing([k]);
          await sleep(delay);

          if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
          } else {
            array[k] = R[j];
            j++;
          }

          setArray([...array]);
          k++;
        }

        while (i < L.length) {
          array[k] = L[i];
          i++;
          k++;
          setArray([...array]);
          await sleep(delay);
        }

        while (j < R.length) {
          array[k] = R[j];
          j++;
          k++;
          setArray([...array]);
          await sleep(delay);
        }
      };

      const mergeSort = async (l, r) => {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          await mergeSort(l, m);
          await mergeSort(m + 1, r);
          await merge(l, m, r);
        }
      };

      await mergeSort(0, array.length - 1);
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },

  "Heap Sort": {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(1)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const heapify = async (n, i) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n && array[l] > array[largest]) largest = l;
        if (r < n && array[r] > array[largest]) largest = r;

        if (largest !== i) {
          setComparing([i, largest]);
          await sleep(delay);

          [array[i], array[largest]] = [array[largest], array[i]];
          setArray([...array]);

          await heapify(n, largest);
        }
      };

      const n = array.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);

      const sorted = [];
      for (let i = n - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        sorted.push(i);
        setSorted([...sorted]);
        setArray([...array]);
        await heapify(i, 0);
      }

      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },

  "Counting Sort": {
    time: { best: "O(n+k)", average: "O(n+k)", worst: "O(n+k)" },
    space: "O(k)",
    sort: async (arr, setArray, delay, setComparing, setSorted) => {
      let array = [...arr];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const max = Math.max(...array);
      const count = Array(max + 1).fill(0);

      for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
        setComparing([i]);
        await sleep(delay);
      }

      const sorted = [];
      let index = 0;

      for (let i = 0; i < count.length; i++) {
        while (count[i]-- > 0) {
          array[index] = i;
          sorted.push(index);
          setSorted([...sorted]);
          setArray([...array]);
          await sleep(delay);
          index++;
        }
      }

      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
};

// -------- Helpers --------
const INITIAL_SIZE = 20;

// deterministic initial array (no Math.random -> safe for SSR)
const generateInitialArray = (n) =>
  Array.from({ length: n }, (_, i) => ((i * 17 + 11) % 100) + 5);

// random array for user actions (client-only)
const generateRandomArray = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 5);

// -------- Compare Page --------
export default function ComparePage() {
  const [algo1, setAlgo1] = useState("Bubble Sort");
  const [algo2, setAlgo2] = useState("Insertion Sort");

  const [numBars, setNumBars] = useState(INITIAL_SIZE);
  const [speed, setSpeed] = useState(10);

  // All arrays in one state, initialized once (no useEffect)
  const [arrays, setArrays] = useState(() => {
    const initial = generateInitialArray(INITIAL_SIZE);
    return {
      base: initial,
      left: initial,
      right: initial,
    };
  });

  const [comparing, setComparing] = useState({
    left: [],
    right: [],
  });

  const [sorted, setSorted] = useState({
    left: [],
    right: [],
  });

  const [isSorting, setIsSorting] = useState(false);

  // Small helper setters to pass into algorithms
  const setArray1 = (newArr) =>
    setArrays((prev) => ({ ...prev, left: newArr }));
  const setArray2 = (newArr) =>
    setArrays((prev) => ({ ...prev, right: newArr }));

  const setComparing1 = (val) =>
    setComparing((prev) => ({ ...prev, left: val }));
  const setComparing2 = (val) =>
    setComparing((prev) => ({ ...prev, right: val }));

  const setSorted1 = (val) => setSorted((prev) => ({ ...prev, left: val }));
  const setSorted2 = (val) => setSorted((prev) => ({ ...prev, right: val }));

  const syncFromBase = (newBase) => {
    setArrays({
      base: newBase,
      left: newBase,
      right: newBase,
    });
    setComparing({ left: [], right: [] });
    setSorted({ left: [], right: [] });
  };

  const handleNumBarsChange = (e) => {
    if (isSorting) return;
    const value = Number(e.target.value);
    setNumBars(value);
    const newArray = generateRandomArray(value);
    syncFromBase(newArray);
  };

  const handleRandomize = () => {
    if (isSorting) return;
    const newArray = generateRandomArray(numBars);
    syncFromBase(newArray);
  };

  const handleStartComparison = async () => {
    if (isSorting) return;

    setIsSorting(true);
    const delay = 210 - speed * 10;

    await Promise.all([
      sortingAlgorithms[algo1].sort(
        [...arrays.left],
        setArray1,
        delay,
        setComparing1,
        setSorted1
      ),
      sortingAlgorithms[algo2].sort(
        [...arrays.right],
        setArray2,
        delay,
        setComparing2,
        setSorted2
      ),
    ]);

    setIsSorting(false);
  };

  const barWidth = `${600 / (numBars || 1)}px`;

  const { left: array1, right: array2 } = arrays;
  const { left: comparing1, right: comparing2 } = comparing;
  const { left: sorted1, right: sorted2 } = sorted;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-16 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Sorting Comparison Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300 text-center max-w-3xl">
        Compare how two sorting algorithms operate on the same array, side by
        side. Adjust the number of bars and speed to explore their behavior.
      </p>

      {/* Controls */}
      <div className="mb-6 w-full max-w-4xl space-y-6">
        {/* Algorithms */}
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex-1 w-full">
            <label className="block mb-2 text-center font-bold text-white text-lg">
              Left Algorithm
            </label>
            <select
              value={algo1}
              onChange={(e) => setAlgo1(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(sortingAlgorithms).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block mb-2 text-center font-bold text-white text-lg">
              Right Algorithm
            </label>
            <select
              value={algo2}
              onChange={(e) => setAlgo2(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(sortingAlgorithms).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders */}
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex-1 w-full">
            <label className="block text-center font-bold text-white text-lg mb-2">
              Number of Bars: {numBars}
            </label>
            <input
              type="range"
              min="10"
              max="60"
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
          <button
            onClick={handleStartComparison}
            disabled={isSorting}
            className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSorting ? "Sorting..." : "Start Comparison"}
          </button>

          <button
            onClick={handleRandomize}
            disabled={isSorting}
            className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Randomize Array
          </button>
        </div>
      </div>

      {/* Two visualizers side by side */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Left */}
        <div className="bg-gray-950/70 border border-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3 text-center">{algo1}</h2>
          <div
            className="flex items-end justify-center gap-1 w-full border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
            style={{ height: "50vh" }}
          >
            {array1.map((value, idx) => {
              const maxVal = array1.length ? Math.max(...array1) : 1;
              const heightPercent = (value / maxVal) * 100;

              return (
                <div
                  key={idx}
                  className={`rounded-t-lg transition-all transform hover:scale-y-105 ${
                    comparing1.includes(idx)
                      ? "bg-red-500 shadow-lg"
                      : sorted1.includes(idx)
                      ? "bg-green-500 shadow-lg"
                      : "bg-gray-500 shadow-lg"
                  }`}
                  style={{
                    height: `${heightPercent}%`,
                    width: barWidth,
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="bg-gray-950/70 border border-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3 text-center">{algo2}</h2>
          <div
            className="flex items-end justify-center gap-1 w-full border rounded-lg bg-gray-800 px-4 pt-4 pb-6"
            style={{ height: "50vh" }}
          >
            {array2.map((value, idx) => {
              const maxVal = array2.length ? Math.max(...array2) : 1;
              const heightPercent = (value / maxVal) * 100;

              return (
                <div
                  key={idx}
                  className={`rounded-t-lg transition-all transform hover:scale-y-105 ${
                    comparing2.includes(idx)
                      ? "bg-red-500 shadow-lg"
                      : sorted2.includes(idx)
                      ? "bg-green-500 shadow-lg"
                      : "bg-gray-500 shadow-lg"
                  }`}
                  style={{
                    height: `${heightPercent}%`,
                    width: barWidth,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complexity info */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-sm text-gray-200">
        {[algo1, algo2].map((name, idx) => (
          <div
            key={idx}
            className="bg-gray-950/70 border border-gray-800 rounded-2xl p-4"
          >
            <h3 className="font-semibold mb-2">{name} Complexity</h3>
            <p>
              <span className="font-semibold">Time:</span> Best{" "}
              {sortingAlgorithms[name].time.best}, Average{" "}
              {sortingAlgorithms[name].time.average}, Worst{" "}
              {sortingAlgorithms[name].time.worst}
            </p>
            <p>
              <span className="font-semibold">Space:</span>{" "}
              {sortingAlgorithms[name].space}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
