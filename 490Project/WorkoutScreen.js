// WorkoutScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import styles from './style.js'
import { SIZES } from './theme.js';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WorkoutApi from "./WorkoutApi.js";

const workoutType = ["Arms & Shoulders", "Glutes & Legs", "Abs & Core", "Endurance & Mobility"];

function BrowseWorkout({ searchTerm, setSearchTerm }) {
  const navigation = useNavigation();
  const [currentWorkoutType, setCurrentWorkoutType] = useState('Meal')
  
  const handleClick = () => {
    navigation.navigate('WorkoutApi');
  };
  return (
    <View>

    <View style={styles.contentContainer}>
    <FlatList
        data={workoutType}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tab(currentWorkoutType, item)}
            onPress={() => {
              setCurrentWorkoutType(item);
              navigation.navigate("Search", { workoutType: item });
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ rowGap: SIZES.small }}
      />
      </View>
    </View>
  );
}
const workoutStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: "black",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

const WorkoutCard = ({ workout, index, deleteWorkout, EditWorkout }) => {
  const [cardWorkout, setCardWorkout] = useState(workout);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(workout.name);
  const [type, setType] = useState(workout.type);
  const [muscle, setMuscle] = useState(workout.muscle);
  const [equipment, setEquipment] = useState(workout.equipment);
  const [difficulty, setDifficulty] = useState(workout.difficulty);
  const [instruction, setInstruction] = useState(workout.instruction);

  const OnCancel = () => {
    setName(workout.name);
    setType(workout.type);
    setMuscle(workout.muscle);
    setEquipment(workout.equipment);
    setDifficulty(workout.difficulty);
    setInstruction(workout.instruction);
    setEditMode(false);
  };
  const OnSave = () => {
    const newWorkout = {
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instruction,
    };
    setCardWorkout(newWorkout);
    EditWorkout(newWorkout, index);
    setEditMode(false);
  };
  return (
    <View>
      {editMode ? (
        <View style={workoutStyles.card}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={workoutStyles.text}
          />
          <TextInput
            value={type}
            onChangeText={setType}
            style={workoutStyles.text}
          />
          <TextInput
            value={muscle}
            onChangeText={setMuscle}
            style={workoutStyles.text}
          />
          <TextInput
            value={equipment}
            onChangeText={setEquipment}
            style={workoutStyles.text}
          />
          <TextInput
            value={difficulty}
            onChangeText={setDifficulty}
            style={workoutStyles.text}
          />
          <TextInput
            value={instruction}
            onChangeText={setInstruction}
            style={workoutStyles.text}
          />
          <View>
            <Pressable onPress={() => OnCancel()}>
              <Text>Cancel </Text>
            </Pressable>
            <Pressable onPress={() => OnSave()}>
              <Text>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={workoutStyles.card}>
          <Text style={workoutStyles.text}>Name: {cardWorkout.name}</Text>
          <Text style={workoutStyles.text}>Type: {cardWorkout.type}</Text>
          <Text style={workoutStyles.text}>Muscle: {cardWorkout.muscle}</Text>
          <Text style={workoutStyles.text}>
            Equipment: {cardWorkout.equipment}
          </Text>
          <Text style={workoutStyles.text}>
            Difficulty: {cardWorkout.difficulty}
          </Text>
          <Text style={workoutStyles.text}>
            Instruction: {cardWorkout.instruction}
          </Text>
          <View>
            <Pressable onPress={() => setEditMode(true)}>
              <Text>Edit </Text>
            </Pressable>
            <Pressable onPress={() => deleteWorkout(index)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};
const SavedWorkouts = ({ workouts, setSavedWorkouts }) => {
  useEffect(() => {}, [workouts]);
  const deleteWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setSavedWorkouts(newWorkouts);
  };
  const EditWorkout = (cardWorkout, index) => {
    const newWorkouts = [...workouts];
    newWorkouts[index] = cardWorkout;
    setSavedWorkouts(newWorkouts);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {workouts != null &&
        workouts.length > 0 &&
        workouts.map((workout, index) => {
          return (
            <WorkoutCard
              index={index}
              workout={workout}
              EditWorkout={EditWorkout}
              deleteWorkout={deleteWorkout}
            />
          );
        })}
    </ScrollView>
  );
};

const Tab = createMaterialTopTabNavigator();

const WorkoutScreen = ({ route, savedWorkouts, setSavedWorkouts }) => {
  useEffect(() => {}, [savedWorkouts]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Browse Workouts"
        component={BrowseWorkout}
        options={{ tabBarLabel: "Browse" }}
      />
      <Tab.Screen
        name="Saved Workouts"
        component={() => (
          <SavedWorkouts
            workouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
          />
        )}
        options={{ tabBarLabel: "Saved" }}
      />
    </Tab.Navigator>
  );
};

export default WorkoutScreen;