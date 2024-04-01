import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { deleteTask, fetchTasksForUser } from "../services/AuthAPI";
import eventEmitter from './EventEmitter';
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/DailyViewStyles";

const DailyView = ({ userID, selectedDate, navigation }) => {
  const [tasks, setTasks] = useState([]);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await fetchTasksForUser(userID);
        const filteredTasks = allTasks.filter(task => {
          const taskDate = parseISO(task.date); // Convert the date string to a Date object
          return taskDate >= startOfDay(selectedDate) && taskDate <= endOfDay(selectedDate);
          
        });
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        Alert.alert("Error", "Failed to fetch tasks.");
      }
    };


    fetchTasks();

  // Subscribe to taskUpdated event
  const unsubscribe = eventEmitter.subscribe('taskUpdated', fetchTasks);

  // Return an unsubscribe function to clean up
  return () => {
    unsubscribe();
  };
  }, [selectedDate, userID]);

  const onTaskSelect = (task) => {
    // Navigate to the task edit screen with the selected task details
    navigation.navigate('EditTaskScreen', { task, userId: userID });
  };

  const onTaskDelete = async (taskId) => {
    try {
      await deleteTask(userID, taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      Alert.alert("Success", "Task deleted successfully.");
      eventEmitter.emit('taskUpdated');
    } catch (error) {
      console.error("Error deleting task: ", error);
      Alert.alert("Error", "Failed to delete task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Tasks for {format(selectedDate, 'PPP')}</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => onTaskSelect(item)}>
              <Text style={styles.taskItemText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => onTaskDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default DailyView;