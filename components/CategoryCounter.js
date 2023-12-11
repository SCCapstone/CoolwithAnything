// CategoryCounter.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/CategoryCounterStyle';

const CategoryCounter = ({ count, label, color }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.counter, { backgroundColor: color }]}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CategoryCounter;