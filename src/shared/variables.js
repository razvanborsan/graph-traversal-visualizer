/* eslint-disable import/prefer-default-export */
function delay(delayData) {
  const { arrayToAnimate, setArrayToAnimate, timeDelay } = delayData;

  const animationKeyframeRef = setTimeout(() => {
    setArrayToAnimate(arrayToAnimate);
  }, timeDelay);

  return animationKeyframeRef;
}

export function addAnimationKeyframe(timeouts, delayData) {
  timeouts.push(delay(delayData));
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getDijkstraDelay = (cost) => cost / 20;
