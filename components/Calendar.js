import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, FlatList, Alert } from "react-native";
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
} from "date-fns";
import { fetchTasksForUser, deleteTask } from "../services/AuthAPI";
import styles from "../styles/CalendarStyle";
import { isSameMonth } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import eventEmitter from './EventEmitter';

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Calendar = ({ userID, navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
 // const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
  
        // console logs here to debug the values
        console.log("Current Month:", currentMonth);
        console.log("Start Date:", start);
        console.log("End Date:", end);
  
        // Safeguard: Ensure 'start' and 'end' are Date objects before calling toISOString
        if (start && end && start instanceof Date && end instanceof Date) {
          const fetchedTasks = await fetchTasksForUser(userID, new Date(start).toISOString(), new Date(end).toISOString());
          setTasks(fetchedTasks);
        } else {
          console.error("start or end date is not a valid Date object");
        }
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();

    // Subscribe to the taskCreated event
    const unsubscribeCreated = eventEmitter.subscribe('taskCreated', fetchTasks);
    const unsubscribeUpdated = eventEmitter.subscribe('taskUpdated', fetchTasks); // Listen for task updates
  
    return () => {
      unsubscribeCreated();
      unsubscribeUpdated(); // Clean up
    };
  }, [currentMonth, userID]);

  // Define a function to get color based on priority
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange';
    case 'low':
      return 'green';
    default:
      return 'black'; // default color
  }
};
  
  const taskTypeColors = {
    School: '#FFA07A', // Light Salmon random color they dont match up to examples we can swtich this later
    Work: '#20B2AA', // Light Sea Green random color ^
    Personal: '#778899', // Light Slate Gray random color ^
    
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateSelect = (day) => {
    setSelectedDate(day);
    setModalVisible(true);
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
              Alert.alert("Task Deleted", "The task has been successfully deleted.");
              // Refresh tasks list after deletion
              const updatedTasks = await fetchTasksForUser(userID);
              setTasks(updatedTasks);
              setModalVisible(false);
            } catch (error) {
              Alert.alert("Deletion Failed", "Failed to delete the task. Please try again.");
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
    const dayTasks = tasks.filter(task => format(parseISO(task.date), "yyyy-MM-dd") === formattedDate);
    
    // Identify unique task types for the day
    const uniqueTaskTypes = [...new Set(dayTasks.map(task => task.type))];

    return (
      <TouchableOpacity key={index} style={styles.dayItem} onPress={() => onDateSelect(day)}>
        <Text style={[
          styles.dayText,
          isSameMonth(day, currentMonth) ? {} : { color: '#cccccc' } // Grey out the days that are not in the current month
        ]}>
          {format(day, "d")}
        </Text>
        <View style={styles.indicatorContainer}>
          {uniqueTaskTypes.map((type, typeIndex) => (
            <View key={typeIndex} style={[styles.taskIndicator, { backgroundColor: taskTypeColors[type] || '#ccc' }]} />
          ))}
        </View>
      </TouchableOpacity>
    );
  });
};

  return (
    <View style={styles.calendarContainer}>
      {/* Calendar Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYearText}>{format(currentMonth, "MMMM yyyy")}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Days of the Week */}
      <View style={styles.daysOfWeek}>
        {days.map(day => (
          <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
        ))}
      </View>

      {/* Days Grid */}
      <View style={styles.daysContainer}>{renderDays()}</View>

      {/* Task Details and Actions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Tasks for {format(selectedDate, "PPPP")}</Text>
<FlatList
  data={tasks.filter(task => format(parseISO(task.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))}
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
              onPress: () => navigation.navigate('EditTaskScreen', { task: item, userId: userID}),
            },
          ],
          { cancelable: false }
        );
      }}
    >
      <Text style={[styles.taskDetailText, { color: getPriorityColor(item.priority) }]}>{item.name}</Text>
    </TouchableOpacity>
  )}
  keyExtractor={item => item.id}
/>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Calendar;