import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { springTransition } from './constants';
import { getVariants } from './variables';

import * as styles from './SortAnimation.module.scss';

export default function SortAnimation({
  algorithm,
  startSorting,
  initialValues,
  previousValues,
  handleSortFinish,
}) {
  const [sortBars, setSortBars] = useState(initialValues);
  const [timeouts, setTimeouts] = useState([]);

  const handleSetBars = (bars) => {
    setSortBars(bars);
  };

  const handleSetTimeouts = (newTimeouts) => {
    setTimeouts(newTimeouts);
  };

  useEffect(() => {
    if (startSorting) {
      const handlers = {
        handleSetBars,
        handleSetTimeouts,
        handleSortFinish,
      };

      algorithm.sort(sortBars, handlers);
    } else {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      setSortBars(initialValues);
      handleSortFinish(false);
    }
  }, [startSorting, initialValues]);

  return (
    <ul className={styles.barsContainer}>
      {sortBars?.map((bar) => (
        <motion.li
          key={bar.id}
          layout
          custom={bar.id}
          variants={getVariants(initialValues, previousValues)}
          initial="previous"
          animate="current"
          transition={springTransition}
          style={{ background: bar.color }}
        />
      ))}
    </ul>
  );
}

SortAnimation.propTypes = {
  algorithm: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    complexity: PropTypes.string.isRequired,
    sort: PropTypes.func.isRequired,
  }).isRequired,
  startSorting: PropTypes.bool.isRequired,
  initialValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  previousValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  handleSortFinish: PropTypes.func.isRequired,
};
