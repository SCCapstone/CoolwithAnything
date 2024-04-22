import { StyleSheet, Dimensions } from "react-native";
const{width, height} = Dimensions.get("window");

const getStyles = (theme) => StyleSheet.create({

  //------CookbookScreen.js-----//
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
  tabBar: {
    flexDirection: "row",
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#5da8af",
  },
  tabText: {
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
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 16,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -2, height: 1 }, // Shadow position
    textShadowRadius: 1, // Blur radius
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
  backButton: {
    fontSize: 24, 
    fontWeight: "900", 
    marginTop: 30, 
    color: 'white',
  },
  backButton1: {
    color: "white",
    fontSize: 30,
    marginLeft: 20,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
  },
  iconContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  mealText: {
    marginTop: 36,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },

  //----- MealCards.js (under browse => api) -----//
  mealCardsTextContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
    paddingHorizontal: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: theme === 'light' ? '#f2f2f2' : "#262626",
  },
  cardContainer: {
    backgroundColor: theme === 'light' ? 'white' : "#4c4c4c",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 26,
    width: "47%", // Adjust width for two-column layout
  },
  cardContent: {
    padding: 20,
  },
  modal: {
    color: theme === 'dark' ? 'white' : 'black',
    fontSize: 16,
    fontWeight: "bold"
  },
  modalName: {
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: theme === 'dark' ? '#262626' : "white",
    height: height * 2.1,
  },
  cardModalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    color: theme === 'dark' ? 'white' : 'black',
  },
  modalContent: {
    padding: 16,
  },
  textContainer: {
    padding: 5,
  },
  label: {
    fontWeight: "bold",
    color: theme === 'dark' ? 'white' : 'black',
  },
  apiText: {
    color: theme === 'dark' ? 'white' : 'black',
  },
  addButton: {
    color: "#b0655e",
    fontSize: 16,
    padding: 16,
    fontWeight: "700",
  },
  closeButton1: {
    color: "blue",
    fontSize: 16,
    padding: 16,
    fontWeight: '700',
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  imageDetails: {
    width: width,
    height: 150,
  },

  //----- MealCard.js (under saved) -----//
  savedCard: {
    backgroundColor: theme === 'dark' ? '#5da8af' : 'white',
    borderColor: "black",
    padding: 20,
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  savedText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 10,
  },
  buttonOptions: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: theme === 'dark' ? 'white' : "#ededed",
    alignItems: "center",
  },
  optionText: {
    fontWeight: "bold",
  },
});

export default getStyles;