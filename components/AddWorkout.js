// CreateWorkoutScreen.js
import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TextInput } from "react-native";
import WorkoutHeader from "./WorkoutHeader";
import InputField from "./InputField"; // Reused from Create Task
import ExerciseItem from "./ExerciseItem";
import DaySelector from "./DateTimePicker";
import CommentBox from "./CommentBox"; // Reused from Create Task
import CreateButton from "./CreateButton"; // Reused from Create Task
import { useWorkouts } from "../services/WorkoutsContext";
import { useNavigation } from "@react-navigation/native";
import { addWorkoutData } from "../services/AuthAPI";

const AddWorkout = ({ route }) => {
  //const [selectedDays, setSelectedDays] = useState([]);
  const navigation = useNavigation();
  const { savedWorkouts, setSavedWorkouts } = useWorkouts();
  const { userID } = route.params;
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutMuscle, setWorkoutMuscle] = useState("");
  const [workoutEquipment, setWorkoutEquipment] = useState("");
  const [workoutDifficulty, setWorkoutDifficulty] = useState("");
  const [workoutInstructions, setWorkoutInstructions] = useState("");

  const handleclose = () => {
    setWorkoutName("");
    setWorkoutType("");
    setWorkoutMuscle("");
    setWorkoutEquipment("");
    setWorkoutDifficulty("");
    setWorkoutInstructions("");
    navigation.navigate("Today");
  };
  const handleAdd = async () => {
    //console.log(workoutName);
    const addWorkout = {
      workoutName,
      workoutType,
      workoutMuscle,
      workoutEquipment,
      workoutDifficulty,
      workoutInstructions,
    };

    await addWorkoutData(userID, addWorkout);
    setSavedWorkouts((savedWorkouts) => [...savedWorkouts, addWorkout]);

    console.log(addWorkout);

    setWorkoutName("");
    setWorkoutType("");
    setWorkoutMuscle("");
    setWorkoutEquipment("");
    setWorkoutDifficulty("");
    setWorkoutInstructions("");
    navigation.navigate("Today");
  };

  return (
    <ScrollView style={styles.container}>
      <WorkoutHeader onClose={() => handleclose()} />
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
