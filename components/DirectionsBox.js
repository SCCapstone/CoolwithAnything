import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../services/ThemeContext.js";
import getStyles from "../styles/DirectionsBoxStyles.js";

const DirectionsBox = ({ onChangeText, value, placeholder, keyboardType }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.directionsInput}
        multiline
        placeholderTextColor="#7d7d7d"
        placeholder="Ingredients"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default DirectionsBox;
