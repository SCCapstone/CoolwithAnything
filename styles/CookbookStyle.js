import { StyleSheet, Dimensions } from "react-native";
const{width, height} = Dimensions.get("window");

const getStyles = (theme) => StyleSheet.create({
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
    fontSize: 24,
    fontWeight: "bold",
    color: 'white'
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
    color: "white",
    fontSize: 30,
    marginLeft: 20,
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
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 16,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Choose a color for the outline
    textShadowOffset: { width: -2, height: 1 }, // Shadow position
    textShadowRadius: 1, // Blur radius
  },
  imageSteak: {
    flex: 1,
    width: 400,
    height: 130,
  },
  imageSeafood: {
    flex: 1,
    width: 400,
    height: 130,
  },
  imageVeg: {
    flex: 1,
    width: 400,
    height: 130,
  },
  imageHealthy: {
    flex: 1,
    width: 400,
    height: 130,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#3e5e60',
  },
  browseHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    paddingTop: 29,
  },
});

export default getStyles;