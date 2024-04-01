import React ,{ useEffect }from "react";
import { View, Text, TouchableOpacity, BackHandler, Alert, } from "react-native";
import styles from "../styles/ConfirmationScreenStyle";

const ConfirmationScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Home</Text>
      <Text style={styles.subHeader}>You're a part of ours now!</Text>

      <Text style={styles.congratulation}>
        Congratulations! You have successfully signed up. You can go back to
        login now! Welcome home!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")} // Replace with your login screen's navigation
      >
        <Text style={styles.buttonText}>Back To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;
