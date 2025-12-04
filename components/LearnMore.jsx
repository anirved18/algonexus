"use client";

import { useState } from "react";

export default function LearnMore() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const algorithms = [
    {
      name: "Bubble Sort",
      desc: "Repeatedly compares adjacent elements and swaps if needed. Simple but inefficient for large arrays.",
      time: "Best: O(n), Avg: O(n²), Worst: O(n²)",
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
`
    },
    {
      name: "Insertion Sort",
      desc: "Builds the sorted array one element at a time by inserting each element into its correct position.",
      time: "Best: O(n), Avg: O(n²), Worst: O(n²)",
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
`
    },
    {
      name: "Selection Sort",
      desc: "Selects the smallest element and swaps it with the first unsorted element.",
      time: "Best/Avg/Worst: O(n²)",
      space: "O(1)",
      code: `
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < minIdx) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
`
    },
    {
      name: "Quick Sort",
      desc: "Uses divide-and-conquer with a pivot to partition the array.",
      time: "Best/Avg: O(n log n), Worst: O(n²)",
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
`
    },
    {
      name: "Merge Sort",
      desc: "Recursively splits the array, sorts the halves, and merges them.",
      time: "Always O(n log n)",
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
`
    },
    {
      name: "Heap Sort",
      desc: "Builds a max heap and repeatedly extracts the largest element.",
      time: "Always O(n log n)",
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
`
    },
    {
      name: "Counting Sort",
      desc: "Counts occurrences of each number and reconstructs the sorted array.",
      time: "O(n + k)",
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
`
    }
  ];

  const copyCode = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  return (
    <div className="min-h-screen px-6 py-24 text-slate-100">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Learn Sorting Algorithms
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {algorithms.map((algo, index) => (
          <div
            key={algo.name}
            className="relative p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-1">{algo.name}</h2>
            <p className="text-slate-400 text-sm mb-3">{algo.desc}</p>

            <p className="text-xs text-sky-400 mb-1">
              <b>Time Complexity:</b> {algo.time}
            </p>
            <p className="text-xs text-sky-400 mb-3">
              <b>Space Complexity:</b> {algo.space}
            </p>

            {/* Copy Button */}
            <button
              onClick={() => copyCode(algo.code, index)}
              className="absolute top-4 right-4 px-3 py-1 text-xs rounded-md border border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
            >
              {copiedIndex === index ? "Copied!" : "Copy"}
            </button>

            {/* Code Block */}
            <pre className="p-3 text-xs rounded-md bg-slate-800 border border-slate-700 overflow-auto mt-2 whitespace-pre">
{algo.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
