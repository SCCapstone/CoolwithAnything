import React from 'react';
import { View, Text } from 'react-native';

const DayScreen = ({ route }) => {
  const { selectedDate } = route.params;

  // Use the selected date to display the day of the week and list of blocks

  return (
    <View>
      <Text>{selectedDate}</Text>
      {/* Add your blocks for each hour here */}
    </View>
  );
};

export default DayScreen;
