import React, { useState } from "react";
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
import styles from "../styles/CalendarStyle";
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

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

    return daysArray.map((day, index) => (
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
      </TouchableOpacity>
    ));
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

      {/* Popup windows when a date is selected */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>{`You have selected ${format(selectedDate, "PPPP")}`}</Text>
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
