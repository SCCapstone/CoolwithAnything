import { StyleSheet } from 'react-native';

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
  showAllButton: {
    backgroundColor: "white",
    borderColor: "black",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    height: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButton: {
    color: "blue",
    fontSize: 16,
    padding: 16,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    marginLeft: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "#F3F4F8",
  },
});

export default styles;