import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>No Worry</Text>
        <Text style={styles.subHeaderText}>We are here to help you reset it</Text>
      </View>
      <View style={styles.content}>
        {/* <Image source={require('../photos/logo2.png')} style={styles.icon} /> */}
        <Text style={styles.instructions}>Provide your account's email to reset your password</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Verification")}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    // Add additional styling as needed
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    // Add additional styling as needed
  },
  subHeaderText: {
    fontSize: 18,
    // Add additional styling as needed
  },
  content: {
    width: '80%',
    alignItems: 'center',
    // Add additional styling as needed
  },
  icon: {
    // Define size and styling for lock icon
  },
  instructions: {
    marginBottom: 20,
    textAlign: 'center',
    // Add additional styling as needed
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    // Add additional styling as needed
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    // Add additional styling as needed
  },
  buttonText: {
    color: '#fff',
    // Add additional styling as needed
  },
});

export default ForgotPassword;
