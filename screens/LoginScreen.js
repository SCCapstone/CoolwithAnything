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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.", [
        { text: "OK" },
      ]);
      return;
    }
    try {
      const user = await loginUser(email, password);
      if (user) {
        // Handle successful login
        Alert.alert("Login Successful", "You are logged in.", [
          {
            text: "OK",
            onPress: () => navigation.replace("Home", { userID: user.uid }),
          },
        ]);
      } else {
        throw new Error("Failed to log in.");
      }
    } catch (error) {
      console.error(error);
      // Ensure that error messages are user-friendly
      Alert.alert(
        "Login Error",
        error.message || "Failed to log in. Please try again later."
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
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
