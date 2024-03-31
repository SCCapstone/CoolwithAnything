import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android",
    backgroundColor: "white",
  },
  topBubble: {
    height: "25%",
  },
  bubble: {
    position: "absolute",
    backgroundColor: "#408D8E",
    transform: [{ scaleX: 1.9 }],
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 20,
  },
  subtittle:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "yellow",
  },
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
  scrollView: {
    padding: 10,
    justifyContent: "center",
  },
  inputFields: {
    height: "wrap-content",
    width: "100%",
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#F3F0F0",
    marginBottom: 20,
  },
  backToLogin: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    textAlign: "center",
    color: "#57BCBE",
  },

  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
});
export default styles;
