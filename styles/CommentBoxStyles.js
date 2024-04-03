import { StyleSheet } from "react-native";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    commentInput: {
      backgroundColor: "white",
      color: theme === "dark" ? "white" : "black",
      borderWidth: 1,
      borderColor: theme === "dark" ? "white" : "black",
      borderRadius: 10,
      fontSize: 16,
      height: 100,
      textAlignVertical: "top",
      padding: 15,
    },
  });

export default getStyles;
