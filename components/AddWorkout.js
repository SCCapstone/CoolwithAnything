import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import WorkoutHeader from "./WorkoutHeader";
import InputField from "./InputField";
import CreateButton from "./CreateButton";
import { useWorkouts } from "../services/WorkoutsContext";
import { useNavigation } from "@react-navigation/native";
import { addWorkoutData } from "../services/AuthAPI";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/AddStyles";

const AddWorkout = ({ route }) => {
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
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control modal visibility

  const handleClose = () => {
    setWorkoutName("");
    setWorkoutType("");
    setWorkoutMuscle("");
    setWorkoutEquipment("");
    setWorkoutDifficulty("");
    setWorkoutInstructions("");
    navigation.navigate("Today");
  };

  const handleAdd = async () => {
    if (
      !workoutName ||
      !workoutType ||
      !workoutMuscle ||
      !workoutEquipment ||
      !workoutDifficulty ||
      !workoutInstructions
    ) {
      Alert.alert("Error", "One or more fields are empty.");
      return;
    }

    Alert.alert("Confirm", "Are you sure you want to create the workout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Create",
        onPress: async () => {
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
          setShowConfirmation(true); // Show the confirmation alert
          navigation.navigate("Your Workouts", { activeTab: "SavedWorkouts" });
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.createTextContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.createText}>Create Workout</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.container}>
        <WorkoutHeader onClose={() => handleClose()} />
        <TextInput
          style={styles.input}
          value={workoutName}
          placeholder="Workout Name"
          placeholderTextColor="grey"
          onChangeText={setWorkoutName}
        />
        <TextInput
          style={styles.input}
          value={workoutType}
          placeholder="Type"
          placeholderTextColor="grey"
          onChangeText={setWorkoutType}
        />
        <TextInput
          style={styles.input}
          value={workoutMuscle}
          placeholder="Muscle"
          placeholderTextColor="grey"
          onChangeText={setWorkoutMuscle}
        />
        <TextInput
          style={styles.input}
          value={workoutEquipment}
          placeholder="Equipment"
          placeholderTextColor="grey"
          onChangeText={setWorkoutEquipment}
        />
        <TextInput
          style={styles.input}
          value={workoutDifficulty}
          placeholder="Difficulty"
          placeholderTextColor="grey"
          onChangeText={setWorkoutDifficulty}
        />
        <TextInput
          style={[styles.input, styles.tallInput]}
          value={workoutInstructions}
          placeholder="Add instructions..."
          placeholderTextColor="grey"
          multiline
          onChangeText={setWorkoutInstructions}
        />
        <CreateButton onPress={() => handleAdd()} label={"Create Workout"} />

        {/* Confirmation Alert */}
        {showConfirmation &&
          Alert.alert("Success", "Workout has been added to Saved Workouts.", [
            {
              text: "OK",
              onPress: () => setShowConfirmation(false),
            },
          ])}
      </ScrollView>
    </View>
  );
};

export default AddWorkout;
