import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/RegisterButtonStyle';

const RegisterButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

export default RegisterButton;
