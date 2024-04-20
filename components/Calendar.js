import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isDate,
  parseISO,
  isSameMonth,
} from "date-fns";
import { fetchTasksForUser, deleteTask } from "../services/AuthAPI";
import getStyles from "../styles/HomeScreenStyles";
import { fetchTasksForCategoryAndMonth } from "../services/AuthAPI";
import { useNavigation } from "@react-navigation/native";
import eventEmitter from "./EventEmitter";
import DailyView from "./DailyView";
import { useTheme } from "../services/ThemeContext";
import { FontAwesome5 } from "@expo/vector-icons";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Calendar = ({ userID, navigation, birthday, userName }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  // const navigation = useNavigation();

  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    School: 0,
    Work: 0,
    Personal: 0,
    Gym: 0,
  });

  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        // console logs here to debug the values
        console.log("Current Month:", currentMonth);
        console.log("Start Date:", start);
        console.log("End Date:", end);
        console.log("Birthday (calendar):", birthday);

        // Safeguard: Ensure 'start' and 'end' are Date objects before calling toISOString
        if (start && end && start instanceof Date && end instanceof Date) {
          const fetchedTasks = await fetchTasksForUser(
            userID,
            new Date(start).toISOString(),
            new Date(end).toISOString()
          );
          setTasks(fetchedTasks);

          // Initialize counters for each task type
          const newTaskCounts = { School: 0, Work: 0, Personal: 0, Gym: 0 };

          // Count tasks for each type
          fetchedTasks.forEach((task) => {
            if (
              newTaskCounts.hasOwnProperty(task.type) &&
              isSameMonth(parseISO(task.date), currentMonth)
            ) {
              newTaskCounts[task.type]++;
            }
          });

          // Update the state with the new counts
          setTaskCounts(newTaskCounts);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    // Subscribe to the taskCreated event
    const unsubscribe = eventEmitter.subscribe("taskCreated", fetchTasks);

    // Unsubscribe from the event when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [currentMonth, userID]);

  // Define a function to get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "black"; // default color
    }
  };

  const taskTypeColors = {
    School: "#FFA07A",
    Work: "#20B2AA",
    Personal: "#778899",
    Gym: "#FFD700",
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateSelect = (day) => {
    setSelectedDate(day);
    setModalVisible(false);
  };
  const convertToISO = (dateString) => {
    // Split the date string into parts
    const parts = dateString.split("-");

    // Reorder the parts from "MM-DD-YYYY" to "YYYY-MM-DD"
    const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

    return isoDate;
  };

  const isBirthday = (day) => {
    if (!birthday) return false;
    const birthDate = parseISO(convertToISO(birthday));
    return (
      day.getMonth() === birthDate.getMonth() &&
      day.getDate() === birthDate.getDate()
    );
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteTask(userID, taskId); // Assuming deleteTask requires userID and taskId
              Alert.alert(
                "Task Deleted",
                "The task has been successfully deleted."
              );
              // Refresh tasks list after deletion
              const updatedTasks = await fetchTasksForUser(userID);
              setTasks(updatedTasks);
              setModalVisible(false);
            } catch (error) {
              Alert.alert(
                "Deletion Failed",
                "Failed to delete the task. Please try again."
              );
              console.error("Error deleting task: ", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderDays = () => {
    // Start from the first day of the week that includes the first day of the current month
    const startDay = startOfWeek(startOfMonth(currentMonth));

    // End at the last day of the week that includes the last day of the current month
    const endDay = endOfWeek(endOfMonth(currentMonth));

    // Generate an array of days to be displayed
    const daysArray = eachDayOfInterval({ start: startDay, end: endDay });

    return daysArray.map((day, index) => {
      // Format the day for comparison with task dates
      const formattedDate = format(day, "yyyy-MM-dd");

      // Filter tasks to find those for the current day
      const dayTasks = tasks.filter(
        (task) => format(parseISO(task.date), "yyyy-MM-dd") === formattedDate
      );

      // Identify unique task types for the day
      const uniqueTaskTypes = [...new Set(dayTasks.map((task) => task.type))];

      return (
        // In the component rendering (assuming 'day' is already a Date object)
        <TouchableOpacity
          key={index}
          style={[
            styles.dayItem,
            format(day, "MM-dd-yyyy") === format(selectedDate, "MM-dd-yyyy")
              ? styles.selectedDay
              : isBirthday(day)
              ? styles.birthdayDay
              : null,
          ]}
          onPress={() => onDateSelect(day)}
        >
          <Text
            style={[
              styles.dayText,
              isSameMonth(day, currentMonth) ? {} : { color: "#cccccc" }, // Grey out the days that are not in the current month
            ]}
          >
            {format(day, "d")}
          </Text>
          <View style={styles.indicatorContainer}>
            {uniqueTaskTypes.map((type, typeIndex) => (
              <View
                key={typeIndex}
                style={[
                  styles.taskIndicator,
                  { backgroundColor: taskTypeColors[type] || "#ccc" },
                ]}
              />
            ))}
          </View>
        </TouchableOpacity>
      );
    });
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const birthdayDate = birthday ? parseISO(convertToISO(birthday)) : null;

        const fetchedTasks = await fetchTasksForUser(
          userID,
          start.toISOString(),
          end.toISOString()
        );

        // If the birthday falls within the current month, add a birthday task
        if (birthdayDate && isSameMonth(birthdayDate, currentMonth)) {
          const birthdayTask = {
            id: "birthday", // A unique ID for the birthday task
            name: "User's Birthday!",
            date: format(birthdayDate, "yyyy-MM-dd"), // Ensure the date format matches your tasks array
            type: "Birthday",
            priority: "high", // Optional: You can set priority as you see fit
            comment: "Celebrate!", // Optional
          };
          fetchedTasks.push(birthdayTask);
        }

        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
    // Subscribe and unsubscribe logic remains the same
  }, [currentMonth, userID, birthday]);

  return (
    <View style={styles.calendarContainer}>
      {/* Fixed Task Type Indicators View */}
      <View style={styles.indicatorContainer}>
        {Object.entries(taskTypeColors).map(([type, color]) => (
          <View key={type} style={styles.typeIndicatorWrapper}>
            <View style={[styles.taskIndicator, { backgroundColor: color }]}>
              <Text style={styles.typeIndicatorCount}>{taskCounts[type]}</Text>
            </View>
            <Text style={styles.typeIndicatorText}>{type}</Text>
          </View>
        ))}
      </View>
      {/* Calendar Header */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={prevMonth}>
          <FontAwesome5
            name="arrow-alt-circle-left"
            size={30}
            color="#57BCBE"
          />
        </TouchableOpacity>
        <Text
          style={[styles.monthYearText, { fontSize: 25, fontWeight: "bold" }]}
        >
          {format(currentMonth, "MMMM yyyy")}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <FontAwesome5
            name="arrow-alt-circle-right"
            size={30}
            color="#57BCBE"
          />
        </TouchableOpacity>
      </View>

      {/* Days of the week */}
      <View style={styles.daysOfWeek}>
        {days.map((day) => (
          <Text key={day} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days Grid */}
      <View style={styles.daysContainer}>{renderDays()}</View>
      <DailyView
        userID={userID}
        selectedDate={selectedDate}
        navigation={navigation}
        isBirthday={isBirthday(selectedDate)}
        userName={userName}
      />

      {/* Task Details and Actions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Tasks for {format(selectedDate, "PPPP")}
          </Text>
          {isBirthday(selectedDate) && (
            <Text style={styles.birthdayText}>🎉 Your birthday! 🎉</Text>
          )}
          <FlatList
            data={tasks.filter(
              (task) =>
                format(parseISO(task.date), "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd")
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Edit or Delete Task",
                    "Would you like to edit or delete this task?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => handleDeleteTask(item.id),
                        style: "destructive",
                      },
                      {
                        text: "Edit",
                        onPress: () =>
                          navigation.navigate("EditTaskScreen", {
                            task: item,
                            userId: userID,
                          }),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text
                  style={[
                    styles.taskDetailText,
                    { color: getPriorityColor(item.priority) },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Calendar;
