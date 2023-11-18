import React from 'react';
import { View, Text } from 'react-native';
import { format, parseISO } from 'date-fns';

const DayScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const parsedDate = parseISO(selectedDate);
  const formattedDate = format(parsedDate, 'MM/dd/yyyy');

  return (
    <View>
      <Text>{formattedDate}</Text>
      {/* Add your blocks for each hour here */}
    </View>
  );
};

export default DayScreen;
