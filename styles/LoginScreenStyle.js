import { StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
});

export default styles;
