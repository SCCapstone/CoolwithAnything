import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import CalendarComponent from './CalendarComponent.js';
import DayScreen from './DayScreen.js';
import WorkoutScreen from './WorkoutScreen';
import CookbookScreen from './CookbookScreen';


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Workouts" component={WorkoutScreen} />
        <Tab.Screen name="Cookbook" component={CookbookScreen} />
        <Tab.Screen name="Calendar" component={CalendarStack} />
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
      <Stack.Navigator initialRouteName='Calendar'>
        <Stack.Screen name="Calendar" component={CalendarComponent} />
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