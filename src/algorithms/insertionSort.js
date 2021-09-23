import { addAnimationKeyframe } from 'shared/variables';
import colors from 'shared/colors';
import { SWAP_COLORS_DELAY, SWAP_POSITIONS_DELAY } from './constants';

export default function insertionSort(data, handlers) {
  const dataClone = [...data];
  const timeouts = [];
  let timeDelay = 0;

  for (let current = 0; current < data.length; current += 1) {
    // Mark the current element out for sorting
    dataClone[current] = {
      ...dataClone[current],
      color: colors.brightGold,
    };
    const currentElemToSort = dataClone[current];

    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += SWAP_COLORS_DELAY;

    // Place the current element into it's proper position
    let previous = current;
    while (
      previous > 0
      && dataClone[previous - 1].value > currentElemToSort.value
    ) {
      dataClone[previous] = dataClone[previous - 1];
      previous -= 1;
    }
    dataClone[previous] = currentElemToSort;

    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += SWAP_POSITIONS_DELAY;

    // Color the sorted element with the sorted array's color
    dataClone[previous] = {
      ...dataClone[previous],
      color: colors.brightBlue,
    };

    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += SWAP_COLORS_DELAY;
  }

  // Restore the original colors after the sorting process is complete
  addAnimationKeyframe(timeouts, {
    arrayToAnimate: [
      ...dataClone.map((value) => data.find((entry) => entry.id === value.id)),
    ],
    setArrayToAnimate: handlers.handleSetBars,
    timeDelay,
  });

  timeouts.push(
    setTimeout(() => {
      handlers.handleSortFinish(true);
    }, timeDelay),
  );

  handlers.handleSetTimeouts(timeouts);
}
