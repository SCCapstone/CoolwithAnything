import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/LoginBoxesStyle';

const PasswordInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry
      />
    </View>
  );
};

export default PasswordInput;
