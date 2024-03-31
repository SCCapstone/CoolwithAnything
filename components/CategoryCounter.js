import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/CategoryCounterStyle';

const CategoryCounter = ({ count, label, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.counter, { backgroundColor: color }]}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCounter;