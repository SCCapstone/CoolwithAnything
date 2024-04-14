import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import getStyles from "../styles/WorkoutStyles.js";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useTheme } from "../services/ThemeContext.js";
import { addWorkoutData } from "../services/AuthAPI";
import { useWorkouts } from "../services/WorkoutsContext";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutCards = ({
  apiData,
  handleCardPress,
  selectedExercise,
  closeModal,
}) => {
  const auth = getAuth();
  const userID = auth.currentUser ? auth.currentUser.uid : null;
  const { setSavedWorkouts } = useWorkouts();
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
    console.log(workoutName);

    const addWorkout = {
      workoutName: selectedExercise.name,
      workoutType: selectedExercise.type,
      workoutMuscle: selectedExercise.muscle,
      workoutEquipment: selectedExercise.equipment,
      workoutDifficulty: selectedExercise.difficulty,
      workoutInstructions: selectedExercise.instructions,
    };

    // Add the workout data
    await addWorkoutData(userID, addWorkout);
    setSavedWorkouts((savedWorkouts) => [...savedWorkouts, addWorkout]);

    console.log(addWorkout);

    // Save the selected exercise to workout data state variables
    setWorkoutName(workoutName);
    setWorkoutType(workoutType);
    setWorkoutMuscle(workoutMuscle);
    setWorkoutEquipment(workoutEquipment);
    setWorkoutDifficulty(workoutDifficulty);
    setWorkoutInstructions(workoutInstructions);

    closeModal();

    Alert.alert("Workout added to saved");
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={apiData}
        keyExtractor={(exercise, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handleCardPress(item)}
          >
            <MaterialCommunityIcons
              name={"dumbbell"}
              size={150}
              color={"#5da8af"}
            />
            <View style={styles.cardContent}>
              <Text style={styles.modal}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: "2.5%", // Adjust horizontal padding for two-column layout
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for detailed information */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedExercise !== ""}
        onRequestClose={closeModal}
      >
        <SafeAreaView>
          <View style={styles.workoutCardsTextContainer}>
            <Pressable onPress={handleCloseModal}>
              <Text style={styles.backButton}>←</Text>
            </Pressable>
            <Text style={styles.workoutText}>Workouts</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"dumbbell"}
                  size={150}
                  color={"#5da8af"}
                />
              </View>
              <Text style={styles.cardModalHeader}>Exercise Details</Text>
              {selectedExercise && (
                <View style={styles.modalContent}>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Name:</Text>{" "}
                    <Text style={styles.apiText}>{selectedExercise.name}</Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Type:</Text>{" "}
                    <Text style={styles.apiText}>{selectedExercise.type}</Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Muscle:</Text>{" "}
                    <Text style={styles.apiText}>
                      {selectedExercise.muscle}
                    </Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Equipment:</Text>{" "}
                    <Text style={styles.apiText}>
                      {selectedExercise.equipment}
                    </Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Difficulty:</Text>{" "}
                    <Text style={styles.apiText}>
                      {selectedExercise.difficulty}
                    </Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Instruction:</Text>{" "}
                    <Text style={styles.apiText}>
                      {selectedExercise.instructions}
                    </Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Need Help?</Text>{" "}
                    <Text style={styles.apiText}>
                      Link
                    </Text>
                  </Text>
                </View>
              )}
              {/* Add button */}
              <TouchableOpacity onPress={handleAddExercise}>
                <Text style={styles.addButton}>+ Add Workout to Saved</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default WorkoutCards;
