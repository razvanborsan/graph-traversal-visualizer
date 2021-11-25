import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import StaticMap from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import { Select, Button } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlayCircle,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
  nearestNeighbour,
  nearestInsertion,
  randomInsertion,
  farthestInsertion,
  cheapestInsertion,
} from 'algorithms';
import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';
import useInterval from 'hooks/useInterval';

import { getUSACapitals, usaViewport } from './constants';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TSP } from '../../algorithms/tsp/constants';

function TspVisualiser() {
  const [viewport, setViewport] = useState(usaViewport);
  const [pathLayer, setPathLayer] = useState();
  const [capitals, setCapitals] = useState();
  const [delay, setDelay] = useState();
  const [timestamp, setTimestamp] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pathAnimation, setPathAnimation] = useState(nearestNeighbour());
  const [algo, setAlgo] = useState(TSP.NEAREST_NEIGHBOUR);

  useEffect(() => {
    setCapitals(getUSACapitals());
  }, []);

  useInterval(() => {
    if (!pathAnimation[timestamp]) {
      setDelay();
      setTimestamp(0);
    } else {
      setPathLayer(
        new PathLayer({
          id: 'path-layer',
          data: [
            {
              name: 'random',
              color: [101, 147, 245],
              path: pathAnimation[timestamp].reduce(
                (accumulator, currentValue) => {
                  accumulator?.push(currentValue.geometry.coordinates);
                  return accumulator;
                },
                [],
              ),
            },
          ],
          getWidth: (data) => 2,
          getColor: (data) => data.color,
          getPath: (data) => data.path,
          currentTime: 0,
          widthMinPixels: 4,
          transitions: {
            getColor: {
              duration: 125,
            },
          },
        }),
      );

      let myDistance = 0;

      [...Array(timestamp)].forEach((entry, index) => {
        if (index > 0) {
          myDistance += getDistanceFromCoords(
            pathAnimation[timestamp][index - 1].geometry.coordinates,
            pathAnimation[timestamp][index].geometry.coordinates,
          );
        }
      });

      setTimestamp(timestamp + 1);
      setDistance(myDistance);
    }
  }, delay || null);

  return (
    <>
      <DeckGL
        initialViewState={viewport}
        width="1080px"
        height="550px"
        controller
        style={{ position: 'relative' }}
        layers={[pathLayer, capitals]}
      >
        <StaticMap mapboxApiAccessToken="pk.eyJ1IjoibmF6bnV0IiwiYSI6ImNra2EyZWt2YTAwOWcybnFqZm5oZnQxb3UifQ.1_D0GDN0N4TWlbu0FKDAkg" />
      </DeckGL>

      <Flex
        justify="center"
        align="center"
        style={{ gap: 10, width: 1080, marginTop: 15 }}
      >
        <Select
          value={algo}
          onChange={(e) => {
            setAlgo(e.target.value);
            switch (e.target.value) {
              case TSP.NEAREST_NEIGHBOUR:
                setPathAnimation(nearestNeighbour());
                break;
              case TSP.NEAREST_INSERTION:
                setPathAnimation(nearestInsertion());
                break;
              case TSP.CHEAPEST_INSERTION:
                setPathAnimation(cheapestInsertion());
                break;
              case TSP.FARTHEST_INSERTION:
                setPathAnimation(farthestInsertion());
                break;
              case TSP.RANDOM_INSERTION:
                setPathAnimation(randomInsertion());
                break;
              default:
                break;
            }
          }}
        >
          <option value={TSP.NEAREST_NEIGHBOUR}>Nearest Neighbour</option>
          <option value={TSP.NEAREST_INSERTION}>Nearest Insertion</option>
          <option value={TSP.FARTHEST_INSERTION}>Farthest Insertion</option>
          <option value={TSP.CHEAPEST_INSERTION}>Cheapest Insertion</option>
          <option value={TSP.RANDOM_INSERTION}>Random Insertion</option>
        </Select>

        <Button
          colorScheme="teal"
          onClick={() => {
            setDelay(100);
          }}
        >
          <FontAwesomeIcon icon={faPlayCircle} />
        </Button>

        <Button
          colorScheme="teal"
          disabled={!delay}
          onClick={() => {
            setDelay();
          }}
        >
          <FontAwesomeIcon icon={faPause} />
        </Button>

        <Button
          colorScheme="teal"
          onClick={() => {
            setPathLayer();
            setDelay();
            setTimestamp(0);
            setDistance(0);

            switch (algo) {
              case TSP.NEAREST_NEIGHBOUR:
                setPathAnimation(nearestNeighbour());
                break;
              case TSP.NEAREST_INSERTION:
                setPathAnimation(nearestInsertion());
                break;
              case TSP.CHEAPEST_INSERTION:
                setPathAnimation(cheapestInsertion());
                break;
              case TSP.FARTHEST_INSERTION:
                setPathAnimation(farthestInsertion());
                break;
              case TSP.RANDOM_INSERTION:
                setPathAnimation(randomInsertion());
                break;
              default:
                break;
            }
          }}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>

        <Flex justify="center" align="center" style={{ width: 400 }}>
          Distance: {Math.floor(distance)} km
        </Flex>

        <Flex justify="center" align="center" style={{ width: 650 }}>
          Start location: {pathAnimation[0][0]?.properties?.name},{' '}
          {pathAnimation[0][0]?.properties?.state}
        </Flex>
      </Flex>
    </>
  );
}

export default TspVisualiser;