import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff", // or use any other color for the background
    },
    topBackground: {
      flex: 1,
      position: "absolute",
      width: "103%",
      left: -5,
      top: -70,
    },
    botBackground: {
      flex: 1,
      position: "absolute",
      width: "105%",
      top: "68%",
    },
  
    headerContainer: {
      position: "absolute",
      marginTop: "10%",
      marginLeft: "5%",
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
    },
    logoContainer: {
      flex: 1,
      position: "absolute",
      alignSelf: "center",
      justifyContent: "center",
      width: "100%",
      height: "65%",
      top: "10%",
    },
    signInText: {
      fontSize: 20,
      color: "#F9FE00",
    },
  
    inputWrapper: {
      // Username and password container
      flex: 1,
      position: "absolute",
      alignItems: "left",
      left: -25,
      width: "65%",
      bottom: "40%",
      color: "#fff",
    },
    passwordContainer: {
      flex: 0.5,
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F3F0F0",
      borderWidth: 1,
      borderColor: "#F3F0F0",
      borderRadius: 50,
      paddingLeft: 35,
      marginVertical: 0,
      elevation: 10,
      top: 54,
    },
    usernameContainer: {
      flex: 0.5,
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F3F0F0",
      borderWidth: 1,
      borderColor: "#F3F0F0",
      borderRadius: 50,
      paddingLeft: 35,
      marginVertical: 0,
      elevation: 8,
    },
  
    input: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      color: "#333",
    },
    inputIcon: {
      marginRight: 10,
      color: "#016E8F",
    },
    button: {
      position: "absolute", // Set the button near the input fields
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: "#03ABB1", // Button color
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-end",
      marginTop: 0,
      marginBottom: 0,
      top: 30,
      left: 245,
    },
    registerAndForgotPasswordContainer: {
      position: "absolute",
      alignItems: "left",
      bottom: "20%",
      left: -25,
      width: "65%",
    },
  
    forgotPasswordText: {
      color: "#56CCF2",
      alignSelf: "flex-start",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 50,
    },
  });  

export default styles;