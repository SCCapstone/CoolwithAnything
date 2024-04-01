import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  topBubble: {
    height: "10%",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    position: "absolute",
  },
  bubble1: {
    position: "absolute",
    backgroundColor: "#408D8E",
    transform: [{ scaleX: 0.9 }],
  },
  bubble2: {
    position: "absolute",
    backgroundColor: "#408D8E",
    transform: [{ scaleX: 1.3 }],
  },
  bubble3: {
    position: "absolute",
    backgroundColor: "#408D8E",
    transform: [{ scaleX: 1 }],
  },
  invertContainer: {
    transform: [{ scaleY: -1 }, { scaleX: -1 }],
  },
  invertChild: {
    transform: [{ scaleY: -1 }, { scaleX: -1 }],
  },
  textContainer: {
    height: "6%",
    alignSelf: "left",
    marginTop: 40,
  },
  registerText: {
    textAlign: "left",
    color: "#57BCBE",
    width: 210,
  },
  forgotPasswordText: {
    textAlign: "left",
    color: "#57BCBE",
    marginTop: 10,
    width: 210,
  },
  inputContainer: {
    flexDirection: "column",
    position: "relative",
    marginLeft: -20,
    padding: 10,
    width: "60%",
    height: 100,
  },
  emailBox: {
    position: "absolute",
    height: "wrap-content",
    width: "95%",
    borderTopRightRadius: 30,
    top: 10,
    elevation: 15,
    backgroundColor: "#F3F0F0",
  },
  passwordBox: {
    position: "absolute",
    height: "wrap-content",
    width: "95%",
    borderBottomRightRadius: 30,
    top: 60,
    backgroundColor: "#F3F0F0",
    elevation: 15,
  },
  buttonBox: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "45%",
    left: "88%"
  },

  logoContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 200,
    alignSelf: "center",
    opacity: 1,
  },
  blurredEdge: {
    position: "absolute",
    height: "120%",
    width: "120%",
    alignSelf: "center",
    opacity: 0.5,
  },
});

export default styles;
