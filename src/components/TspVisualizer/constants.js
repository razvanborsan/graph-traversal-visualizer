import { GeoJsonLayer } from '@deck.gl/layers';
import { UsaCapitals } from './UsaCapitals';

/* eslint-disable import/prefer-default-export */
export const usaViewport = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3.5,
};

export const getUSACapitals = () =>
  new GeoJsonLayer({
    id: 'geojson-layer',
    data: UsaCapitals,
    filled: true,
    pointRadiusMinPixels: 5,
    pointRadiusMaxPixels: 200,
    opacity: 1,
    pointRadiusScale: 0.3,
    getRadius: (f) => Math.pow(10, f.properties.mag),
    getFillColor: [255, 70, 30, 180],
    autoHighlight: true,
    transitions: {
      getRadius: {
        type: 'spring',
        stiffness: 0.1,
        damping: 0.15,
        enter: () => [0], // grow from size 0,
        duration: 10000,
      },
    },
  });
