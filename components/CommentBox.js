// components/CommentBox.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../services/ThemeContext.js";
import getStyles from "../styles/CommentBoxStyles.js";

const CommentBox = ({ onChangeText, value, placeholder, keyboardType }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.commentInput}
        multiline
        placeholderTextColor="#7d7d7d"
        placeholder="Instructions"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CommentBox;
