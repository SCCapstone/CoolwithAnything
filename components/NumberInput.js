import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import styles from '../styles/BiometricBoxesStyle';

const NumberInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};

export default NumberInput;
