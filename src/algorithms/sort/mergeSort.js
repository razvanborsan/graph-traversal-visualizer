import { addAnimationKeyframe } from 'shared/variables';
import colors from 'shared/colors';
import { SWAP_COLORS_DELAY, SWAP_POSITIONS_DELAY } from './constants';

export default function mergeSort(data, handlers) {
  const dataClone = [...data];
  const timeouts = [];
  let timeDelay = 0;

  const merge = (firstIndex, middle, lastIndex) => {
    const leftHalf = [];
    const rightHalf = [];

    const leftHalfLenth = middle - firstIndex + 1;
    const rightHalfLengh = lastIndex - middle;

    // create the left half array and assign it a color
    for (let i = 0; i < leftHalfLenth; i += 1) {
      const leftHalfElement = firstIndex + i;

      dataClone[leftHalfElement] = {
        ...dataClone[leftHalfElement],
        color: colors.brightGold,
      };

      leftHalf[i] = dataClone[leftHalfElement];
    }

    // create the right half array and assign it a different color
    for (let i = 0; i < rightHalfLengh; i += 1) {
      const rightHalfElement = middle + i + 1;

      dataClone[rightHalfElement] = {
        ...dataClone[rightHalfElement],
        color: colors.brightBlue,
      };

      rightHalf[i] = dataClone[rightHalfElement];
    }

    // animate the coloring of each half
    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += SWAP_COLORS_DELAY;

    // merge the two halves in ascending order
    let k = firstIndex;
    let i = 0;
    let j = 0;
    while (i < leftHalfLenth && j < rightHalfLengh) {
      if (leftHalf[i]?.value < rightHalf[j]?.value) {
        dataClone[k] = leftHalf[i];
        i += 1;
      } else {
        dataClone[k] = rightHalf[j];
        j += 1;
      }
      k += 1;
    }

    // if left half still has elements left, copy them over
    if (i < leftHalfLenth) {
      while (i < leftHalfLenth) {
        dataClone[k] = leftHalf[i];
        i += 1;
        k += 1;
      }
    }

    // if right half still has element left, copy them over
    if (j < rightHalfLengh) {
      while (j < rightHalfLengh) {
        dataClone[k] = rightHalf[j];
        j += 1;
        k += 1;
      }
    }

    // animate the merge of the halves
    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += SWAP_POSITIONS_DELAY;

    // revert the bars to their original color
    dataClone.forEach((value, index) => {
      const originalElement = data.find((entry) => entry.id === value.id);
      dataClone[index] = originalElement;
    });

    // animate the new colors
    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });

    timeDelay += SWAP_COLORS_DELAY;
  };

  const sort = (firstIndex, lastIndex) => {
    if (firstIndex < lastIndex) {
      const middle = Math.floor((firstIndex + lastIndex) / 2);
      sort(firstIndex, middle);
      sort(middle + 1, lastIndex);
      merge(firstIndex, middle, lastIndex);
    }
  };

  sort(0, dataClone.length - 1);

  // change the finished status to display the reload icon instead of the pause one
  timeouts.push(
    setTimeout(() => {
      handlers.handleSortFinish(true);
    }, timeDelay),
  );

  handlers.handleSetTimeouts(timeouts);
}
