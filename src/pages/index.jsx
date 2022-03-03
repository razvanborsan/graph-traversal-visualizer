import * as React from 'react';
import { Heading, Text, Box } from '@chakra-ui/layout';

import * as styles from 'styles/index.module.scss';

export default function Index() {
  return (
    <Box as="section" className={styles.container}>
      <Heading as="h2" size="2xl">
        Hello!
      </Heading>
      <Text fontSize="md" className={styles.messageContainer}>
        My name is Razvan Ionut Borsan and I&apos;m a frontend developer based
        in Iasi, Romania.
      </Text>
    </Box>
  );
}
