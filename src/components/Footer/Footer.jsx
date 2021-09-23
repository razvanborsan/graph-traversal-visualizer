import React from 'react';
import { Fade } from '@chakra-ui/react';

import * as styles from './Footer.module.scss';

export default function Footer() {
  return (
    <Fade in>
      <footer className={styles.footerContainer}>
        Footer is here!
      </footer>
    </Fade>
  );
}
