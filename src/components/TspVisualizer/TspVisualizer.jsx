import * as React from 'react';
import { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import StaticMap from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import { nearestNeighbour } from 'algorithms';
import { Select, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlayCircle,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Flex } from '@chakra-ui/layout';
import { getDistanceFromLatLonInKm } from 'components/TspVisualizer/helpers';
import { getUSACapitals, usaViewport } from './constants';
import useInterval from '../../hooks/useInterval';

function TspVisualiser() {
  const [viewport, setViewport] = useState(usaViewport);
  const [timestamp, setTimestamp] = useState(2);

  const [pathLayer, setPathLayer] = useState();
  const [capitals, setCapitals] = useState();
  const [near, setNear] = useState(nearestNeighbour());
  const [algo, setAlgo] = useState('nn');
  const [delay, setDelay] = useState();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setCapitals(getUSACapitals());
  }, []);

  useInterval(() => {
    if (timestamp > near.length) {
      setDelay();
      setTimestamp(2);
    } else {
      setTimestamp(timestamp + 1);
      setPathLayer(
        new PathLayer({
          id: 'path-layer',
          data: [
            {
              name: 'random',
              color: [101, 147, 245],
              path: near.reduce((accumulator, currentValue) => {
                if (accumulator?.length <= timestamp) {
                  accumulator?.push(currentValue.geometry.coordinates);
                }
                return accumulator;
              }, []),
            },
          ],
          getWidth: (data) => 2,
          getColor: (data) => data.color,
          getPath: (data) => data.path,
          currentTime: 0,
          widthMinPixels: 4,
          transitions: {
            // Need be getColor which matches the accessor name
            getColor: {
              duration: 125,
            },
          },
        }),
      );

      let myDistance = 0;

      [...Array(timestamp)].forEach((entry, index) => {
        if (index > 0) {
          myDistance += getDistanceFromLatLonInKm(
            near[index - 1].geometry.coordinates,
            near[index].geometry.coordinates,
          );
        }
      });

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
        <Select value={algo}>
          <option value="nn">Nearest Neighbour</option>
        </Select>

        <Button
          colorScheme="teal"
          onClick={() => {
            setDelay(75);
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
            setNear(nearestNeighbour());
            setDelay();
            setTimestamp(2);
            setDistance(0);
          }}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>

        <Flex justify="center" align="center" style={{ width: 350 }}>
          Distance: {Math.floor(distance)} km
        </Flex>

        <Flex justify="center" align="center" style={{ width: 750 }}>
          Start location: {near[0].properties.name}, {near[0].properties.state}
        </Flex>
      </Flex>
    </>
  );
}

export default TspVisualiser;
