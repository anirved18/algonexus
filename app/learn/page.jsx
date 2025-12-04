"use client";

import { useState } from "react";

export default function LearnPage() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const algorithms = [
    {
      name: "Bubble Sort",
      desc: "Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large arrays.",
      time: "Best: O(n), Average: O(n²), Worst: O(n²)",
      space: "O(1)",
      code: `
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
`,
    },

    {
      name: "Insertion Sort",
      desc: "Builds the sorted array one element at a time by placing each element into its correct position.",
      time: "Best: O(n), Average: O(n²), Worst: O(n²)",
      space: "O(1)",
      code: `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
`,
    },

    {
      name: "Selection Sort",
      desc: "Repeatedly selects the smallest element from the unsorted part and swaps it with the first unsorted element.",
      time: "Best: O(n²), Average: O(n²), Worst: O(n²)",
      space: "O(1)",
      code: `
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
`,
    },

    {
      name: "Quick Sort",
      desc: "Uses divide-and-conquer with a pivot to recursively sort smaller subarrays.",
      time: "Best: O(n log n), Average: O(n log n), Worst: O(n²)",
      space: "O(log n)",
      code: `
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
`,
    },

    {
      name: "Merge Sort",
      desc: "Splits the array, sorts the halves, and merges them back together using divide-and-conquer.",
      time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
      space: "O(n)",
      code: `
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
`,
    },

    {
      name: "Heap Sort",
      desc: "Builds a max heap and repeatedly extracts the maximum element to sort the array.",
      time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
      space: "O(1)",
      code: `
function heapSort(arr) {
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }

  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
`,
    },

    {
      name: "Counting Sort",
      desc: "Counts occurrences of each value and places them in sorted order. Works best with small integer ranges.",
      time: "Best: O(n + k), Average: O(n + k), Worst: O(n + k)",
      space: "O(n + k)",
      code: `
function countingSort(arr) {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);

  for (const num of arr) count[num]++;

  const sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i]-- > 0) sorted.push(i);
  }
  return sorted;
}
`,
    },
  ];

  const copyCode = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  return (
    <div className="pb-10 mt-6"> {/* ⭐ Added mt-6 for top spacing */}

      {/* HEADING */}
      <h1 className="text-3xl font-extrabold text-white text-center mb-6 tracking-tight">
        Master{" "}
        <span className="bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
          Sorting Algorithms
        </span>
      </h1>

      {/* CONTENT */}
      <div className="flex flex-col gap-6">
        {algorithms.map((algo, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-white">{algo.name}</h2>

              {/* Copy Button */}
              <button
                onClick={() => copyCode(algo.code, idx)}
                className="px-3 py-1 text-[12px] rounded-md bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300 transition"
              >
                {copiedIndex === idx ? "Copied!" : "Copy"}
              </button>
            </div>

            <p className="text-slate-400 mt-1">{algo.desc}</p>

            <p className="text-[13px] text-sky-400 mt-2">
              <b>Time:</b> {algo.time}
            </p>
            <p className="text-[13px] text-sky-400 mb-2">
              <b>Space:</b> {algo.space}
            </p>

            {/* Code Block */}
            <pre className="mt-3 p-3 rounded-xl bg-slate-800 border border-slate-700 text-[12px] whitespace-pre overflow-x-auto">
{algo.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
