import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: "100%",
  },
  pressable: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
export default styles;
