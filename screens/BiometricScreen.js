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
const { width, height: screenHeight } = Dimensions.get("window");

const bubbleSize = width * 0.7;
const bubblePosition = { top: -screenHeight * 0.175, left: width * 0.1 };

const BiometricScreen = ({ navigation, route }) => {
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [weight, setWeight] = useState(0);
  const [fitnessLevel, setFitnessLevel] = useState(null);
  const [fitnessGoal, setFitnessGoal] = useState(null);

  const { userId } = route.params;

  const handleBio = async () => {
    if (!feet || !inches || !weight || !fitnessLevel || !fitnessGoal) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all fields or select Skip Bio",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const response = await updateBiometrics(
        userId,
        feet,
        inches,
        weight,
        fitnessLevel,
        fitnessGoal
      );

      if (response.status === "success") {
        Alert.alert(
          "Update Successful",
          "Your biometrics have been updated successfully."
        );
        navigation.navigate("Confirmation");
      } else {
        Alert.alert(
          "Update Unsuccessful",
          "Could not update biometrics. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Update Failed",
        error.message || "An error occurred during updating biometrics"
      );
    }
  };

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ paddingBottom: 20 }}>
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
          <View style={styles.heightAndWeightContainer}>
            <Text style={styles.inputFieldsCaption}>Height:</Text>
            <NumberInput
              value={feet}
              style={styles.heightInput}
              keyboardType="numeric"
              onChangeText={setFeet}
              placeholder="feet (ft)"
            />
            <NumberInput
              value={inches}
              style={styles.heightInput}
              keyboardType="numeric"
              onChangeText={setInches}
              placeholder="inch (in)"
            />
          </View>
          <View style={styles.heightAndWeightContainer}>
            <Text style={styles.inputFieldsCaption}>Weight:</Text>
            <NumberInput
              value={weight}
              keyboardType="numeric"
              style={styles.weightInput}
              onChangeText={setWeight}
              placeholder="pounds (lbs)"
            />
          </View>
          <Text style={styles.inputFieldsCaption}>Fitness Level</Text>
          {fitnessLevels.map((level) => (
            <View key={level} style={styles.inputFields}>
              <SelectionButton
                title={level}
                selected={fitnessLevel === level}
                onPress={() => setFitnessLevel(level)}
              />
            </View>
          ))}
          <Text style={styles.inputFieldsCaption}>Fitness Goal</Text>
          {fitnessGoals.map((goal) => (
            <View key={goal} style={styles.inputFields}>
              <SelectionButton
                title={goal}
                selected={fitnessGoal === goal}
                onPress={() => setFitnessGoal(goal)}
              />
            </View>
          ))}
          <View style={{ padding: 10 }}>
            <SubmitButton title="Submit" onPress={handleBio} />
          </View>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Confirmation")}>
              <Text style={styles.buttonText}>Skip Bio</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BiometricScreen;
