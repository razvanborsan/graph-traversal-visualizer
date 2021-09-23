import React from 'react';
import PropTypes from 'prop-types';

import { Center } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import {
  faRandom,
  faSortAmountDown,
  faSortAmountUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getPlayIcon, getRandomValues, getSortedValues } from './variables';

import * as styles from './SortPlayer.module.scss';

export default function PlayerButtonsContainer({ variables, handlers }) {
  const { isSortFinished, startSorting, values } = variables;
  const { handleValues, handlePreviousValues, handleStartSorting } = handlers;

  return (
    <Center>
      <Button
        className={styles.playerButton}
        onClick={() => handleStartSorting(!startSorting)}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={getPlayIcon(isSortFinished, startSorting)} />
      </Button>
      <Button
        className={styles.playerButton}
        onClick={() => {
          handleStartSorting(false);
          handlePreviousValues(values);
          handleValues(getRandomValues());
        }}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={faRandom} />
      </Button>
      <Button
        className={styles.playerButton}
        onClick={() => {
          handleStartSorting(false);
          handlePreviousValues(values);
          handleValues(getSortedValues('descending'));
        }}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={faSortAmountDown} />
      </Button>
      <Button
        className={styles.playerButton}
        onClick={() => {
          handleStartSorting(false);
          handlePreviousValues(values);
          handleValues(getSortedValues('ascending'));
        }}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={faSortAmountUp} />
      </Button>
    </Center>
  );
}

PlayerButtonsContainer.propTypes = {
  variables: PropTypes.shape({
    isSortFinished: PropTypes.bool.isRequired,
    startSorting: PropTypes.bool.isRequired,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  handlers: PropTypes.shape({
    handleValues: PropTypes.func.isRequired,
    handlePreviousValues: PropTypes.func.isRequired,
    handleStartSorting: PropTypes.func.isRequired,
  }).isRequired,
};
