import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
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
  subtittle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "yellow",
  },
  subtittle2: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
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
  inputFieldsCaption: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    textAlign: "center",
    color: "#57BCBE",
  },
});
export default styles;
