import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from "../services/ThemeContext.js";
import getStyles from "../styles/TypeSelectorStyles.js";

const types = ['School', 'Work', 'Personal', 'Gym'];

const TypeSelector = ({ selectedType, onSelect }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            selectedType === type && styles.selectedTypeButton // Apply the selected style if this type is selected
          ]}
          onPress={() => onSelect(type)}
        >
          <Text style={styles.typeText}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TypeSelector;