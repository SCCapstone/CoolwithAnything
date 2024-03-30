// CreateWorkoutScreen.js
import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput, Pressable, Text } from "react-native";
import WorkoutHeader from "./WorkoutHeader";
import InputField from "./InputField"; // Reused from Create Task
import ExerciseItem from "./ExerciseItem";
import DaySelector from "./DateTimePicker";
import CommentBox from "./CommentBox"; // Reused from Create Task
import CreateButton from "./CreateButton"; // Reused from Create Task
import { useWorkouts } from "../services/WorkoutsContext";
import { useNavigation } from "@react-navigation/native";
import { addWorkoutData } from "../services/AuthAPI";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/AddStyles";

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
  const { theme } = useTheme();
  const styles = getStyles(theme);

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
      <View style={styles.createTextContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.createText}>Create Workout</Text>
        <View style={{ width: 24 }} />
      </View>
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

export default AddWorkout;
