import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from '../styles/LoginScreenStyles';
import { loginUser } from '../ApiService';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(
        "Missing Fields",
        "Please enter both username and password.",
        [{ text: "OK" }]
      );
      return;
    }
    try {
      const userData = await loginUser(username, password);
  
      if (userData) {
        // Handle successful login
        Alert.alert("Login Successful", userData.message || "Logged in successfully.");
        navigation.navigate("Home");
      } else {
        // Handle login failure
        Alert.alert("Login Failed", userData.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
      // The error message can be more specific based on the error details
      Alert.alert("Login Error", "An error occurred during login.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topBackground}>
          <Image
            source={require("../photos/top.png")}
            style={styles.topBackground}
            resizeMode="contain"
          />
        </View>
        <View style={styles.botBackground}>
          <Image
            source={require("../photos/bottom.png")}
            style={styles.botBackground}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.signInText}>Sign in to continue</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../photos/logo2.png")}
            style={styles.logoContainer}
            resizeMode="contain"
          />
        </View>
        <View style={styles.inputWrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            keyboardVerticalOffset={100}
          >
            <View style={styles.passwordContainer}>
              <Icon
                name="lock"
                size={30}
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

            <View style={styles.usernameContainer}>
              <Icon
                name="user"
                size={30}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Icon name="arrow-right" size={26} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.registerAndForgotPasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
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

