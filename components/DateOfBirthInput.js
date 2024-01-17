import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import styles from '../styles/RegisterBoxesStyle';

const DateOfBirthInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (MM-DD-YYYY)"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default DateOfBirthInput;
