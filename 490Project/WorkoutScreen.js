import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './style.js'
import { SIZES } from './theme.js';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useRouter } from "expo-router";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const workoutType = ["Arms & Shoulders", "Glutes & Legs", "Abs & Core", "Endurance & Mobility"];

function BrowseWorkouts() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Workout 1</Text>
    </View>
  );
}

function SavedWorkouts() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Saved Workout 1</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const WorkoutScreen = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [currentWorkoutType, setCurrentWorkoutType] = useState('Meal')

  return (
    <View>

    <View style={styles.tabsContainer}>
      <Tab.Navigator>
        <Tab.Screen name="Browse Workouts" component={BrowseWorkouts} options={{ tabBarLabel: 'Browse' }}/>
        <Tab.Screen name="Saved Workouts" component={SavedWorkouts} options={{ tabBarLabel: 'Saved' }}/>
        </Tab.Navigator>
    </View>

    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          placeholder='What are you looking for?'
        />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
        <MaterialCommunityIcons name="magnify" />
      </TouchableOpacity>
    </View>

    <View style={styles.contentContainer}>
      <FlatList
        data={workoutType}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tab(currentWorkoutType, item)}
            onPress={() => {
            setCurrentWorkoutType(item);
            router.push('/search/${item}')
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ rowGap: SIZES.small}}
        />
      </View>
    </View>
  );
};

export default WorkoutScreen;