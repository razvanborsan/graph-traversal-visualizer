/* eslint-disable import/prefer-default-export */
import { nanoid } from 'nanoid';

import { bubbleSort, insertionSort, mergeSort } from 'algorithms';

const SORT_ALGORITHM_KEYS = {
  BUBBLE: nanoid(),
  INSERTION: nanoid(),
  MERGE: nanoid(),
  QUICK: nanoid(),
  HEAP: nanoid(),
  RADIX: nanoid(),
};

export const sortAlgorithms = [
  {
    key: SORT_ALGORITHM_KEYS.BUBBLE,
    name: 'Bubble Sort',
    complexity: 'O(n^2)',
    sort: (data, handlers) => bubbleSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.INSERTION,
    name: 'Insertion Sort',
    complexity: 'O(n^2)',
    sort: (data, handlers) => insertionSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.MERGE,
    name: 'Merge Sort',
    complexity: 'O(n^2)',
    sort: (data, handlers) => mergeSort(data, handlers),
  },
  {
    key: SORT_ALGORITHM_KEYS.QUICK,
    name: 'Quick Sort',
    complexity: 'O(n^2)',
  },
  {
    key: SORT_ALGORITHM_KEYS.HEAP,
    name: 'Heap Sort',
    complexity: 'O(n^2)',
  },
  {
    key: SORT_ALGORITHM_KEYS.RADIX,
    name: 'Radix Sort',
    complexity: 'O(n^2)',
  },
];
