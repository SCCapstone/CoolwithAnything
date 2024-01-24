import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { fetchTasksForUser } from "../services/AuthAPI";
import styles from "../styles/CalendarStyle";
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const Calendar = ({ userID }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const fetchedTasks = await fetchTasksForUser(userID, start, end);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, [currentMonth, userID]);

  // Handle next and previous month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  // Handle date selection
  const onDateSelect = (day) => {
    setSelectedDate(day);
    setModalVisible(true);
  };
  // Render days of the month
  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
  
    return daysArray.map((day, index) => {
      const formattedDate = format(day, "yyyy-MM-dd");
      const dayTasks = tasks.filter(task =>
        task.date && typeof task.date === 'string' && task.date.startsWith(formattedDate)
      );
  
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayItem,
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
              ? styles.selectedDay
              : null,
          ]}
          onPress={() => onDateSelect(day)}
        >
          <Text style={styles.dayText}>{format(day, "d")}</Text>
          {dayTasks.length > 0 && (
            <View style={styles.taskIndicator}>
              {/* Render a simple indicator or list tasks here */}
              <Text>Task</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        {/* Month display and change */}
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYearText}>
          {format(currentMonth, "MMMM yyyy")}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.arrowText}>{">"}</Text>
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

      {/* Days display */}
      <View style={styles.daysContainer}>{renderDays()}</View>

{/* Popup window when a date is selected */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalView}>
    <Text>{`Tasks for ${format(selectedDate, "PPPP")}`}</Text>
    {tasks.filter(task => task.date && task.date.startsWith(format(selectedDate, "yyyy-MM-dd")))
  .map(task => (
      <View key={task.id} style={styles.taskItem}>
        <Text>{task.name} - {task.location}</Text>
        {/* Display other task details as needed */}
      </View>
    ))}
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setModalVisible(false)}
    >
      <Text>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>
    </View>
  );
};

export default Calendar;
