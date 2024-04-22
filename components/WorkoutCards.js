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
  Image,
} from "react-native";
import getStyles from "../styles/WorkoutStyles.js";
import { getAuth } from "firebase/auth";
import { useTheme } from "../services/ThemeContext.js";
import { addWorkoutData } from "../services/AuthAPI";
import { useWorkouts } from "../services/WorkoutsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const imageMapping = {
  "Incline Hammer Curls": require("../images/workouts/incline_hammer.png"),
  "Wide-grip barbell curl": require("../images/workouts/wide_grip_bb_curl.png"),
  "EZ-bar spider curl": require("../images/workouts/ez_bar_spider.png"),
  "Hammer Curls": require("../images/workouts/hammer.png"),
  "EZ-Bar Curl": require("../images/workouts/ez_bar.png"),
  "Zottman Curl": require("../images/workouts/zottman.png"),
  "Biceps curl to shoulder press": require("../images/workouts/bi_to_shoulder.png"),
  "Barbell Curl": require("../images/workouts/barbell.png"),
  "Concentration curl": require("../images/workouts/concentration.png"),
  "Flexor Incline Dumbbell Curls": require("../images/workouts/flex_incline_db.png"),

  "Barbell glute bridge": require("../images/workouts/bb_glute_bridge.png"),
  "Barbell Hip Thrust": require("../images/workouts/bb_hip_thrust.png"),
  "Single-leg cable hip extension": require("../images/workouts/single_leg_extenstion.png"),
  "Glute bridge": require("../images/workouts/glute_bridge.png"),
  "Single-leg glute bridge": require("../images/workouts/single_glute.png"),
  "Step-up with knee raise": require("../images/workouts/step_up_knee.png"),
  "Kettlebell thruster": require("../images/workouts/kettlebell_thruster.png"),
  "Kneeling Squat": require("../images/workouts/kneeling_squat.png"),
  "Flutter Kicks": require("../images/workouts/flutter_kicks.png"),
  "Glute Kickback": require("../images/workouts/glute_kickback.png"),

  "Landmine twist": require("../images/workouts/landmine_twist.png"),
  "Elbow plank": require("../images/workouts/elbow_plank.png"),
  "Bottoms Up": require("../images/workouts/bottoms_up.png"),
  "Suspended ab fall-out": require("../images/workouts/suspended_ab.png"),
  "Dumbbell V-Sit Cross Jab": require("../images/workouts/cross_jab.png"),
  "Standing cable low-to-high twist": require("../images/workouts/low_to_high.png"),
  "Dumbbell spell caster": require("../images/workouts/spell_caster.png"),
  "Decline reverse crunch": require("../images/workouts/decline_rev_cruch.png"),
  "Spider crawl": require("../images/workouts/spider_crawl.png"),
  "Cocoons": require("../images/workouts/cocoons.png"),

  "Single-Leg Press": require("../images/workouts/single_leg_press.png"),
  "Clean from Blocks": require("../images/workouts/clean_from_blocks.png"),
  "Barbell Full Squat": require("../images/workouts/full_squat.png"),
  "Tire flip": require("../images/workouts/tire_flips.png"),
  "Barbell back squat to box": require("../images/workouts/squat_to_box.png"),
  "Push-press": require("../images/workouts/push_press.png"),
  "Power snatch-": require("../images/workouts/power_snatch.png"),
  "Hang Clean": require("../images/workouts/hang_clean.png"),
  "Reverse Band Box Squat": require("../images/workouts/r_box_squat.png"),
  "Jumping rope": require("../images/workouts/jump_rope.png"),

}

const WorkoutCards = ({
  apiData,
  handleCardPress,
  selectedExercise,
  closeModal,
}) => {
  const auth = getAuth();
  const navigation = useNavigation();
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

    navigation.navigate("Your Workouts", { activeTab: "SavedWorkouts" });
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
            <Image
              source={imageMapping[item.name]}
              style={styles.iconContainer}
            />
            <View style={styles.cardContent}>
              <Text style={styles.modal}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        
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
              <Image
                  source={imageMapping[selectedExercise.name]}
                  style={styles.imageDetails}
                />
              </View>
              <Text style={styles.cardModalHeader}>Exercise Details</Text>
              {selectedExercise && (
                <View style={styles.modalContent}>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>{selectedExercise.name}</Text>
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
                    <Text style={styles.label}>Instructions: {"\n"}</Text>
                    {selectedExercise.instructions
                      .split(".")
                      .map((step) => step.trim()) // Trim whitespace from each step
                      .filter((step) => step.length > 0) // Filter out any empty strings
                      .map((step, index) => (
                        <Text key={index} style={styles.apiText}>
                          {"\n" + (index + 1)}. {step}
                        </Text>
                      ))}
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
