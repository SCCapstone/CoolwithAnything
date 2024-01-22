import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/LoginButtonStyle';

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
