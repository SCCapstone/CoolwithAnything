import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text } from 'react-native';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    // Handle day press event
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <CalendarComponent
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true, marked: true } }}
      />    
      <Text>Selected date: {selectedDate}</Text>
    </View>
  );
};

export default Calendar;
