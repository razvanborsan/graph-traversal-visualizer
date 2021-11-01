import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHourglassStart,
  faHourglassEnd,
} from '@fortawesome/free-solid-svg-icons';

import { graphVertice } from 'shared/constants';

import {
  finalRouteBackground,
  finalRouteColors,
  getMazeBorders,
  getMazeBordersTransition,
  getVisitedTimes,
  idleBackground,
  idleBorder,
  getMazeColors,
  routeColors,
} from './constants';
import * as styles from './Node.module.scss';

const MotionBox = motion(Box);

export default function Node({ controlState, walls, maze, mazeType, delays }) {
  const controls = useAnimation();

  const { isStart, isEnd, isVisited, isPartOfFinalRoute } = controlState;
  const { keyframeDelay, finalRouteKeyframeDelay } = delays;

  const variants = {
    visited: {
      backgroundColor: isPartOfFinalRoute ? finalRouteColors : routeColors,
      transition: {
        duration: 1,
        times: getVisitedTimes(),
        delay: keyframeDelay,
        backgroundColor: {
          duration: isPartOfFinalRoute ? finalRouteKeyframeDelay : 1,
          times: getVisitedTimes(finalRouteKeyframeDelay),
          delay: keyframeDelay,
        },
      },
    },

    mazeVisited: {
      backgroundColor: getMazeColors(mazeType),
      ...getMazeBorders(walls, mazeType),
      transition: {
        duration: 0.05,
        delay: maze.firstVisitDelay,
        backgroundColor: {
          duration: maze.lastVisitDelay - maze.firstVisitDelay,
          delay: maze.firstVisitDelay,
          times: [0.999, 1],
        },
        ...getMazeBordersTransition(maze, mazeType),
      },
    },
    start: {
      backgroundColor: finalRouteBackground,
    },
    end: {
      backgroundColor: finalRouteBackground,
    },
    idle: {
      backgroundColor: idleBackground,
      border: idleBorder,
    },
  };

  useEffect(() => {
    if (isStart) {
      controls.start('start');
    } else if (isEnd) {
      controls.start('end');
    } else if (isVisited) {
      controls.start('visited');
    } else if (maze.isVisited) {
      controls.start('mazeVisited');
    } else {
      controls.start('idle');
    }
  }, [isStart, isEnd, isVisited, maze.isVisited]);

  return (
    <MotionBox
      style={{
        width: graphVertice.width,
        height: graphVertice.height,
      }}
      className={styles.nodeContainer}
      variants={variants}
      animate={controls}
    >
      {isStart ? <FontAwesomeIcon icon={faHourglassStart} /> : ''}
      {isEnd ? <FontAwesomeIcon icon={faHourglassEnd} /> : ''}
    </MotionBox>
  );
}

Node.propTypes = {
  controlState: PropTypes.shape({
    isStart: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    isVisited: PropTypes.bool.isRequired,
    isPartOfFinalRoute: PropTypes.bool.isRequired,
  }).isRequired,
  walls: PropTypes.shape({
    north: PropTypes.bool.isRequired,
    east: PropTypes.bool.isRequired,
    south: PropTypes.bool.isRequired,
    west: PropTypes.bool.isRequired,
  }).isRequired,
  maze: PropTypes.shape({
    isVisited: PropTypes.bool.isRequired,
    firstVisitDelay: PropTypes.number.isRequired,
    lastVisitDelay: PropTypes.number.isRequired,
  }).isRequired,
  mazeType: PropTypes.string.isRequired,
  delays: PropTypes.shape({
    keyframeDelay: PropTypes.number.isRequired,
    finalRouteKeyframeDelay: PropTypes.number.isRequired,
  }).isRequired,
};
