import { StyleSheet } from "react-native";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? "#262626" : "white",
      },
    title: {
      color: theme === "dark" ? "white" : "black",
      fontWeight: "700",
      fontSize: 24,
      paddingLeft: 20,
      marginTop: 20,
    },
    taskItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      marginVertical: 8,
      backgroundColor: "#f9f9f9",
      borderRadius: 5,
    },
    taskItemText: {
      fontSize: 16,
    },
    deleteButton: {
      padding: 6,
      backgroundColor: "red",
      borderRadius: 4,
    },
    deleteButtonText: {
      color: "#fff",
      fontSize: 14,
    },
    BirthdayCelebration: {
      fontSize: 30,
      alignSelf: "center",
      color: theme === "dark" ? "white" : "black",
    },
  });

export default getStyles;
