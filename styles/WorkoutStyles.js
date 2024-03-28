import { StyleSheet } from "react-native";

const imageStyles = (aspectRatio) => ({
  width: 400,
  flex: 1,
  aspectRatio: aspectRatio,
});

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
  },
  modalContent: {
    padding: 16,
    height: 10,
  },
  closeButton1: {
    color: "blue",
    fontSize: 16,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  closeButton2: {
    color: "red",
    fontSize: 20,
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
    flex: 1,
  },
  imageGlutes: {
    height: 170,

    flex: 1,
  },
  imageAbs: {
    height: 140,

    flex: 1,
  },
  imageLegs: {
    height: 170,

    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 16,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -2, height: 1 }, // Shadow position
    textShadowRadius: 1, // Blur radius
  }
});

export default styles;