import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    welcomeText: {
      fontSize: 22,
      color: "#000",
      fontWeight: "bold",
    },
    signUpText: {
      fontSize: 18,
      color: "#5f5f5f",
      marginBottom: 20,
    },
    form: {
      width: "80%",
    },
    input: {
      height: 50,
      backgroundColor: "#f2f2f2",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "#00cec9",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    loginButton: {
      marginTop: 15,
    },
    loginButtonText: {
      color: "#00cec9",
      fontSize: 16,
    },
  }); 

export default styles;