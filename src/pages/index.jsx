import React from 'react';
import { Box, Flex, Grid } from '@chakra-ui/layout';

import GraphVisualizer from 'components/GraphVisualizer';
import Footer from 'components/Footer';

export default function Graphs() {
  return (
    <Grid
      backgroundColor="#F2F2F2"
      h="100vh"
      templateColumns="1fr"
      templateRows="auto 1fr auto"
    >
      <Box />
      <Flex direction="column" justify="center" align="center">
        <main>
          <GraphVisualizer />
        </main>
      </Flex>
      <Footer />
    </Grid>
  );
}
