import { addAnimationKeyframe } from 'shared/variables';
import colors from 'shared/colors';
import { SWAP_COLORS_DELAY, SWAP_POSITIONS_DELAY } from './constants';

export default function bubbleSort(data, handlers) {
  const dataClone = [...data];
  const timeouts = [];
  let timeDelay = 0;
  let isDataSorted = false;
  const lastIndex = dataClone.length - 1;

  while (!isDataSorted) {
    isDataSorted = true;

    for (let current = 0; current < lastIndex; current += 1) {
      const next = current + 1;

      // Always change the first bar's color to gold
      if (current === 0) {
        dataClone[current] = {
          ...dataClone[current],
          color: colors.brightGold,
        };
        dataClone[lastIndex] = data.find(
          (entry) => entry.id === dataClone[lastIndex].id,
        );

        addAnimationKeyframe(timeouts, {
          arrayToAnimate: [...dataClone],
          setArrayToAnimate: handlers.handleSetBars,
          timeDelay,
        });
        timeDelay += SWAP_COLORS_DELAY;
      }

      // Check & animate either a positional swap or a color swap
      if (dataClone[current].value > dataClone[next]?.value) {
        isDataSorted = false;
        [dataClone[current], dataClone[next]] = [
          dataClone[next],
          dataClone[current],
        ];

        addAnimationKeyframe(timeouts, {
          arrayToAnimate: [...dataClone],
          setArrayToAnimate: handlers.handleSetBars,
          timeDelay,
        });
        timeDelay += SWAP_POSITIONS_DELAY;
      } else if (current >= 0) {
        dataClone[current] = data.find(
          (entry) => entry.id === dataClone[current].id,
        );
        dataClone[next] = {
          ...dataClone[next],
          color: colors.brightGold,
        };

        addAnimationKeyframe(timeouts, {
          arrayToAnimate: [...dataClone],
          setArrayToAnimate: handlers.handleSetBars,
          timeDelay,
        });
        timeDelay += SWAP_COLORS_DELAY;
      }
    }

    // revert the last bar's color to its original one
    dataClone[lastIndex] = data.find(
      (entry) => entry.id === dataClone[lastIndex].id,
    );

    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });

    // change the finished status to display the reload icon instead of the pause one
    timeouts.push(
      setTimeout(() => {
        handlers.handleSortFinish(true);
      }, timeDelay),
    );

    handlers.handleSetTimeouts(timeouts);
  }
}
