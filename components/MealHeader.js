// components/MealHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/MealHeaderStyles";

const MealHeader = ({ onClose }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Create Meal</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MealHeader;
