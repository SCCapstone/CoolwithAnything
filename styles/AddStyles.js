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
});
  
export default getStyles;