import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import LoginButton from "../components/LoginButton";
import styles from "../styles/LoginScreenStyle";
import { loginUser } from "../services/AuthAPI";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Calculate sizes and positions based on screen size
const bubbleSize1 = width * 0.7;
const bubbleSize2 = width * 0.4;
const bubbleSize3 = width * 0.35;
const logoSize = width * 0.6;

const bubblePosition1 = { top: -height * 0.24, left: -width * 0.21 };
const bubblePosition2 = { top: -height * 0.2, left: width * 0.35 };
const bubblePosition3 = { top: -height * 0.25, right: -width * 0.1 };
const titlePosition = { top: -height * 0.1, left: width * 0 };

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
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Home", params: { userId: user.uid } }],
              }),
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
        <View style={styles.topBubble}>
          <View
            style={[
              styles.bubble1,
              {
                width: bubbleSize1,
                height: bubbleSize1,
                borderRadius: bubbleSize1 / 2,
                ...bubblePosition1,
              },
            ]}
          />
          <View
            style={[
              styles.bubble2,
              {
                width: bubbleSize2,
                height: bubbleSize2,
                borderRadius: bubbleSize2 / 2,
                ...bubblePosition2,
              },
            ]}
          />
          <View
            style={[
              styles.bubble3,
              {
                width: bubbleSize3,
                height: bubbleSize3,
                borderRadius: bubbleSize3 / 2,
                ...bubblePosition3,
              },
            ]}
          />
          <Text
            style={[
              styles.title,
              {
                ...titlePosition,
              },
            ]}
          >
            Welcome
          </Text>
        </View>
        <View
          style={[styles.logoContainer, { width: logoSize, height: logoSize }]}
        >
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Image
            source={require("../assets/blurredEdge.png")}
            style={[styles.blurredEdge, { width: logoSize, height: logoSize }]}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.passwordBox}>
            <PasswordInput value={password} onChangeText={setPassword} />
          </View>
          <View style={styles.emailBox}>
            <EmailInput
              style={styles.emailBox}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.buttonBox}>
            <LoginButton onPress={handleLogin} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot Password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.topBubble, styles.invertContainer]}>
          <View
            style={[
              styles.bubble1,
              styles.invertChild,
              {
                width: bubbleSize1,
                height: bubbleSize1,
                borderRadius: bubbleSize1 / 2,
                ...bubblePosition1,
              },
            ]}
          />
          <View
            style={[
              styles.bubble2,
              styles.invertChild,
              {
                width: bubbleSize2,
                height: bubbleSize2,
                borderRadius: bubbleSize2 / 2,
                ...bubblePosition2,
              },
            ]}
          />
          <View
            style={[
              styles.bubble3,
              styles.invertChild,
              {
                width: bubbleSize3,
                height: bubbleSize3,
                borderRadius: bubbleSize3 / 2,
                ...bubblePosition3,
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
