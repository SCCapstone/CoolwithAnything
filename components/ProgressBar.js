// ProgressBar.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/ProgressBarStyle';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${progress}%`}</Text>
    </View>
  );
};

export default ProgressBar;

