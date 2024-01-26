// components/InputField.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default InputField;
