import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/ProgressBarStyle';

const ProgressBar = ({ progress }) => {

  const complete = 9;
  
  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: `${(complete/progress)*100}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${(complete/progress)*100}%`}</Text>
    </View>
  );
};

export default ProgressBar;