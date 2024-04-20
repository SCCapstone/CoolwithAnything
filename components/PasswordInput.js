import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/LoginBoxesStyle';

const PasswordInput = ({ value, onChangeText, testID }) => {
  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        style={styles.passwordInput}
        placeholder="Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry
      />
    </View>
  );
};

export default PasswordInput;
