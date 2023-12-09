import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NewPassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSetPassword = () => {
    // Add your password setting logic here
    navigation.navigate('NewPassConfirm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>One more thing!</Text>
        <Text style={styles.subHeaderText}>One more step to finish!</Text>
      </View>
      <View style={styles.content}>
        {/* <Image source={require('path-to-key-icon.png')} style={styles.icon} /> */}
        <Text style={styles.instructions}>New Credentials</Text>
        <Text style={styles.subInstructions}>Enter your new password here and you are all set!</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
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
    padding: 20,
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
    width: '100%',
    alignItems: 'center',
    // Add additional styling as needed
  },
  icon: {
    // Define size and styling for key icon
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

export default NewPassword;
