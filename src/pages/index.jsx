import React from 'react';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Graph Visualizer</title>
        <link
          rel="canonical"
          href="https://razvanborsan.github.io/graph-traversal-visualizer/"
        />
      </Helmet>
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
