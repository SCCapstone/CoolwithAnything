import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const types = ['School', 'Work', 'Personal', 'Gym'];

const TypeSelector = ({ selectedType, onSelect }) => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  typeButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc', // Normal border color
  },
  selectedTypeButton: {
    backgroundColor: '#007bff', // Adjusted background color for the selected type
    borderColor: '#0056b3', // Darker border color for the selected type
    borderWidth: 2, // Make border thicker for selected type for more emphasis
  },
  typeText: {
    color: '#000', // Text color for the type button
  },
});

export default TypeSelector;