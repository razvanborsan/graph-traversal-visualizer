import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/layout';

import SortAnimation from 'components/SortAnimation';

import { getRandomValues } from './variables';
import * as styles from './SortPlayer.module.scss';
import PlayerButtonsContainer from './PlayerButtonsContainer';

export default function SortPlayer({ algorithm }) {
  const [startSorting, setStartSorting] = useState(false);
  const [isSortFinished, setIsSortFinished] = useState(false);
  const [values, setValues] = useState(getRandomValues(20));
  const [previousValues, setPreviousValues] = useState(
    values.map((entry) => ({ ...entry, value: 0 })),
  );
  const [variables, setVariables] = useState({
    isSortFinished,
    startSorting,
    values,
  });
  const handleSortFinish = (sortStatus) => {
    setIsSortFinished(sortStatus);
  };

  const handleValues = (newValues) => {
    setValues(newValues);
  };

  const handlePreviousValues = (previous) => {
    setPreviousValues(previous);
  };

  const handleStartSorting = (action) => {
    setStartSorting(action);
  };

  const handlers = {
    handleValues,
    handlePreviousValues,
    handleStartSorting,
  };

  useEffect(() => {
    setVariables({
      isSortFinished,
      startSorting,
      values,
    });
  }, [isSortFinished, startSorting, values]);

  useEffect(() => {
    if (startSorting) {
      setStartSorting(false);
    }
  }, [algorithm, values]);
  return (
    <>
      <Box className={styles.cardContainer}>
        <Box className={styles.animationContainer}>
          <SortAnimation
            algorithm={algorithm}
            startSorting={startSorting}
            initialValues={values}
            previousValues={previousValues}
            handleSortFinish={handleSortFinish}
          />
        </Box>

        <Flex>
          <Box p="6">
            <Box fontWeight="semibold" as="h4" isTruncated>
              {algorithm.name}
            </Box>
            <Box>Complexity</Box>
          </Box>
          <PlayerButtonsContainer variables={variables} handlers={handlers} />
        </Flex>
      </Box>
    </>
  );
}

SortPlayer.propTypes = {
  algorithm: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    complexity: PropTypes.string.isRequired,
  }).isRequired,
};
