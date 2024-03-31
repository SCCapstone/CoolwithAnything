import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    borderRadius: 3,
    flex: 1, // Encourage container to fill available space
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  monthYearText: {
    fontSize: 20,
  },
  arrowText: {
    fontSize: 24,
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayOfWeekText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  selectedDay: {
    backgroundColor: "pink",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
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
  typeIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  typeIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80, // Adjusted size
    height: 80, // Adjusted size
    borderRadius: 40, // Makes it circular
    padding: 10,
  },
  typeIndicatorCount: {
    color: '#FFFFFF',
    fontSize: 18, // Adjust font size for the count
    fontWeight: 'bold',
  },
  typeIndicatorText: {
    color: '#FFFFFF',
    fontSize: 14, // Adjust font size for the task type name
    paddingTop: 5, // Space between count and task type name
  },
});

export default styles;