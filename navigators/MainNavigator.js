import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigation";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import BiometricScreen from "../screens/BiometricScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import TransactionHistoryScreen from "../screens/TransactionHistoryScreen";
import ToSScreen from "../screens/ToSScreen";
import QRScreen from "../screens/QRScreen";
import PaymentMethodsScreen from "../screens/PaymentMethodsScreen";
import AddPaymentMethodsScreen from "../screens/AddPaymentMethodsScreen";
import EditPaymentMethodsScreen from "../screens/EditPaymentMethodsScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator } from "react-native";
import LoadingScreen from "../screens/LoadingScreen";
import AdminPanel from "../screens/AdminPanel";

const Stack = createNativeStackNavigator();

function MainNavigator({ isLoggedIn }) {
  const [initialRouteName, setInitialRouteName] = useState(null);
  const [loading, setLoading] = useState(true);
  const userIDRef = useRef(null);
  const navigationRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, navigate to Home screen
        setInitialRouteName("Home");
        console.log("User logged in: ", !!user);
        console.log("User ID: ", user.uid);
        userIDRef.current = user.uid;
      } else {
        // If user is not logged in, navigate to Login screen
        setInitialRouteName("Login");
        console.log("No user ID found!");
        userIDRef.current = null;
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  // Show loading indicator while checking auth state
  if ( loading || initialRouteName === null) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <NavigationContainer ref={navigationRef} onReady={() => {
      // Navigate to the appropriate screen based on auth state
      if (userIDRef.current !== null) {
        navigationRef.current?.navigate("Home", { userID: userIDRef.current });
        console.log("Navigating to Home screen");
        console.log("User ID (in navigation): ", userIDRef.current);
      } else {
        navigationRef.current?.navigate("Login");
      }
    }}>
      <Stack.Navigator initialRouteName="initialRouteName">
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditTaskScreen"
          component={EditTaskScreen}
          options={{ title: 'Edit Task' }}
        />
        <Stack.Screen 
          name="TaskDetailScreen" 
          component={TaskDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Biometric"
          component={BiometricScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToS"
          component={ToSScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QR"
          component={QRScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPaymentMethods"
          component={AddPaymentMethodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPaymentMethods"
          component={EditPaymentMethodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "AdminPanel"
          component = {AdminPanel}
          options = {{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
