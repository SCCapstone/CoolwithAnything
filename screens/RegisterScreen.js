import React, { useState } from "react";
import {
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import EmailInput from "../components/EmailInput"; // Reused component
import PasswordInput from "../components/PasswordInput"; // Reused component
import ConfirmPasswordInput from "../components/ConfirmPasswordInput"; // New component, similar to PasswordInput
import TextInputField from "../components/TextInputField";
import DateOfBirthInput from "../components/DateOfBirthInput";
import RegisterButton from "../components/RegisterButton"; // Reused component
import styles from "../styles/RegisterScreenStyle"; // New style sheet
import { registerUser } from "../services/AuthAPI"; // New function, similar to loginUser

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !dateOfBirth
    ) {
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
        firstName,
        lastName,
        phone,
        dateOfBirth
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
      Alert.alert(
        "Signup Failed",
        error.message || "An error occurred during signup"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <EmailInput value={email} onChangeText={setEmail} />
        <TextInputField
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
        <TextInputField
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
        <TextInputField
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <DateOfBirthInput value={dateOfBirth} onChangeText={setDateOfBirth} />
        <PasswordInput value={password} onChangeText={setPassword} />
        <ConfirmPasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <RegisterButton onPress={handleRegister} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Back To Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
