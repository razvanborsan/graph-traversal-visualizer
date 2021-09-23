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
