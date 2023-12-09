import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/LoginScreenStyles";
import { loginUser } from "../ApiService"; // Make sure this path is correct

export default function LoginScreen({ navigation }) {

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
        navigation.navigate("Home", { user: user }); // Pass user data to Home screen if needed
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Top Background Image */}
        <View style={styles.topBackground}>
          <Image
            source={require("../photos/top.png")}
            style={styles.topBackground}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Background Image */}
        <View style={styles.botBackground}>
          <Image
            source={require("../photos/bottom.png")}
            style={styles.botBackground}
            resizeMode="contain"
          />
        </View>

        {/* Header Container */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.signInText}>Sign in to continue</Text>
        </View>

        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../photos/logo2.png")}
            style={styles.logoContainer}
            resizeMode="contain"
          />
        </View>

        {/* Input Wrapper */}
        <View style={styles.inputWrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            keyboardVerticalOffset={100}
          >
            {/* Email Input */}
            <View style={styles.usernameContainer}>
              <Icon
                name="envelope"
                size={28}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <View style={styles.passwordContainer}>
              <Icon
                name="lock"
                size={40}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Login Button */}
            <View>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Icon name="arrow-right" size={26} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>

        {/* Register and Forgot Password Container */}
        <View style={styles.registerAndForgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgotPasswordText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
