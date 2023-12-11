import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/LoginBoxesStyle';

const ConfirmPasswordInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry
      />
    </View>
  );
};

export default ConfirmPasswordInput;
