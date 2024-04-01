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
      onChangeText={onChangeText} // Using the onChangeText prop cause certain fields werent ggetting passed through for creating a task
    />
  );
};

export default InputField;