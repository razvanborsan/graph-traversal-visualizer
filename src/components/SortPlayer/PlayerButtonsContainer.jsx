import React from 'react';
import PropTypes from 'prop-types';

import { Center } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import {
  faMinus,
  faPlus,
  faRandom,
  faSortAmountDown,
  faSortAmountUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getPlayIcon, getRandomValues, getSorted } from './variables';

import * as styles from './SortPlayer.module.scss';
import { BAR_NUMBER_ACTIONS, SORTED_ARRAY_TYPE } from './constants';

export default function PlayerButtonsContainer({
  variables,
  handlers,
  numberOfValues,
}) {
  const { isSortFinished, startSorting, values } = variables;
  const {
    handleValues,
    handlePreviousValues,
    handleStartSorting,
    handleNumberOfValues,
  } = handlers;

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
          handleValues(getRandomValues(numberOfValues));
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
          handleValues(getSorted(numberOfValues, SORTED_ARRAY_TYPE.DECREASING));
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
          handleValues(getSorted(numberOfValues, SORTED_ARRAY_TYPE.INCREASING));
        }}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={faSortAmountUp} />
      </Button>
      <Button
        disabled={numberOfValues === 5}
        className={styles.playerButton}
        onClick={() => {
          handleStartSorting(false);
          handleNumberOfValues(BAR_NUMBER_ACTIONS.INCREASE);
        }}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Button
        disabled={numberOfValues === 1}
        className={styles.playerButton}
        onClick={() => {
          handleStartSorting(false);
          handleNumberOfValues(BAR_NUMBER_ACTIONS.DECREASE);
        }}
        colorScheme="teal"
      >
        <FontAwesomeIcon icon={faMinus} />
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
  numberOfValues: PropTypes.number.isRequired,
  handlers: PropTypes.shape({
    handleValues: PropTypes.func.isRequired,
    handlePreviousValues: PropTypes.func.isRequired,
    handleStartSorting: PropTypes.func.isRequired,
    handleNumberOfValues: PropTypes.func.isRequired,
  }).isRequired,
};
