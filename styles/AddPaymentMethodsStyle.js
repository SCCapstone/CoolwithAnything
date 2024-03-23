import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5', 
      position: 'relative', 
    },
    header: {
      flexDirection: 'row',
      height: 80,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#3e5e60',
      paddingHorizontal: 20,
    },
    backText: {
      marginTop: 30,
      fontSize: 24,
      fontWeight: '700',
      color: 'white',
    },
    contentContainer: {
      marginTop: 25,
    },
    titleContainer: {
      alignItems: 'center',
      marginTop: 85,
    },
    title: {
      marginTop: 30,
      color: 'white',
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    saveButtonContainer: {
      flex: 1,
      alignItems: 'center',
    },
    deleteButtonContainer: {
      flex: 1,
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: '#5da8af',
      padding: 10,
      borderRadius: 10,
      height: 60,
      justifyContent: 'center',
    },
    deleteButton: {
      backgroundColor: '#c60e0b',
      padding: 10,
      borderRadius: 10,
      height: 60,
      justifyContent: 'center',
    },
    saveButtonText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    deleteButtonText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles;