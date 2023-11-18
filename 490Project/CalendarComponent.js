import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CalendarComponent = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    navigation.navigate('Day', { selectedDate: day.dateString });
    setSelectedDate(day.dateString);
  };

  return (
    <View>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true, marked: true } }}
      />
    </View>
  );
};

export default CalendarComponent;
