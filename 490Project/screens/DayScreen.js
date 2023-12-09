import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/dayScreenStyles';

const DayScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  const [tasksForTheDay, setTasksForTheDay] = useState([]);

  useEffect(() => {
    loadTasksForTheDay();
  }, [selectedDate]);

  const loadTasksForTheDay = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const filteredTasks = allTasks.filter(task => task.date === selectedDate);
      setTasksForTheDay(filteredTasks);
    } catch (e) {
      console.error('Error loading tasks:', e);
    }
  };

  const handleGoBack = () => {
    loadTasksForTheDay();
  };

  const handleEditTask = (task) => {
    navigation.navigate('EditTaskScreen', { task, onGoBack: handleGoBack });
  };

  const parsedDate = parseISO(selectedDate);
  const formattedDate = format(parsedDate, 'MMMM dd, yyyy');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Tasks for The Day</Text>
      </View>

      {tasksForTheDay.map((task, index) => (
        <TouchableOpacity key={index} onPress={() => handleEditTask(task)}>
          <View style={styles.taskContainer}>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text>{task.details}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default DayScreen;