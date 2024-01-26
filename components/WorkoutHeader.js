// components/WorkoutHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WorkoutHeader = ({ onClose }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Create Workout</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 22,
  },
});

export default WorkoutHeader;
