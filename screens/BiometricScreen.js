import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, TextInput } from "react-native";
import NumberInput from "../components/NumberInput";
import SelectionButton from "../components/SelectionButton";
import SubmitButton from "../components/SubmitButton";
import styles from "../styles/BiometricScreenStyle";
import { updateBiometrics } from "../services/AuthAPI";

const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];
const fitnessGoals = ["Lose Weight", "Build Muscle"];

const BiometricScreen = ({ navigation, route }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState(null);
  const [fitnessGoal, setFitnessGoal] = useState(null);

  // Function to handle fitness level selection
  const handleFitnessLevelSelect = (level) => {
    setFitnessLevel(level);
  };

  // Function to handle fitness goal selection
  const handleFitnessGoalSelect = (goal) => {
    setFitnessGoal(goal);
  };

  const { userId } = route.params;

  const handleBio = async () => {
    try {
      const response = await updateBiometrics(
        userId,
        height,
        weight,
        fitnessLevel,
        fitnessGoal
      );

      if (response.status === "success") {
        // Update successful
        Alert.alert(
          "Update Successful",
          "Your biometrics have been updated successfully."
        );
        navigation.navigate("Confirmation");
      } else {
        // Handle any other cases
        Alert.alert(
          "Update Unsuccessful",
          "Could not update biometrics. Please try again."
        );
      }
    } catch (error) {
      // Handle errors from Firebase
      console.error(error);
      Alert.alert(
        "Update Failed",
        error.message || "An error occurred during updating biometrics"
      );
    }
  };

  return (
    <View style={styles.container}>
      <NumberInput
        value={height}
        keyboardType="numeric"
        onChangeText={setHeight}
        placeholder="Height (ft)"
      />
      <NumberInput
        value={weight}
        keyboardType="numeric"
        onChangeText={setWeight}
        placeholder="Weight (lbs)"
      />
      <Text>Fitness Level</Text>
      {fitnessLevels.map((level) => (
        <SelectionButton
          key={level}
          title={level}
          selected={fitnessLevel === level}
          onPress={() => handleFitnessLevelSelect(level)}
        />
      ))}
      <Text>Fitness Goal</Text>
      {fitnessGoals.map((goal) => (
        <SelectionButton
          key={goal}
          title={goal}
          selected={fitnessGoal === goal}
          onPress={() => handleFitnessGoalSelect(goal)}
        />
      ))}
      <SubmitButton title="Submit" onPress={handleBio} />
    </View>
  );
};

export default BiometricScreen;
