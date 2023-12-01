import React from 'react';
import { View, Text } from 'react-native';
import { format, parseISO } from 'date-fns';
import styles from './browseStyle.js';

const WorkoutScreen = ({ route }) => {
  return (
    <View style={styles.container}>

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Your Workouts</Text>
      </View>
    </View>
  );
  }

export default WorkoutScreen;