import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, now fetch the theme preference
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then(docSnap => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.themePreference) {
              setTheme(userData.themePreference);
              console.log("Theme successfully loaded");
            }
          } else {
            console.log("No user data found in Firestore");
          }
        }).catch(error => {
          console.error("Error fetching user data:", error);
        });
      } else {
        console.log("No user logged in");
      }
    });
  
    // Don't forget to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  

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
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
