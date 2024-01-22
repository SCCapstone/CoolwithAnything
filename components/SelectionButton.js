import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../styles/BiometricButtonStyle';

const SelectionButton = ({ title, selected, onPress }) => {
  const buttonStyle = selected
    ? [styles.button, styles.selected]
    : styles.button;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SelectionButton;
