import React from "react";
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

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
         <Stack.Screen
          name="Login"
          component={LoginScreen}
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
          name="Home"
          component={TabNavigator}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
