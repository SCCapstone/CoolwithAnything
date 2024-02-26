import React from "react";
// import { useState } from "react";
// import { ThemeProvider } from "styled-components/native";
// import { GlobalStyles } from "./components/GlobalStyles";
// import Toggle from "./components/ThemeToggle.js";
import { UserProvider } from "./services/UserContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
// import { WorkoutsProvider } from './services/WorkoutsContext';
import { MealsProvider } from "./services/MealsContext.js";
import MainNavigator from "./navigators/MainNavigator";
<<<<<<< HEAD
// import { styles } from "./styles/ThemesStyle.js";
// import UseDarkMode from "./components/UseDarkMode";
=======
import { styles } from "./styles/ThemesStyle.js";
import UseDarkMode from "./components/UseDarkMode";
import { WorkoutsProvider } from "./services/WorkoutsContext.js";
import { MealsProvider } from "./services/MealsContext.js";
>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a

export default function App() {
  // const [theme, themeToggler, mountedComponent] = UseDarkMode();
  // const themeMode = theme === "light" ? styles.lightTheme : styles.darkTheme;
  // if (!mountedComponent) return null;

  return (
    <ActionSheetProvider>
      <UserProvider>
        <MealsProvider>
<<<<<<< HEAD
          {/* <WorkoutsProvider> */}
            {/* <ThemeProvider theme={themeMode}>
              <>
                <GlobalStyles />
                <Toggle theme={theme} toggleTheme={themeToggler} /> */}
                <MainNavigator />
              {/* </> */}
            {/* </ThemeProvider> */}
          {/* </WorkoutsProvider> */}
        </MealsProvider>
=======
          <WorkoutsProvider>
            <MainNavigator />
          </WorkoutsProvider>
        </MealsProvider>        
>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a
      </UserProvider>
    </ActionSheetProvider>
  );
}