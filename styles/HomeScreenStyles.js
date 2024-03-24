import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#262626' : "white",
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
});

export default getStyles;