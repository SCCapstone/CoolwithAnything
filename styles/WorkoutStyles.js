import { StyleSheet, Dimensions } from "react-native";
const{width, height} = Dimensions.get("window");


const imageStyles = (aspectRatio) => ({
  width: 400,
  flex: 1,
  aspectRatio: aspectRatio,
});

const getStyles = (theme) => StyleSheet.create({

  //------Workoutscreen.js-----//
  screen: {
    flex: 1,
    backgroundColor: theme === 'light' ? 'white' : "#262626",
  },
  workoutTextContainer: {
    height: 80,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
  },
  workoutText: {
    marginTop: 30,
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

  //----- BrowseWorkouts.js -----//
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

  //----- WorkoutCards.js (under browse => api) -----//
  background: {
    backgroundColor: theme === 'dark' ? "#262626" : "white",
  },
  cardContainer: {
    backgroundColor: theme === 'dark' ? "#5da8af" : 'white',
    borderColor: "black",
    height: 90,
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 20,
  },
  modal: {
    color: theme === 'dark' ? 'white' : 'black',
    fontSize: 16,
  },
  modalName: {
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#262626' : "white",
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
    color: "blue",
    fontSize: 16,
    padding: 16,
  },
  closeButton1: {
    color: "blue",
    fontSize: 16,
    padding: 16,
  },

  //----- WorkoutCard.js (under saved) -----//
  savedCard: {
    backgroundColor: theme === 'dark' ? '#5da8af' : 'white',
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
  savedText: {
    fontSize: 16,
    marginBottom: 8,
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

  //----- I DONT THINK THESE ARE USED ANYWHERE - KAYLY ------//
  
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 24, 
    fontWeight: 900, 
    marginTop: 30, 
    color: 'white',
  },
  workoutCardsTextContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
  },
});

export default getStyles;