// Import the required Firebase and AsyncStorage modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe-_ENL-QmW__8BrE4beO4BLuKV7XPYUM",
  authDomain: "schedulerx-3bf1a.firebaseapp.com",
  projectId: "schedulerx-3bf1a",
  storageBucket: "schedulerx-3bf1a.appspot.com",
  messagingSenderId: "1088673802858",
  appId: "1:1088673802858:android:2cc8a514d360b74b103813",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get auth instance with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Get Firestore instance
const db = getFirestore(app);

// Helper functions for AsyncStorage operations
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing data", e);
    throw e;
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving data", e);
    throw e;
  }
};

// Authentication and Firestore functions
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await storeData("userToken", userCredential.user.refreshToken);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (
  email,
  password,
  firstName,
  lastName,
  phone_number,
  date_of_birth
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      phone_number,
      date_of_birth,
    });
    await storeData("userToken", userCredential.user.refreshToken);
    return user;
  } catch (error) {
    console.error("Something wrong", error);
    throw error;
  }
};

export const updateBiometrics = async (
  userId,
  height,
  weight,
  fitnessLevel,
  fitnessGoal
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      height,
      weight,
      fitnessLevel,
      fitnessGoal,
    });
    await storeData("userBiometrics", {
      height,
      weight,
      fitnessLevel,
      fitnessGoal,
    });
    return { status: "success" };
  } catch (error) {
    console.error("Something wrong", error);
    throw error;
  }
};

// Export the AsyncStorage getData function if needed elsewhere
export { getData };
