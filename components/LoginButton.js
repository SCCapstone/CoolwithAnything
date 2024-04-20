import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import styles from '../styles/LoginButtonStyle';

const LoginButton = ({ onPress, testID }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <FontAwesome5 name="arrow-circle-right" size={45} color="#57BCBE" />
    </TouchableOpacity>
  );
};

export default LoginButton;
