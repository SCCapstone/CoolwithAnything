import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  cardContainer: {
    backgroundColor: "white",
    borderColor: "black",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
  },
  modalContent: {
    padding: 16,
  },
  closeButton1: {
    color: "blue",
    fontSize: 16,
    padding: 16,
  },
  closeButton2: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    width: 70,
    padding: 8,
    marginLeft: 330,
  },
  addButton: {
    color: "blue",
    fontSize: 16,
    padding: 16,
  },
  container: {
    flexDirection: "column",
  },
  wrapper: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 8,
    margin: 8,
    height: 130,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  imageBiceps: {
    height: 210,
    width: 400,
    flex: 1,
  },
  imageGlutes: {
    height: 170,
    width: 400,
    flex: 1,
  },
  imageAbs: {
    height: 140,
    width: 400,
    flex: 1,
  },
  imageLegs: {
    height: 170,
    width: 400,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 16,
    fontWeight: "bold",
  }
});

export default styles;
