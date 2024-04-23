import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import { format, parseISO, startOfDay, endOfDay, set } from "date-fns";
import { deleteTask, fetchTasksForUser, updateTaskForUser } from "../services/AuthAPI";
import eventEmitter from "./EventEmitter";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/DailyViewStyles";
import BirthdayCelebration from "./BDCelebration";

const DailyView = ({
  userID,
  selectedDate,
  navigation,
  isBirthday,
  userName,
}) => {
  const [tasks, setTasks] = useState([]);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // State to control the visibility of action buttons for each task
  const [visibleTaskActions, setVisibleTaskActions] = useState({});

  const fetchTasks = async () => {
    try {
      const allTasks = await fetchTasksForUser(userID);
      const filteredTasks = allTasks.filter((task) => {
        const taskDate = parseISO(task.date);
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

    const unsubscribeTaskUpdated = eventEmitter.subscribe(
      "taskUpdated",
      fetchTasks
    );
    const unsubscribeMonthChange = eventEmitter.subscribe(
      "monthChanged",
      fetchTasks
    );
    const unsubscribeTaskDeleted = eventEmitter.subscribe(
      "taskDeleted",
      fetchTasks
    );
    const unsubscribeTaskAdded = eventEmitter.subscribe(
      "taskAdded",
      fetchTasks
    );
    const unsubscribeCompletedTasks = eventEmitter.subscribe(
      "completedTasks",
      fetchTasks
    );
    return () => {
      unsubscribeTaskUpdated();
      unsubscribeMonthChange();
      unsubscribeTaskDeleted();
      unsubscribeTaskAdded();
      unsubscribeCompletedTasks();
    };
  }, [selectedDate, userID]);

  const onTaskDelete = async (taskId) => {
    try {
      await deleteTask(userID, taskId);
      eventEmitter.emit("taskDeleted", taskId);
      Alert.alert("Success", "Task deleted successfully.");
      setVisibleTaskActions(prev => ({ ...prev, [taskId]: false }));  // Hide buttons
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
      Alert.alert("Error", "Failed to delete task.");
    }
  };

  const toggleCompletion = async (task) => {
    const updatedStatus = !task.completed;
    try {
      await updateTaskForUser(userID, task.id, { completed: updatedStatus });
      eventEmitter.emit('taskUpdated');
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === task.id ? { ...t, completed: updatedStatus } : t)
      );
    } catch (error) {
      console.error("Error updating task completion status: ", error);
      Alert.alert("Error", "Failed to update task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Daily Tasks for {format(selectedDate, "PPP")}
      </Text>
      {isBirthday && (
        <Text style={styles.BirthdayCelebration}>🎉 Happy Birthday! 🎉</Text>
      )}
      <BirthdayCelebration userName={userName} isBirthday={isBirthday} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskItemText}>
              {item.name} {item.completed ? "✓" : ""}
            </Text>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => setVisibleTaskActions(prev => ({
                ...prev,
                [item.id]: !prev[item.id]  // Toggle visibility of action buttons
              }))}
            >
              <Text>☰</Text>
            </TouchableOpacity>
            {visibleTaskActions[item.id] && (
              <View style={styles.taskActions}>
                <Button title="Completion" onPress={() => toggleCompletion(item)} />
                <Button title="Edit" onPress={() => navigation.navigate("EditTaskScreen", { task: item, userId: userID })} />
                <Button title="Delete" onPress={() => onTaskDelete(item.id)} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default DailyView;
