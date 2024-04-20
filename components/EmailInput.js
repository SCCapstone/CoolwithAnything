import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/LoginBoxesStyle';

const Email = ({ value, onChangeText, testID }) => {
  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        style={styles.emailInput}
        placeholder="Email"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Email;
