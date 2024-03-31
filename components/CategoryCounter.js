import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/HomeScreenStyles";

const CategoryCounter = ({ count, label, color }) => {

  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  return (
    <View style={styles.circleContainer}>
      <View style={[styles.counter, { backgroundColor: color }]}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Text style={styles.categoryLabel}>{label}</Text>
    </View>
  );
};

export default CategoryCounter;