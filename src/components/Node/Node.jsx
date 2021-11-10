import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faBullseye,
  faAnchor,
} from '@fortawesome/free-solid-svg-icons';

import { graphVertice } from 'shared/constants';
import colors from 'shared/colors';

import { getDijkstraDelay } from 'shared/variables';
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const MotionBox = motion(Box);
export default function Node({
  coords,
  controlState,
  walls,
  maze,
  mazeType,
  delays,
  isMazeAnimated,
  setIsMazeAnimated,
  setStartPointCoords,
  setEndPointCoords,
}) {
  const controls = useAnimation();

  const onStartDrag = (event, info, nodeType) => {
    let squaresX;
    let squaresY;
    const { x, y } = info.offset;
    const { width, height } = graphVertice;

    if (x >= 0) {
      squaresX =
        x - width / 2 > 0 ? Math.floor((x - width / 2) / width) + 1 : 0;
    } else {
      squaresX = x + width / 2 < 0 ? Math.floor((x + width / 2) / width) : 0;
    }

    if (y >= 0) {
      squaresY =
        y - height / 2 > 0 ? Math.floor((y - height / 2) / height) + 1 : 0;
    } else {
      squaresY = y + height / 2 < 0 ? Math.floor((y + height / 2) / height) : 0;
    }

    switch (nodeType) {
      case 'start':
        setStartPointCoords(
          `${coords.row + squaresY}-${coords.col + squaresX}`,
        );
        break;
      case 'end':
        setEndPointCoords(`${coords.row + squaresY}-${coords.col + squaresX}`);
        break;
      default:
        break;
    }
  };

  const { isStart, isEnd, isWeighted, isVisited, isPartOfFinalRoute } =
    controlState;
  const { keyframeDelay, finalRouteKeyframeDelay } = delays;
  const prevIsWeighted = usePrevious(controlState.isWeighted);
  const prevIsVisited = usePrevious(controlState.isVisited);

  const variants = {
    visited: {
      backgroundColor: isPartOfFinalRoute ? finalRouteColors : routeColors,
      scale: isWeighted && isVisited ? [1, 1.1, 1.15, 1.1, 1] : 1,
      transition: {
        duration: 1,
        times: getVisitedTimes(),
        delay: keyframeDelay,

        backgroundColor: {
          duration: isPartOfFinalRoute ? finalRouteKeyframeDelay : 1,
          times: getVisitedTimes(finalRouteKeyframeDelay),
          delay: keyframeDelay,
        },

        scale: {
          duration: 0.25,
          times: getVisitedTimes(finalRouteKeyframeDelay),
          delay: keyframeDelay - getDijkstraDelay(15),
          repeat: 2,
        },
      },
    },

    mazeVisited: {
      scale: 1,
      ...(((!isWeighted && !prevIsWeighted) || prevIsVisited) && {
        backgroundColor: getMazeColors(mazeType),
      }),
      ...(((!isWeighted && !prevIsWeighted) || prevIsVisited) && {
        ...getMazeBorders(walls, mazeType),
      }),
      ...(isMazeAnimated &&
        ((!isWeighted && !prevIsWeighted) || prevIsVisited) && {
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
        }),
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
  }, [isStart, isEnd, isWeighted, isVisited, maze.isVisited]);

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
      {isStart && (
        <MotionBox
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          layoutId="start"
          initial="false"
          dragElastic={1}
          style={{
            width: graphVertice.width,
            height: graphVertice.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          whileHover={{
            backgroundColor: colors.brightGold,
            scale: 1.05,
            cursor: 'pointer',
          }}
          onDragStart={() => setIsMazeAnimated(false)}
          onDragEnd={(event, info) => onStartDrag(event, info, 'start')}
        >
          <FontAwesomeIcon icon={faPlay} />
        </MotionBox>
      )}
      {isEnd && (
        <MotionBox
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          layoutId="start"
          initial="false"
          dragElastic={1}
          style={{
            width: graphVertice.width,
            height: graphVertice.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          whileHover={{
            backgroundColor: colors.brightGold,
            scale: 1.05,
            cursor: 'pointer',
          }}
          onDragStart={() => setIsMazeAnimated(false)}
          onDragEnd={(event, info) => onStartDrag(event, info, 'end')}
        >
          <FontAwesomeIcon icon={faBullseye} />
        </MotionBox>
      )}
      {isWeighted ? (
        <FontAwesomeIcon style={{ color: colors.anchorBlue }} icon={faAnchor} />
      ) : (
        ''
      )}
    </MotionBox>
  );
}
Node.propTypes = {
  coords: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  }).isRequired,
  setStartPointCoords: PropTypes.func.isRequired,
  setEndPointCoords: PropTypes.func.isRequired,
  controlState: PropTypes.shape({
    isStart: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    isWeighted: PropTypes.bool.isRequired,
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
  isMazeAnimated: PropTypes.bool.isRequired,
  setIsMazeAnimated: PropTypes.func.isRequired,
  delays: PropTypes.shape({
    keyframeDelay: PropTypes.number.isRequired,
    finalRouteKeyframeDelay: PropTypes.number.isRequired,
  }).isRequired,
};
