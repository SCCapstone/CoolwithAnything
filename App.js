import React from "react";
import { useState } from "react";
// import { ThemeProvider } from "styled-components/native";
// import { GlobalStyles } from "./components/GlobalStyles";
// import Toggle from "./components/ThemeToggle.js";
import { UserProvider } from "./services/UserContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import MainNavigator from "./navigators/MainNavigator";
// import { styles } from "./styles/ThemesStyle.js";
// import UseDarkMode from "./components/UseDarkMode";

export default function App() {
  // const [theme, themeToggler, mountedComponent] = UseDarkMode();
  // const themeMode = theme === "light" ? styles.lightTheme : styles.darkTheme;
  // if (!mountedComponent) return null;

  return (
    <ActionSheetProvider>
      <UserProvider>
        {/* <ThemeProvider theme={themeMode}>
          <>
            <GlobalStyles />
            <Toggle theme={theme} toggleTheme={themeToggler} /> */}
            <MainNavigator />
          {/* </> */}
        {/* </ThemeProvider> */}
      </UserProvider>
    </ActionSheetProvider>
  );
}
