import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/HomeScreenStyles";

const ProgressBar = ({ progress }) => {

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const complete = 9;
  const percentage = (complete/progress)*100;
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, { width: percentage }]} />
      </View>
      <Text style={styles.progressText}>{`${(complete/progress)*100}%`}</Text>
    </View>
  );
};

export default ProgressBar;