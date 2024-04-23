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
      color: theme === "dark" ? "white" : "black",
      fontSize: 16,
      maxWidth: '50%',  // Set the maxWidth to a value that works with your layout
      marginRight: 10, // Add some margin to the right of the text
      minWidth: '50%', // Set the minWidth to a value that works with your layout
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      editButton: {
        marginRight: 10,
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 5,
      },
      deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
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
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    moreButton: {
      color: theme === "dark" ? "white" : "black",
      padding: 10,
    },
    taskActions: {
      color: theme === "dark" ? "white" : "black",
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      marginHorizontal: 5,
      borderRadius: 15,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    completeButton: {
      backgroundColor: '#20B2AA',
    },
    editButton: {
      backgroundColor: '#778899',
    },
    deleteButton: {
      backgroundColor: '#FFA07A',
    },
  });

export default getStyles;
