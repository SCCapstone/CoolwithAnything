import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarComponent = () => {
  const navigation = useNavigation();
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const newMarkedDates = {};
      tasks.forEach(task => {
        if (task.date) {
          newMarkedDates[task.date] = { marked: true, dotColor: 'blue' };
        }
      });
      setMarkedDates(newMarkedDates);
    } catch (e) {
      console.error('Error loading tasks:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const onDayPress = (day) => {
    navigation.navigate('DayScreen', { selectedDate: day.dateString });
    setSelectedDate(day.dateString);
    loadTasks(); // Optionally call loadTasks here if you want to refresh the marked dates upon selecting a day
  };

  return (
    <View>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: { ...markedDates[selectedDate], selected: true }
        }}
      />
    </View>
  );
};

export default CalendarComponent;