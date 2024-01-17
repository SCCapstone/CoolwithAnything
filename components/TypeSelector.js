// components/TypeSelector.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const types = ['School', 'Work', 'Personal', 'Gym', 'New'];

const TypeSelector = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.typeButton}
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
  },
  typeText: {
    // Add styles for your type button text here
  },
});

export default TypeSelector;
