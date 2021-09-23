import * as React from 'react';
import PropTypes from 'prop-types';
import { Flex, Grid } from '@chakra-ui/layout';

import Header from 'components/Header';
import Footer from 'components/Footer';

export default function Layout({ children }) {
  return (
    <Grid h="100vh" templateColumns="1fr" templateRows="auto 1fr auto">
      <Header />
      <Flex direction="column" justify="flex-start" align="center">
        <main>{children}</main>
      </Flex>
      <Footer />
    </Grid>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
