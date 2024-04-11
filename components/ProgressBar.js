import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/HomeScreenStyles";

const ProgressBar = ({ completedTasks, totalTasks }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const safeTotalTasks = Math.max(totalTasks, 1);
  const percentage = (completedTasks / safeTotalTasks) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${percentage.toFixed(2)}% Complete`}</Text>
    </View>
  );
};

export default ProgressBar;