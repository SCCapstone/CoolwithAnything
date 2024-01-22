import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/LoginButtonStyle';

const SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add Bio</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
