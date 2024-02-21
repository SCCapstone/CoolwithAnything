// CreateWorkoutScreen.js
import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TextInput } from "react-native";
import WorkoutHeader from "./WorkoutHeader";
import InputField from "./InputField"; // Reused from Create Task
import ExerciseItem from "./ExerciseItem";
import DaySelector from "./DateTimePicker";
import CommentBox from "./CommentBox"; // Reused from Create Task
import CreateButton from "./CreateButton"; // Reused from Create Task

const AddWorkout = ({ route }) => {
  //const [selectedDays, setSelectedDays] = useState([]);
  const { userID } = route.params;
  const { savedWorkouts } = route.params;
  const { setSavedWorkouts } = route.params;
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutMuscle, setWorkoutMuscle] = useState("");
  const [workoutEquipment, setWorkoutEquipment] = useState("");
  const [workoutDifficulty, setWorkoutDifficulty] = useState("");
  const [workoutInstructions, setWorkoutInstructions] = useState("");

  const handleAdd = () => {
    //console.log(workoutName);
    const addWorkout = {
      workoutName,
      workoutType,
      workoutMuscle,
      workoutEquipment,
      workoutDifficulty,
      workoutInstructions,
    };

    setSavedWorkouts((savedWorkouts) => [...savedWorkouts, addWorkout]);

    console.log(addWorkout);

    setWorkoutName("");
    setWorkoutType("");
    setWorkoutMuscle("");
    setWorkoutEquipment("");
    setWorkoutDifficulty("");
    setWorkoutInstructions("");
  };

  return (
    <ScrollView style={styles.container}>
      <WorkoutHeader onClose={() => console.log("Close pressed")} />
      <InputField
        value={workoutName}
        placeholder="Workout Name"
        onChangeText={setWorkoutName}
      />
      <InputField
        value={workoutType}
        placeholder="Type"
        onChangeText={setWorkoutType}
      />
      <InputField
        value={workoutMuscle}
        placeholder="Muscle"
        onChangeText={setWorkoutMuscle}
      />
      <InputField
        value={workoutEquipment}
        placeholder="Equipment"
        onChangeText={setWorkoutEquipment}
      />
      <InputField
        value={workoutDifficulty}
        placeholder="Difficulty"
        onChangeText={setWorkoutDifficulty}
      />

      <CommentBox
        value={workoutInstructions}
        onChangeText={setWorkoutInstructions}
      />
      <CreateButton onPress={() => handleAdd()} label={"Create Workout"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default AddWorkout;
