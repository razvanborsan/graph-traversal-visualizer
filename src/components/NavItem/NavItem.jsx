import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { Box, Text } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

import { navItemHoverAnimation, navItemHoverTransition } from './constants';

import * as styles from './NavItem.module.scss';

const MotionBox = motion(Box);

export default function NavItem({ link, text }) {
  return (
    <Link to={link}>
      <MotionBox
        className={styles.navItem}
        whileHover={navItemHoverAnimation}
        transition={navItemHoverTransition}
      >
        <Text fontSize="md">{text}</Text>
      </MotionBox>
    </Link>
  );
}

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
