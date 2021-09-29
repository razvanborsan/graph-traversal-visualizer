import { addAnimationKeyframe } from 'shared/variables';
import colors from 'shared/colors';
import { SWAP_COLORS_DELAY } from './constants';

export default function selectionSort(data, handlers) {
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

  for (let i = 0; i < data.length; i += 1) {
    // set the first element as the current minimum
    let minimum = i;

    // color the current minimum
    dataClone[minimum] = { ...dataClone[minimum], color: colors.brightCyan };
    animateStep();

    // iterate through all the elements to find the minimum of the unsorted array
    for (let j = i + 1; j < data.length; j += 1) {
      // color the current element we're looking at to see if it's the minimum
      dataClone[j] = { ...dataClone[j], color: colors.brightGold };
      animateStep();

      if (dataClone[j].value < dataClone[minimum].value) {
        // if the current element is less than the minimum, save its index and color it accordingly
        dataClone[minimum] = { ...dataClone[minimum], color: colors.darkPink };
        dataClone[j] = { ...dataClone[j], color: colors.brightCyan };
        minimum = j;
        animateStep();
      }

      if (minimum !== j) {
        // if the current element is not the minimum, revert its color
        dataClone[j] = { ...dataClone[j], color: colors.darkPink };
        animateStep();
      }
    }

    // swap the minimum in its final position and give it the sorted array's color
    dataClone[minimum] = { ...dataClone[minimum], color: colors.brightBlue };
    [dataClone[minimum], dataClone[i]] = [dataClone[i], dataClone[minimum]];
    animateStep();
  }

  // after the entire array is sorted, revert its color back to its original one
  for (let i = 0; i < dataClone.length; i += 1) {
    dataClone[i] = { ...dataClone[i], color: colors.darkPink };
  }
  animateStep();

  // change the finished status to display the reload icon instead of the pause one
  timeouts.push(
    setTimeout(() => {
      handlers.handleSortFinish(true);
    }, timeDelay),
  );

  handlers.handleSetTimeouts(timeouts);
}
