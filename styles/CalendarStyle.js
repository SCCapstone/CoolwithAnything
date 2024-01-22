import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 6,
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
    marginVertical: 5,
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
      height: 2,
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
});
export default styles;
