import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { format, parseISO, startOfDay, endOfDay } from "date-fns";
import { deleteTask, fetchTasksForUser } from "../services/AuthAPI";
import eventEmitter from "./EventEmitter";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/DailyViewStyles";
import BirthdayCelebration from "./BDCelebration";

const DailyView = ({ userID, selectedDate, navigation, isBirthday, userName }) => {
  const [tasks, setTasks] = useState([]);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Fetch tasks based on the selected date
  const fetchTasks = async () => {
    try {
      const allTasks = await fetchTasksForUser(userID);
      const filteredTasks = allTasks.filter((task) => {
        const taskDate = parseISO(task.date); // Convert the date string to a Date object
        return (
          taskDate >= startOfDay(selectedDate) &&
          taskDate <= endOfDay(selectedDate)
        );
      });
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      Alert.alert("Error", "Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();

    // Subscribe to taskUpdated event to refresh tasks list whenever a task is updated
    const unsubscribe = eventEmitter.subscribe("taskUpdated", fetchTasks);

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [selectedDate, userID]); // Adding userID as a dependency to handle any changes or re-initializations

  const onTaskDelete = async (taskId) => {
    try {
      await deleteTask(userID, taskId);
      fetchTasks(); // Refetch tasks to reflect the deletion
      Alert.alert("Success", "Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task: ", error);
      Alert.alert("Error", "Failed to delete task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Daily Tasks for {format(selectedDate, "PPP")}
      </Text>
      {isBirthday && (
        <Text style={styles.BirthdayCelebration}>
          🎉 Happy Birthday! 🎉
        </Text>
      )}
      <BirthdayCelebration
        userName={userName}
        isBirthday={isBirthday}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskItemText}>{item.name}</Text>
            <View style={styles.taskActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditTaskScreen', { task: item, userId: userID })}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onTaskDelete(item.id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DailyView;