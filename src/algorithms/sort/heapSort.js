import { addAnimationKeyframe } from 'shared/variables';
import colors from 'shared/colors';

export default function heapSort(data, handlers) {
  const dataClone = [...data];
  const timeouts = [];
  let timeDelay = 0;

  const animateStep = () => {
    addAnimationKeyframe(timeouts, {
      arrayToAnimate: [...dataClone],
      setArrayToAnimate: handlers.handleSetBars,
      timeDelay,
    });
    timeDelay += 200;
  };

  const getLeftChild = (parentIndex) => parentIndex * 2 + 1;
  const getRightChild = (parentIndex) => parentIndex * 2 + 2;

  const revertColors = (parent, heapLength) => {
    // revert every elements color
    const leftChild = getLeftChild(parent);
    const rightChild = getRightChild(parent);

    dataClone[parent] = { ...dataClone[parent], color: colors.darkPink };
    dataClone[leftChild] = {
      ...dataClone[leftChild],
      color: colors.darkPink,
    };
    if (rightChild < heapLength) {
      dataClone[rightChild] = {
        ...dataClone[rightChild],
        color: colors.darkPink,
      };
    }
    animateStep();
  };

  const bubble = (parentIndex, heapLength) => {
    let parent = parentIndex;

    // This while runs until the parent is correctly placed in the heap
    while (parent < heapLength) {
      const leftChild = getLeftChild(parent);
      const rightChild = getRightChild(parent);

      // We are looking for child nodes; if there are no child nodes, skip
      if (leftChild < heapLength) {
        // change the current parent color
        dataClone[parent] = { ...dataClone[parent], color: colors.brightPink };

        // change the current left child color
        dataClone[leftChild] = {
          ...dataClone[leftChild],
          color: colors.brightGold,
        };

        // if there is a right child, change its color as well
        if (rightChild < heapLength) {
          dataClone[rightChild] = {
            ...dataClone[rightChild],
            color: colors.brightCyan,
          };
        }
        animateStep();

        // find the larger element between the left and the right child
        let larger = leftChild;
        if (
          rightChild < heapLength
          && dataClone[leftChild]?.value < dataClone[rightChild]?.value
        ) {
          larger = rightChild;
        }

        // if the largest child is greater than the parent, swap their positions
        if (dataClone[larger].value > dataClone[parent].value) {
          [dataClone[parent], dataClone[larger]] = [
            dataClone[larger],
            dataClone[parent],
          ];
          animateStep();

          revertColors(parent, heapLength);

          // run the loop again to correctly position the initial parent in the heap
          parent = larger;
        } else {
          revertColors(parent, heapLength);

          // exit the loop
          parent = heapLength;
        }
      } else {
        // exit the loop
        parent = heapLength;
      }
    }
  };

  const createMaxHeap = (heapLength) => {
    for (let parent = heapLength - 1; parent >= 0; parent -= 1) {
      bubble(parent, heapLength);
    }
  };
  createMaxHeap(dataClone.length);

  for (let i = dataClone.length - 1; i >= 0; i -= 1) {
    // color the currently sorted array in blue
    dataClone[0] = { ...dataClone[0], color: colors.brightBlue };
    animateStep();

    // swap the root of the max heap with the rightmost leaf
    [dataClone[0], dataClone[i]] = [dataClone[i], dataClone[0]];
    animateStep();

    bubble(0, i);
  }

  for (let i = 0; i < dataClone.length; i += 1) {
    dataClone[i] = { ...dataClone[i], color: colors.darkPink };
  }
  animateStep();
  timeouts.push(
    setTimeout(() => {
      handlers.handleSortFinish(true);
    }, timeDelay),
  );

  handlers.handleSetTimeouts(timeouts);
}
