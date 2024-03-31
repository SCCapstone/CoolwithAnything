import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText} // Using the onChangeText prop cause certain fields werent ggetting passed through for creating a task
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#222831', // Darker shade for input background
    color: '#ffffff', // White color text for better contrast
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default InputField;