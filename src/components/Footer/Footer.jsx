import React from 'react';
import { Image } from '@chakra-ui/react';

import github from 'images/githubLogo.svg';

import * as styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <a
        href="https://github.com/razvanborsan"
        target="_blank"
        rel="noreferrer"
      >
        <Image width="40px" src={github} />
      </a>
    </footer>
  );
}
