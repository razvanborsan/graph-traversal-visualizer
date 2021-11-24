/* eslint-disable import/prefer-default-export */

export function getDistanceFromCoords(pointACoords, pointBCoords) {
  const lat1 = Math.abs(pointACoords[1]);
  const lon1 = Math.abs(pointACoords[0]);
  const lat2 = Math.abs(pointBCoords[1]);
  const lon2 = Math.abs(pointBCoords[0]);

  const p = 0.017453292519943295; // Math.PI / 180
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
