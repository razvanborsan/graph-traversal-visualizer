/* eslint-disable import/prefer-default-export */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getDistanceFromLatLonInKm(pointACoords, pointBCoords) {
  const latA = pointACoords[0];
  const longA = pointACoords[1];
  const latB = pointBCoords[0];
  const longB = pointBCoords[1];

  const R = 6371; // Radius of the earth in km

  const deltaLat = deg2rad(latB - latA); // deg2rad below
  const deltaLong = deg2rad(longB - longA);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(deg2rad(latA)) *
      Math.cos(deg2rad(latB)) *
      Math.sin(deltaLong / 2) *
      Math.sin(deltaLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
