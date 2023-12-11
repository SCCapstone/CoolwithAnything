import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/RegisterBoxesStyle';

const TextInputField = ({ value, onChangeText, placeholder, keyboardType }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default TextInputField;
