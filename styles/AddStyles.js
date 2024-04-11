import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#262626' : "white",
    },
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#262626' : "white",
      padding: 10,
    },
    addButton: {
      alignItems: "center",
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: "blue",
    },
    input: {
      height: 50,
      margin: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'grey',
      padding: 10,
      textAlignVertical: 'top',
      color: theme === 'dark' ? 'white' : 'black',
      borderRadius: 5,
      width: '80%',
    },
    totalCalories: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    createTextContainer: {
      flexDirection: 'row',
      height: 80,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#3e5e60',
      paddingHorizontal: 20,
    },
    createText: {
      marginTop: 30,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 24,
    },
    backButton: {
      fontSize: 24, 
      fontWeight: "900", 
      marginTop: 30, 
      color: 'white',
    },
    priorityText: {
      color: theme === "dark" ? "white" : "black",
      fontSize: 16,
    },
    priorityPicker:{
        borderWidth: 1,
        borderColor: "lightgray",
        height: "wrap-content",
        borderRadius: 10,
        width: 160,
        backgroundColor: theme === "dark" ? "white" : "white",
    }
});
  
export default getStyles;