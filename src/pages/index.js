import * as React from 'react';
import { Heading, Text } from '@chakra-ui/layout';

import * as styles from 'styles/index.module.scss';
import { SlideFade } from '@chakra-ui/react';

export default function App() {
  return (
    <SlideFade in className={styles.container}>
      <Heading as="h2" size="2xl">
        Hello!
      </Heading>
      <Text fontSize="md" className={styles.messageContainer}>
        My name is Razvan Ionut Borsan and I&apos;m a frontend developer based
        in Iasi, Romania.
      </Text>
    </SlideFade>
  );
}
