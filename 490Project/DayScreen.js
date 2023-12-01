import React from 'react';
import { View, Text } from 'react-native';
import { format, parseISO } from 'date-fns';
import styles from './dayScreenStyles';

const DayScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const parsedDate = parseISO(selectedDate);
  const formattedDate = format(parsedDate, 'MMMM dd, yyyy');

  return (
    <View style={styles.container}>
      {/* Date */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Tasks for The Day lol</Text>
      </View>
    </View>
  );
  }

export default DayScreen;
