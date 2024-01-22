import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import LoginButton from "../components/LoginButton";
import styles from "../styles/LoginScreenStyle";
import { loginUser } from "../services/AuthAPI";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.", [
        { text: "OK" },
      ]);
      return;
    }
    try {
      const user = await loginUser(email, password);
      if (user) {
        // Handle successful login
        Alert.alert("Login Successful", "Logged in successfully.");
        navigation.navigate("Home"); // Pass user data to Home screen if needed
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Login Error",
        error.message || "An error occurred during login."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <EmailInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />
        <LoginButton onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
