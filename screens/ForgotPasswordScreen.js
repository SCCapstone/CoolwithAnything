import React, { useState } from "react";
import {
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from "react-native";
import EmailInput from "../components/EmailInput"; // Reused component
import LoginButton from "../components/LoginButton"; // Reused component
import styles from "../styles/RegisterScreenStyle"; // Style sheet
import { resetPassword } from "../services/AuthAPI"; // Import the function
import { FontAwesome5 } from "@expo/vector-icons";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const bubbleSize = width * 0.7;
const bubblePosition = { top: -height * 0.12, left: width * 0.1 };

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const sendResetEmail = () => {
    resetPassword(email)
      .then((response) => {
        Alert.alert("Success", "Check your email to reset your password.");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

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
          <Text style={[styles.title, { marginTop: 40 }]}>No Worry</Text>
          <Text style={styles.subtittle}>We are here to help you reset it</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{ alignSelf: "center", marginBottom: 10 }}>
            <FontAwesome5 name="unlock-alt" size={200} color="#57BCBE" />
          </View>
          <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 30, fontWeight: "bold" }}>
            Forgot your password?
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 18 }}>
            Enter your email to reset your password
          </Text>
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputFields,
                { width: "70%", alignSelf: "center", marginRight: 40},
              ]}
            >
              <EmailInput value={email} onChangeText={setEmail} />
            </View>
            <View style={{position: "absolute", right: 45}}>
              <LoginButton onPress={sendResetEmail} title="Reset Password" />
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.backToLogin}>Back To Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
