/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { AnimatePresence } from 'framer-motion';

import Layout from 'components/Layout';

import 'styles/global.scss';

export const wrapPageElement = ({ element }) => (
  <Layout>
    <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
  </Layout>
);
