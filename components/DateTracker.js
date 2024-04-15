import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/HomeScreenStyles";

const DateTracker = ({ month, year }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.dateTrackerContainer}>
      <Text style={styles.monthYearText}>{`${month} ${year}`}</Text>
    </View>
  );
};

export default DateTracker;
