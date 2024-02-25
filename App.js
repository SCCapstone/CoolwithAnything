import React from "react";
// import { useState } from "react";
import { ThemeProvider } from "styled-components/native";
// import { GlobalStyles } from "./components/GlobalStyles";
// import Toggle from "./components/ThemeToggle.js";
import { UserProvider } from "./services/UserContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import MainNavigator from "./navigators/MainNavigator";
// import { lightTheme, darkTheme } from "./styles/ThemesStyle.js";
//import UseDarkMode from './components/UseDarkMode';

export default function App() {
  // const [theme, themeToggler, mountedComponent] = useState("light");
  // const themeMode = theme === "light" ? lightTheme : darkTheme;
  // if (!mountedComponent) return null;

  return (
    // <ThemeProvider theme={themeMode}>
    //   <>
    //     <GlobalStyles />
    //       <Toggle theme={theme} toggleTheme={themeToggler} />
          <ActionSheetProvider>
            <UserProvider>
              <MainNavigator />
            </UserProvider>
          </ActionSheetProvider>
    //   </>
    // </ThemeProvider>
  );
}
