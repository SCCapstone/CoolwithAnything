import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import styles from './dayScreenStyles';

const DayScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const parsedDate = parseISO(selectedDate);
  const formattedDate = format(parsedDate, 'MM/dd/yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
      {/* Add your blocks for each hour here */}
    </View>
  );
};

export default DayScreen;
