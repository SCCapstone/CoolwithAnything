import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../services/ThemeContext.js";
import getStyles from "../styles/InputFieldStyles.js";

const InputField = ({ placeholder, onChangeText, value }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText} // Using the onChangeText prop for better interactivity
      placeholderTextColor="#7d7d7d" // Lighter shade for placeholder text for better visibility
      // Ensure text color is white for visibility against the dark background
    />
  );
};

export default InputField;