import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarComponent from '../screens/CalendarComponent';
import DayScreen from '../screens/DayScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
// Import other screens or components as needed

const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CalendarComponent" 
        component={CalendarComponent} 
        options={{ headerShown: false }} 
      />
<Stack.Screen 
  name="DayScreen" 
  component={DayScreen}
  // Optional: Customize header title, styles, etc.
/>
      <Stack.Screen 
        name="EditTaskScreen" 
        component={EditTaskScreen} 
        options={{ headerShown: false }} 
      />
      {/* Add other screens to the stack here if needed */}
    </Stack.Navigator>
  );
};

export default CalendarStack;