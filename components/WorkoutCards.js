import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView, BackHandler } from "react-native";
import getStyles from "../styles/WorkoutStyles.js";
import { useTheme } from "../services/ThemeContext.js";
import { addWorkoutData } from "../services/AuthAPI";
import { useWorkouts } from "../services/WorkoutsContext";

const WorkoutCards = ({
  apiData,
  handleCardPress,
  selectedExercise,
  closeModal,
  route,
}) => {
  const { userID } = route.userID;
  const [modalVisible, setModalVisible] = useState(false);
  const { savedWorkouts, setSavedWorkouts } = useWorkouts();
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutMuscle, setWorkoutMuscle] = useState("");
  const [workoutEquipment, setWorkoutEquipment] = useState("");
  const [workoutDifficulty, setWorkoutDifficulty] = useState("");
  const [workoutInstructions, setWorkoutInstructions] = useState("");
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleAddExercise = async () => {
    // Save the selected exercise to workout data state variables
    setWorkoutName(selectedExercise.name);
    setWorkoutType(selectedExercise.type);
    setWorkoutMuscle(selectedExercise.muscle);
    setWorkoutEquipment(selectedExercise.equipment);
    setWorkoutDifficulty(selectedExercise.difficulty);
    setWorkoutInstructions(selectedExercise.instructions);
  
    // Create the workout object
    const addWorkout = {
      workoutName,
      workoutType,
      workoutMuscle,
      workoutEquipment,
      workoutDifficulty,
      workoutInstructions,
    };
  
    // Add the workout data
    await addWorkoutData(userID, addWorkout);
    setSavedWorkouts((savedWorkouts) => [...savedWorkouts, addWorkout]);
  
    // Reset the workout data state variables if needed
    setWorkoutName("");
    setWorkoutType("");
    setWorkoutMuscle("");
    setWorkoutEquipment("");
    setWorkoutDifficulty("");
    setWorkoutInstructions("");
  
    console.log(addWorkout);
  };
  

  return (
    <ScrollView>
      <View style={styles.background}>
        {apiData.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => handleCardPress(exercise)}
          >
            <View style={styles.cardContent}>
              <Text>
                <Text style={styles.label}>Name:</Text> {exercise.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for detailed information */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedExercise !== ""}
        onRequestClose={closeModal}
      >
        <View>
          <Text style={styles.cardModalHeader}>Exercise Details</Text>
          {selectedExercise && (
            <View style={styles.modalContent}>
              <Text>
                <Text style={styles.label}>Name:</Text> {selectedExercise.name}
              </Text>
              <Text>
                <Text style={styles.label}>Type:</Text> {selectedExercise.type}
              </Text>
              <Text>
                <Text style={styles.label}>Muscle:</Text>{" "}
                {selectedExercise.muscle}
              </Text>
              <Text>
                <Text style={styles.label}>Equipment:</Text>{" "}
                {selectedExercise.equipment}
              </Text>
              <Text>
                <Text style={styles.label}>Difficulty:</Text>{" "}
                {selectedExercise.difficulty}
              </Text>
              <Text>
                <Text style={styles.label}>Instruction:</Text>{" "}
                {selectedExercise.instructions}
              </Text>
            </View>
          )}
          {/* Add button */}
{      /*    <TouchableOpacity onPress={handleAddExercise}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeButton1}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default WorkoutCards;
