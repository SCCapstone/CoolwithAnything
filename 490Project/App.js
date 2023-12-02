import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons'

import CalendarComponent from './CalendarComponent.js';
import DayScreen from './DayScreen.js';
import WorkoutScreen from './WorkoutScreen';
import CookbookScreen from './CookbookScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function TabNavigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name=" "
        component={CalendarStack} 
        options={{tabBarIcon: ({size, color})=>(
          <MaterialCommunityIcons name="home"
          size={size} color={color} />
        )
        }}
        />
        <Tab.Screen name="Workouts" component={WorkoutScreen} />
        <Tab.Screen name="Cookbook" component={CookbookScreen} />
      </Tab.Navigator>
  );
}

const CalendarStack = () => {
  return (
      <Stack.Navigator initialRouteName='Calendar'>
        <Stack.Screen name=" " component={CalendarComponent} />
        <Stack.Screen name="Today" component={DayScreen} />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
         <TabNavigator />
       </NavigationContainer>
  );
}