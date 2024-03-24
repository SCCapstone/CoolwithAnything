import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme === 'dark' ? '#262626' : "white",
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
});
  
export default getStyles;