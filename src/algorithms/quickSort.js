import { addAnimationKeyframe } from 'shared/variables';
import colors from 'shared/colors';
import { SWAP_COLORS_DELAY } from './constants';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function partitionSort(data, handlers) {
  const dataClone = [...data];
  const timeouts = [];
  let timeDelay = 0;

  const animateStep = () => {
    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += SWAP_COLORS_DELAY;
  };

  const partition = (first, pivot, last) => {
    // Color the current sub-array in blue
    for (let i = first; i <= last; i += 1) {
      dataClone[i] = {
        ...dataClone[i],
        color: colors.brightBlue,
      };
    }
    animateStep();

    // Color the pivot in black
    dataClone[pivot] = { ...dataClone[pivot], color: colors.brightPink };
    animateStep();

    // Swap the pivot with the last element of the sub-array
    [dataClone[pivot], dataClone[last]] = [dataClone[last], dataClone[pivot]];
    animateStep();

    // Color the first elemnent in gold and the last element in cyan
    let iteratorFromStart = first;
    let iteratorFromEnd = last - 1;
    dataClone[iteratorFromStart] = {
      ...dataClone[iteratorFromStart],
      color: colors.brightGold,
    };
    dataClone[iteratorFromEnd] = {
      ...dataClone[iteratorFromEnd],
      color: colors.brightCyan,
    };
    animateStep();

    // begin at the both ends of the array and iterate through them
    while (iteratorFromStart <= iteratorFromEnd) {
      // find an element greater than the pivot in the left half
      while (dataClone[iteratorFromStart]?.value < dataClone[last]?.value) {
        dataClone[iteratorFromStart] = {
          ...dataClone[iteratorFromStart],
          color: colors.brightBlue,
        };

        dataClone[iteratorFromStart + 1] = {
          ...dataClone[iteratorFromStart + 1],
          color: colors.brightGold,
        };

        iteratorFromStart += 1;
        animateStep();
      }

      // find an element lesser than the pivot in the right half
      while (dataClone[iteratorFromEnd]?.value > dataClone[last]?.value) {
        dataClone[iteratorFromEnd] = {
          ...dataClone[iteratorFromEnd],
          color: colors.brightBlue,
        };

        dataClone[iteratorFromEnd - 1] = {
          ...dataClone[iteratorFromEnd - 1],
          color: colors.brightCyan,
        };

        iteratorFromEnd -= 1;
        animateStep();
      }

      // swap the elements if the indexes have not yet passed each other
      if (iteratorFromStart < iteratorFromEnd) {
        [dataClone[iteratorFromStart], dataClone[iteratorFromEnd]] = [
          dataClone[iteratorFromEnd],
          dataClone[iteratorFromStart],
        ];
        animateStep();

        dataClone[iteratorFromStart] = {
          ...dataClone[iteratorFromStart],
          color: colors.brightGold,
        };
        dataClone[iteratorFromEnd] = {
          ...dataClone[iteratorFromEnd],
          color: colors.brightCyan,
        };
        animateStep();
      }
    }

    // place the pivot in its final position
    [dataClone[last], dataClone[iteratorFromStart]] = [
      dataClone[iteratorFromStart],
      dataClone[last],
    ];
    animateStep();

    // revert bars to their original color
    for (let i = first - 1 || 0; i <= last; i += 1) {
      dataClone[i] = {
        ...dataClone[i],
        color: colors.darkPink,
      };
    }
    animateStep();

    return iteratorFromStart;
  };

  const sort = (firstIndex, lastIndex) => {
    if (firstIndex < lastIndex) {
      const pivot = randomIntFromInterval(firstIndex, lastIndex);
      const pivotFinalPosition = partition(firstIndex, pivot, lastIndex);

      sort(firstIndex, pivotFinalPosition - 1);
      sort(pivotFinalPosition + 1, lastIndex);
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
