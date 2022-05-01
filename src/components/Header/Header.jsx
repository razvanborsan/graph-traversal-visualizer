import React from 'react';

import { Box, Text } from '@chakra-ui/layout';
import { Fade } from '@chakra-ui/react';

import NavItem from 'components/NavItem';

import * as styles from './Header.module.scss';

export default function Header() {
  return (
    <Fade in>
      <Box as="header" className={styles.headerContainer}>
        <Text fontSize="md">Hi! My name is Razu!</Text>
        <Box as="nav" className={styles.navContainer}>
          <NavItem link="/" text="Home" />
          <NavItem link="/sortings" text="Sortings" />
          <NavItem link="/graphs" text="Graphs" />
          <NavItem link="/" text="Contact" />
        </Box>
      </Box>
    </Fade>
  );
}
