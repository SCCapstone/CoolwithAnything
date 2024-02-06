import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
    height: 50,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  button: {
    width: 50,
    height: "100%",
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: "50%",
    height: "50%",
    tintColor: "#F3F4F8",
  },
});

export default styles;
