import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import EmailInput from "../components/EmailInput"; // Reused component
import PasswordInput from "../components/PasswordInput"; // Reused component
import ConfirmPasswordInput from "../components/ConfirmPasswordInput"; // New component, similar to PasswordInput
import TextInputField from "../components/TextInputField";
import DateOfBirthInput from "../components/DateOfBirthInput";
import RegisterButton from "../components/RegisterButton"; // Reused component
import styles from "../styles/RegisterScreenStyle"; // New style sheet
import { registerUser } from "../services/AuthAPI"; // New function, similar to loginUser

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const bubbleSize = width * 0.7;
const bubblePosition = { top: -height * 0.175, left: width * 0.1 };

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
        navigation.reset({
          index: 0,
          routes: [{ name: "Biometric", params: { userId: user.uid } }],
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Signup Failed",
        error.message || "An error occurred during signup"
      );
    }
  };

  const isValidDate = (dateString) => {
    const regEx = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d\d$/;
    if (!dateString.match(regEx)) return false; // Invalid format

    // Extract the month, day, and year from the dateString
    const parts = dateString.split("-");
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[0], 10) - 1; // JS months are 0-based
    const day = parseInt(parts[1], 10);

    // Create a date with extracted parts
    const date = new Date(year, month, day);

    // Check if the date components in the object match the input
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return false; // The date is not valid
    }

    return true; // The date is valid
  };

  const validateAndSubmit = async () => {
    if (!isValidDate(dateOfBirth)) {
      Alert.alert(
        "Invalid Birthday",
        "Please enter a valid birthday in MM-DD-YYYY format."
      );
      return;
    }
    handleRegister();
  };
  // Handle the hardware back button on Android devices
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    // Add the back press event listener
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Remove the event listener when the component is unmounted or no longer focused
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBubble}>
          <View
            style={[
              styles.bubble,
              {
                width: bubbleSize,
                height: bubbleSize,
                borderRadius: bubbleSize / 2,
                ...bubblePosition,
              },
            ]}
          />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtittle}>Sign up to continue</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.inputFields}>
            <EmailInput value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.inputFields}>
            <TextInputField
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
          </View>
          <View style={styles.inputFields}>
            <TextInputField
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
          </View>
          <View style={styles.inputFields}>
            <TextInputField
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputFields}>
            <DateOfBirthInput
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </View>
          <View style={styles.inputFields}>
            <PasswordInput value={password} onChangeText={setPassword} />
          </View>
          <View style={styles.inputFields}>
            <ConfirmPasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <RegisterButton onPress={validateAndSubmit} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.backToLogin}>Back To Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
