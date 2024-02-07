// Calendar.js
// This component will render a calendar view where days can be selected.
// You might use a library like `react-native-calendars` to facilitate calendar functionality.

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

