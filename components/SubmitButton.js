import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/RegisterButtonStyle';

const SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
