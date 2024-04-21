import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import styles from '../styles/BiometricScreenStyle';

const NumberInput = ({ value, onChangeText, placeholder, style }) => {
  // Convert the number to a string when passing to TextInput, handle undefined or null values
  const handleTextChange = (text) => {
    const number = parseInt(text, 10);
    onChangeText(number || number === 0 ? number : ''); // Ensure to handle the zero condition
  };

  const stringValue = value === undefined || value === null || value === '' ? '' : value.toString();

  return (
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        value={stringValue} // Check if value is undefined or null before converting to string
        onChangeText={handleTextChange}
        keyboardType="numeric"
      />
  );
};

export default NumberInput;
