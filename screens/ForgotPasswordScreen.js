import React, { useState } from 'react';
import {
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import EmailInput from "../components/EmailInput"; // Reused component
import LoginButton from '../components/LoginButton'; // Reused component
import styles from '../styles/RegisterScreenStyle'; // Style sheet
import { resetPassword } from '../services/AuthAPI'; // Import the function

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const sendResetEmail = () => {
    resetPassword(email)
      .then(response => {
        Alert.alert("Success", "Check your email to reset your password.");
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <EmailInput value={email} onChangeText={setEmail} />
        <LoginButton onPress={sendResetEmail} title="Reset Password" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Back To Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
