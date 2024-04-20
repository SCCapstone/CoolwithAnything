import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import NumberInput from "../components/NumberInput";
import SelectionButton from "../components/SelectionButton";
import SubmitButton from "../components/SubmitButton";
import styles from "../styles/BiometricScreenStyle";
import { updateBiometrics } from "../services/AuthAPI";

const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];
const fitnessGoals = ["Lose Weight", "Build Muscle"];

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const bubbleSize = width * 0.7;
const bubblePosition = { top: -height * 0.175, left: width * 0.1 };

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

    // Handle the hardware back button on Android devices
    useEffect(() => {
      const backAction = () => {
        return true;
      };
  
      // Add the back press event listener
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      // Remove the event listener when the component is unmounted or no longer focused
      return () => backHandler.remove();
    }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBubble}>
          <View
            style={[
              styles.bubble,
              {
                width: bubbleSize,
                height: bubbleSize,
                borderRadius: bubbleSize / 2,
                ...bubblePosition,
              },
            ]}
          />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtittle}>Let us know more about you</Text>
          <Text style={styles.subtittle2}>Biometric</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.inputFields}>
            <NumberInput
              value={height}
              keyboardType="numeric"
              onChangeText={setHeight}
              placeholder="Height (ft)"
            />
          </View>
          <View style={styles.inputFields}>
            <NumberInput
              value={weight}
              keyboardType="numeric"
              onChangeText={setWeight}
              placeholder="Weight (lbs)"
            />
          </View>
          <Text style={styles.inputFieldsCaption}>Fitness Level</Text>
          {fitnessLevels.map((level) => (
            <View key={level} style={styles.inputFields}>
              <SelectionButton
                key={level}
                title={level}
                selected={fitnessLevel === level}
                onPress={() => handleFitnessLevelSelect(level)}
              />
            </View>
          ))}
          <Text style={styles.inputFieldsCaption}>Fitness Goal</Text>
          {fitnessGoals.map((goal) => (
            <View key={goal} style={styles.inputFields}>
              <SelectionButton
                key={goal}
                title={goal}
                selected={fitnessGoal === goal}
                onPress={() => handleFitnessGoalSelect(goal)}
              />
            </View>
          ))}
          <View style={{ padding: 10 }}>
            <SubmitButton title="Submit" onPress={handleBio} />
          </View>
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Confirmation")}
            >
              <Text style={styles.buttonText}>Skip Bio</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BiometricScreen;
