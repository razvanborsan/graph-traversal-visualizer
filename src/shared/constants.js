/* eslint-disable import/prefer-default-export */
import { nanoid } from 'nanoid';

import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
} from 'algorithms';
import colors from './colors';

const SORT_ALGORITHM_KEYS = {
  BUBBLE: nanoid(),
  INSERTION: nanoid(),
  SELECTION: nanoid(),
  MERGE: nanoid(),
  QUICK: nanoid(),
  HEAP: nanoid(),
  RADIX: nanoid(),
};

export const graphVertice = {
  width: 30,
  height: 30,
};

export const sortAlgorithms = [
  {
    key: SORT_ALGORITHM_KEYS.BUBBLE,
    name: 'Bubble Sort',
    legend: [
      {
        color: colors.brightGold,
        message: "Value that's currently being sorted",
      },
    ],
    sort: (data, handlers) => bubbleSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.INSERTION,
    name: 'Insertion Sort',
    legend: [
      {
        color: colors.brightGold,
        message: "Value that's currently being sorted",
      },
      {
        color: colors.brightBlue,
        message: 'Array of sorted elements',
      },
    ],
    sort: (data, handlers) => insertionSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.SELECTION,
    name: 'Selection Sort',
    legend: [
      {
        color: colors.brightGold,
        message: "Value that's currently being checked",
      },
      {
        color: colors.brightCyan,
        message: 'The current minimum',
      },
      {
        color: colors.brightBlue,
        message: 'Array of sorted elements',
      },
    ],
    sort: (data, handlers) => selectionSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.MERGE,
    name: 'Merge Sort',
    legend: [
      {
        color: colors.brightGold,
        message: "Left half that's about to be merged",
      },
      {
        color: colors.brightBlue,
        message: "Right half that's about to be merged",
      },
    ],
    sort: (data, handlers) => mergeSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.QUICK,
    name: 'Quick Sort',
    legend: [
      {
        color: colors.brightBlue,
        message: 'Current active sub-array',
      },
      {
        color: colors.brightPink,
        message: 'Randomly chosen pivot',
      },
      {
        color: colors.brightGold,
        message: 'Traverse from the left of the sub-array',
      },
      {
        color: colors.brightCyan,
        message: 'Traverse from the right of the sub-array',
      },
    ],
    sort: (data, handlers) => quickSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.HEAP,
    name: 'Heap Sort',
    legend: [
      {
        color: colors.brightPink,
        message: 'Current parent element',
      },
      {
        color: colors.brightGold,
        message: 'Left child of the current parent',
      },
      {
        color: colors.brightCyan,
        message: 'Right child of the current parent',
      },
      {
        color: colors.brightBlue,
        message: 'Sorted array',
      },
    ],
    sort: (data, handlers) => heapSort(data, handlers),
  },
];
