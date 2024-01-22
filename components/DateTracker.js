import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

const DateTracker = ({ month, year }) => {
  return (
    <View style={styles.dateTrackerContainer}>
      <Text style={styles.monthYearText}>{`${month} ${year}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTrackerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  monthYearText: {
    fontSize: 24,
  },
  accountButton: {
    
  },
  accountButtonText: {
    
  },
});
export default DateTracker;