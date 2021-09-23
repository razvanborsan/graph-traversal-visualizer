import React, { useState } from 'react';

import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import SortPlayer from 'components/SortPlayer';
import { sortAlgorithms } from 'shared/constants';

export default function SortingsPage() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState(sortAlgorithms[0]);
  const [selected, setSelected] = useState('');

  return (
    <Box as="section">
      {sortAlgorithms.map((algorithm) => (
        <Button
          key={algorithm.key}
          colorScheme={selected === algorithm.key ? 'blue' : 'teal'}
          size="sm"
          marginRight="1rem"
          onClick={() => {
            setSelected(algorithm.key);
            setCurrentAlgorithm(algorithm);
          }}
        >
          {algorithm.name}
        </Button>
      ))}

      <SortPlayer algorithm={currentAlgorithm} />
    </Box>
  );
}
