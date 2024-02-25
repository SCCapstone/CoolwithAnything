// Import the required Firebase and AsyncStorage modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteDoc } from "firebase/firestore";

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

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // You can return a success message or handle it differently
    return { status: "success", message: "Reset password email sent." };
  } catch (error) {
    console.error("Error sending reset password email", error);
    throw error;
  }
};

export const deleteTask = async (userId, taskId) => {
  try {
    const taskDocRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskDocRef);
    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};

export const updateTaskForUser = async (userId, taskId, updatedData) => {
 
  if (!userId || !taskId) {
    const error = "userId or taskId is not provided";
    console.error(error);
    throw new Error(error);
  }
  try {
    console.log("Updating task with data:", updatedData);

    if (!userId || !taskId) {
      console.error("userId or taskId is not provided");
      return; // Exit the function if no userId or taskId
    }

    if (!updatedData || typeof updatedData !== 'object') {
      console.error("Invalid updatedData:", updatedData);
      return; // Exit the function if updatedData is invalid
    }

    const taskDocRef = doc(db, "users", userId, "tasks", taskId);
    await updateDoc(taskDocRef, updatedData);
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
    // Log the error and throw it to be handled
    throw new Error(error.message || "Unknown error occurred while updating task");
  }
};

export const saveTaskForUser = async (userId, taskData) => {
  try {
    // Create a reference to user's tasks subcollection
    const userTasksRef = collection(db, "users", userId, "tasks");

    // Add the task data to user's tasks subcollection
    const docRef = await addDoc(userTasksRef, taskData);
    console.log("Task document written with ID: ", docRef.id);
    return { status: "success", docId: docRef.id };
  } catch (error) {
    console.error("Error adding task document: ", error);
    throw error;
  }
};

export const fetchTasksForUser = async (userId) => {
  try {
    const userTasksRef = collection(db, "users", userId, "tasks");
    const querySnapshot = await getDocs(userTasksRef);
    let tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    console.log("Tasks fetched successfully:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};
// Export the AsyncStorage getData function if needed elsewhere
export { getData };
