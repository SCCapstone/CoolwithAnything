import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import CalendarStack from './CalendarStack'; // Assuming CalendarStack is in the same directory
import AddWorkout from './AddWorkouts'; // Update with your actual file path
import AddMeals from './AddMeals'; // Update with your actual file path
import AddTaskScreen from './AddTaskScreen'; // Ensure this path is correct

const Tab = createBottomTabNavigator();
const CreateStack = createNativeStackNavigator();

function CreateStackNavigator() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="CreateMain" component={AddTask} />
      <CreateStack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </CreateStack.Navigator>
  );
}

function AddTask({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Add Task</Text>
      <Pressable
        style={styles.pressableButton}
        onPress={() => navigation.navigate('AddTaskScreen', { entryType: 'Task' })}
      >
        <Text style={styles.pressableButtonText}>Create New Task/Event</Text>
      </Pressable>
    </View>
  );
}

const AddScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Add Task/Event"
        component={CreateStackNavigator}
        options={{
          tabBarLabel: 'Task/Event',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Workouts"
        component={AddWorkout}
        options={{
          tabBarLabel: 'Workout',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Meal"
        component={AddMeals}
        options={{
          tabBarLabel: 'Meal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  pressableButtonText: {
    color: 'white',
  },
});

export default AddScreen;