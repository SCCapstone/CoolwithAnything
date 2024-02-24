import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5', 
      position: 'relative', 
    },
    header: {
      position: 'absolute', 
      top: 45, 
      left: 20, 
      zIndex: 1, 
    },
    backText: {
      fontSize: 18,
      fontWeight: '700',
    },
    contentContainer: {
      marginTop: 25,
    },
    titleContainer: {
      alignItems: 'center',
      marginTop: 85,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    label: {
      marginRight: 10, // Add some margin to the right of the label for spacing
      fontWeight: 'bold',
      marginTop: 1,
      marginLeft: 20,
    },
    input: {
      height: 50,
      margin: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      textAlignVertical: 'top', // Ensures text starts from the top
      backgroundColor: '#fff',
      borderRadius: 5,
      width: '80%',
    },
    saveButtonContainer: {
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 10,
      width: '60%',
      height: 60,
      justifyContent: 'center',
    },
    saveButtonText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });

  export default styles;