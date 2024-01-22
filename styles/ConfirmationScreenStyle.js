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
      color: '#5cb85c', // A shade of green for success
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
      backgroundColor: '#5cb85c', // Button color that stands out
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default styles;