// components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from "../services/ThemeContext.js";
import getStyles from "../styles/HeaderStyles.js";

const Header = ({ onClose }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Name</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
