// components/WorkoutHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/WorkoutHeaderStyles";

const WorkoutHeader = ({ onClose }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Create Workout</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutHeader;
