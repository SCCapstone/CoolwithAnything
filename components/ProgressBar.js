import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/HomeScreenStyles";

const ProgressBar = ({ progress }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const complete = 9;
  
  // Ensure progress is a positive number to avoid division by zero
  const safeProgress = progress > 0 ? progress : 1;

  // Calculate percentage
  const percentage = (complete / safeProgress) * 100;

  // Ensure percentage is between 0 and 100 for display and styling
  const displayPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: `${displayPercentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${displayPercentage.toFixed(2)}%`}</Text>
    </View>
  );
};

export default ProgressBar;