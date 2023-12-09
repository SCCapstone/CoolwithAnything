import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { updateBiometrics } from "../ApiService";

const BioMetricScreen = ({ navigation, route }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitness_level, setFitnessLevel] = useState("");
  const [fitness_goal, setFitnessGoal] = useState("");
  // Function to handle fitness level selection
  const handleFitnessLevelSelect = (level) => {
    setFitnessLevel(level);
  };

  // Function to handle fitness goal selection
  const handleFitnessGoalSelect = (goal) => {
    setFitnessGoal(goal);
  };

  const {username} = route.params;

  const handleBio = async () => {
    try {
      const { status, data } = await updateBiometrics(
        username,
        height,
        weight,
        fitness_level,
        fitness_goal
      );
      if (status === 200) {
        // Handle successful signup
        Alert.alert("Update Successful", data.message || "Bio update successfully.");
        console.log({ height, weight, fitness_level, fitness_goal });
        navigation.navigate('Confirmation');
      } else {
        // Handle errors
        Alert.alert("Signup Failed", data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Update Failed",
        "An error occurred during updating biometrics"
      );
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Bio-metrics</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Height (cm)"
          keyboardType="numeric"
          style={styles.input}
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          placeholder="Weight (kg)"
          keyboardType="numeric"
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      {/* Fitness Level Buttons */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fitness Level:</Text>
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.button,
              fitness_level === level && styles.highlightedButton,
            ]}
            onPress={() => handleFitnessLevelSelect(level)}
          >
            <Text style={styles.buttonText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Fitness Goal Buttons */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fitness Goal:</Text>
        {["Lose Weight", "Build Muscle"].map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.button,
              fitness_goal === goal && styles.highlightedButton,
            ]}
            onPress={() => handleFitnessGoalSelect(goal)}
          >
            <Text style={styles.buttonText}>{goal}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={() => handleBio()}>
        <Text style={styles.signUpButtonText}>Add Bio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Confirmation")}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#e7e7e7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  highlightedButton: {
    backgroundColor: "#4CAF50", // Highlight color, change as needed
    borderColor: "#388E3C", // Optional: border color if needed
    borderWidth: 1, // Optional: border width if needed
  },
  signUpButton: {
    backgroundColor: "#5cb85c",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  skipButton: {
    marginTop: 10,
  },
  skipButtonText: {
    color: "#555",
  },
});

export default BioMetricScreen;
