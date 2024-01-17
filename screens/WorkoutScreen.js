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
  Modal,
} from "react-native";

import { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WorkoutApi from "../APIs/WorkoutAPI";

const BrowseWorkout = ({ searchTerm, setSearchTerm }) => {
  const [showApi, setShowApi] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState("");

  const handleQueryButtonClick = (query) => {
    setSelectedQuery(query);
    setModalVisible(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      {/* Example buttons with different queries */}
      <TouchableOpacity
        onPress={() => handleQueryButtonClick("biceps")}
        style={workoutStyles.showAllButton}
      >
        <Text>Biceps</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("glutes")}
        style={workoutStyles.showAllButton}
      >
        <Text>Glutes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("abdominals")}
        style={workoutStyles.showAllButton}
      >
        <Text>Abs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("quadriceps")}
        style={workoutStyles.showAllButton}
      >
        <Text>Legs</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View>
          <Text style={workoutStyles.modalHeader}>Workouts</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={workoutStyles.closeButton}>Close</Text>
          </TouchableOpacity>
          {/* Render WorkoutApi component with the selected query */}
          {selectedQuery && <WorkoutApi query={selectedQuery} />}
        </View>
      </Modal>
    </View>
  );
};

const workoutStyles = StyleSheet.create({
  showAllButton: {
    backgroundColor: "white",
    borderColor: "black",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    height: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  cardContainer: {
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
  cardContent: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
  },
  modalContent: {
    padding: 16,
  },
  closeButton: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    width: 70,
    padding: 8,
    marginLeft: 330,
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
        component={SavedWorkouts} // Pass the component directly
        initialParams={{ workouts: savedWorkouts, setSavedWorkouts }}
        options={{ tabBarLabel: "Saved" }}
      />
    </Tab.Navigator>
  );
};

export default WorkoutScreen;
