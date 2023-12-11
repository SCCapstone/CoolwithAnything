import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/LoginBoxesStyle';

const Email = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Email;
