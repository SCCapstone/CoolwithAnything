import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/SignUpScreenStyle";
import { registerUser } from "../ApiService";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !name || !phone || !date_of_birth) {
      Alert.alert("Missing Fields", "Please enter all fields.", [
        { text: "OK" },
      ]);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Please check your passwords.", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      const user = await registerUser(
        email,
        password,
        name,
        phone,
        date_of_birth
      );

      if (user) {
        Alert.alert(
          "Signup Successful",
          "You have been signed up successfully."
        );
        navigation.navigate("Biometric", { userId: user.uid });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Signup Failed", error.message || "An error occurred during signup");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.signUpText}>Sign up to continue</Text>

      <View style={styles.form}>
        {/* The username field is removed since it's not used with Firebase authentication */}
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone"
          keyboardType="phone-pad"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Date of Birth"
          style={styles.input}
          value={date_of_birth}
          onChangeText={setDateOfBirth}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.goBack()} // Replace with your actual login navigation
        >
          <Text style={styles.loginButtonText}>
            Already had an account? Back to Login!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
