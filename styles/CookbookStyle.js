import { StyleSheet, Dimensions } from "react-native";
const{width, height} = Dimensions.get("window");

const getStyles = (theme) => StyleSheet.create({

  //------CookbookScreen.js-----//
  screen: {
    flex: 1,
    backgroundColor: theme === 'light' ? 'white' : "#262626",
  },
  cookbookTextContainer: {
    height: 80,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
  },
  cookbookText: {
    marginTop: 36,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#262626' : "white",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white'
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
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
    color: theme === 'dark' ? 'white' : 'black',
  },
  //----- BrowseMeals.js -----//
  typeContainer: {
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