// components/InputField.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText} // Using the onChangeText prop cause certain fields werent ggetting passed through for creating a task
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
