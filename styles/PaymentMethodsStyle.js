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
    content: {
      flex: 1,
      marginTop: 85,
  
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: '600',
    },
    addPayment: {
      marginTop: 15,
    },
    plusStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    paymentsContainer: {
      borderWidth: 1,
      borderColor: '#ddd', 
      padding: 15, 
      borderRadius: 5,
      backgroundColor: '#24A0ED',
      shadowColor: '#000', // Shadow color
      shadowOffset: { width: 0, height: 2 }, // Shadow offset
      shadowOpacity: 0.1, // Shadow opacity
      shadowRadius: 3.84, // Shadow radius
      elevation: 5, // Elevation for Android
      marginBottom: 10, 
      alignItems: 'center', 
      justifyContent: 'center',
      width: 300,
    },
    paymentMethod: {
      fontSize: 24,
      marginVertical: 8,
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default styles;