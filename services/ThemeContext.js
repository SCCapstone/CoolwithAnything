import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { updateUserThemePreference } from './AuthAPI';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchThemePreference = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.log("No user logged in");
        return;
      }
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.themePreference) {
          setTheme(userData.themePreference);
        }
      } else {
        console.log("No user data found in Firestore");
      }
    };

    fetchThemePreference();
  }, [auth.currentUser?.uid]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    const userId = auth.currentUser?.uid;
    if (userId) {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          themePreference: newTheme,
        });
        console.log("Theme preference updated successfully in Firestore");
      } catch (error) {
        console.error("Error updating theme preference in Firestore:", error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
