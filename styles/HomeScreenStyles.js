import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#262626' : "white",
    },
    topContainer: {
      flexDirection: "row",
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
    dateTrackerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    monthYearText: {
      fontSize: 24,
      color: theme === 'dark' ? "white" : "black",
    },
    progressContainer: {
      padding: 10,
    },
    progressBackground: {
      height: 30,
      backgroundColor: 'lightgray',
      borderRadius: 10,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#63D4D5',
      borderRadius: 10,
    },
    progressText: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateX: -25 }, { translateY: -0 }],
      color: 'black',
      fontWeight: 'heavy', 
    },
    circleContainer: {
      alignItems: "center",
      margin: 5,
    },
    counter: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    countText: {
      color: "white",
    },
    categoryLabel: {
      paddingTop: 10,
      color: theme === 'dark' ? 'white' : "black",
    },
    calendarContainer: {
      backgroundColor: theme === 'dark' ? '#262626' : "white",
      margin: 5,
      padding: 5,
      borderRadius: 5,
    },
    calendarHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      color: theme === 'dark' ? 'white' : "black",
    },
    monthYearText: {
      fontSize: 20,
      color: theme === 'dark' ? 'white' : "black",
    },
    arrowText: {
      fontSize: 24,
      color: theme === 'dark' ? 'white' : "black",
    },
    daysOfWeek: {
      flexDirection: "row",
      justifyContent: "space-around",
      color: theme === 'dark' ? 'white' : "black",
    },
    dayOfWeekText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : "black",
    },
    daysContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    dayItem: {
      width: "13%", // approximately 1/7th of the container width
      alignItems: "center",
      marginVertical: 2,
      color: theme === 'dark' ? 'white' : "black",
    },
    selectedDay: {
      backgroundColor: "#63D4D5",
      borderRadius: 20,
    },
    dayText: {
      fontSize: 16,
      color: theme === 'dark' ? 'white' : "black",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    birthdayDay: {
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 20,
    },
    selectedBD: {
      borderColor: 'red',
      borderWidth: 2,
      backgroundColor: "pink",
      borderRadius: 20,
    },
    // Added styles for task indicators
    indicatorContainer: {
      flexDirection: 'row', // Or 'column' for vertical
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 4,
    },
    taskIndicator: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 1, // Adjust spacing between indicators
    },
    taskIndicatorText: {
      color: '#FFFFFF', 
      fontSize: 12, 
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10,
    },
    buttonEdit: {
      backgroundColor: "#FFA500",
    },
    buttonDelete: {
      backgroundColor: "#FF6347",
    },
    buttonClose: {
      backgroundColor: "#2196F3", 
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    homeTextContainer: {
      height: 80,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#3e5e60',
    },
    homeText: {
      marginTop: 40,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 24,
    },
});

export default getStyles;