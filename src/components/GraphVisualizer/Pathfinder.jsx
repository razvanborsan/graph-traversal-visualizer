import React from 'react';
import { Wrap } from '@chakra-ui/layout';

export default function Pathfinder({ elements }) {
  return (
    <Wrap
      style={{
        width: 1080,
        paddingBottom: 25,
      }}
    >
      {elements}
    </Wrap>
  );
}
