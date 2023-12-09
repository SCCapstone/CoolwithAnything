import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Assuming a light theme
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5cb85c', // A shade of green for success
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 24,
    color: '#333', // Dark text for contrast
    marginBottom: 20,
  },
  congratulation: {
    fontSize: 16,
    color: '#666', // Lighter text for the body
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#5cb85c', // Button color that stands out
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
