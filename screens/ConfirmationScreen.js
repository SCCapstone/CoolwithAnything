import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ConfirmationScreenStyle';

const ConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Home</Text>
      <Text style={styles.subHeader}>You're a part of ours now!</Text>

      <Text style={styles.congratulation}>
        Congratulations! You have successfully signed up. You can go back to login now! Welcome home!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Replace with your login screen's navigation
      >
        <Text style={styles.buttonText}>Back To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;
