import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CodeVerification = ({ navigation }) => {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>No Worry</Text>
        <Text style={styles.subHeaderText}>We are here to help you reset it</Text>
      </View>
      <View style={styles.content}>
        {/* <Image source={require('path-to-lock-icon.png')} style={styles.icon} /> */}
        <Text style={styles.instructions}>Have your code yet?</Text>
        <Text style={styles.subInstructions}>Enter the code that we sent in your email here</Text>
        <View style={styles.codeInputContainer}>
          {/* Assuming the code is 4 digits, render 4 input fields */}
          {Array.from({ length: 4 }, (_, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => {
                // Update the code state. You would also handle moving to the next input here.
              }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={() => {/* handle resending the code */}}>
          <Text style={styles.linkText}>Click here to send new code!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewPassword")}>
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
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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
    width: '100%',
    alignItems: 'center',
    // Add additional styling as needed
  },
  icon: {
    // Define size and styling for lock icon
  },
  instructions: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    // Add additional styling as needed
  },
  subInstructions: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    // Add additional styling as needed
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Add additional styling as needed
  },
  codeInput: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    // Add additional styling as needed
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 20,
    // Add additional styling as needed
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    // Add additional styling as needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    // Add additional styling as needed
  },
});

export default CodeVerification;
