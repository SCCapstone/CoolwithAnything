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
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';

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
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      Alert.alert("Error", "Task not found.");
      return;
    }
  
    try {
      // Ensure the task is marked as incomplete before deletion if it's currently completed
      if (task.completed) {
        await updateTaskForUser(userID, taskId, { completed: false });
      }
  
      // Proceed to delete the task
      await deleteTask(userID, taskId);

      Alert.alert("Success", "Task deleted successfully.");
  
      // Update UI by removing the task from the list and hiding the action buttons
      setVisibleTaskActions(prev => ({ ...prev, [taskId]: false }));
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      eventEmitter.emit("taskDeleted", taskId);
      eventEmitter.emit("taskUpdated", taskId);
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
        <Text style={styles.BirthdayCelebration}>🎉 Your Birthday! 🎉</Text>
      )}
      <BirthdayCelebration userName={userName} isBirthday={isBirthday} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskItemText} numberOfLines={1} ellipsizeMode='tail'>
            {item.completed ? <Icon name="check-circle" size={20} color="green" /> : ""} {item.name} 
            </Text>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => setVisibleTaskActions(prev => ({
                ...prev,
                [item.id]: !prev[item.id]
              }))}
            >
              <Icon name="bars" size={20} style={{color: theme === "dark" ? "white" : "black"}} />
            </TouchableOpacity>
            {visibleTaskActions[item.id] && (
              <View style={styles.taskActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={() => toggleCompletion(item)}
                >
                  <Icon2 name={item.completed ? "checkbox-active" : "checkbox-passive"} size={15} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => navigation.navigate("EditTaskScreen", { task: item, userId: userID })}
                >
                  <Icon name="pencil" size={15} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => onTaskDelete(item.id)}
                >
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default DailyView;