import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/SignUpScreenStyle";
import { registerUser } from "../ApiService";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setdate_of_birth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password || !email || !name || !phone || !date_of_birth) {
      Alert.alert("Missing Fields", "Please enter all fields.", [
        { text: "OK" },
      ]);
      return;
    }
    try {
      const { status, data } = await registerUser(
        username,
        password,
        email,
        name,
        phone,
        date_of_birth
      );

      if (status === 201) {
        // Handle successful signup
        Alert.alert(
          "Signup Successful",
          data.message || "Signed up successfully."
        );
        navigation.navigate("Biometric", { username: username });
      } else {
        // Handle errors
        Alert.alert("Signup Failed", data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Signup Failed", "An error occurred during signup");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.signUpText}>Sign up to continue</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
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
          onChangeText={setdate_of_birth}
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
