import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff', // Assuming a light theme
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#408D8E', // A shade of green for success
      marginBottom: 10,
    },
    subHeader: {
      fontSize: 24,
      color: '#333', // Dark text for contrast
      marginBottom: 20,
    },
    congratulation: {
      fontSize: 16,
      color: '#666', // Lighter text for the body
      textAlign: 'center',
      marginBottom: 30,
    },
    button: {
      backgroundColor: "#57BCBE",
      padding: 15,
      margin: 10,
      borderRadius: 30,
      width: "50%",
      alignSelf: "center",
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
  });

export default styles;