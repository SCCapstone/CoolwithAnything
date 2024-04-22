import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import MealHeader from "./MealHeader";
import CreateButton from "./CreateButton"; // Reused from previous examples
import { useMeals } from "../services/MealsContext";
import { useNavigation } from "@react-navigation/native";
import { addMealData } from "../services/AuthAPI";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/AddStyles";

const AddMeal = ({ route }) => {
  const navigation = useNavigation();
  const { savedMeals, setSavedMeals } = useMeals();
  const { userID } = route.params;
  const [mealName, setMealName] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealServing, setMealServings] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control modal visibility
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleclose = () => {
    setMealName("");
    setMealIngredients("");
    setMealServings("");
    setMealInstructions("");
    navigation.navigate("Today");
  };

  const handleAdd = async () => {
    if (!mealName || !mealIngredients || !mealServing || !mealInstructions) {
      Alert.alert("Error", "One or more fields are empty.");
      return;
    }

    Alert.alert("Confirm", "Are you sure you want to create the meal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Create",
        onPress: async () => {
          const addMeal = {
            mealName,
            mealIngredients,
            mealServing,
            mealInstructions,
          };

          await addMealData(userID, addMeal);
          setSavedMeals((savedMeals) => [...savedMeals, addMeal]);

          console.log(addMeal);

          setMealName("");
          setMealIngredients("");
          setMealServings("");
          setMealInstructions("");
          setShowConfirmation(true); // Show the confirmation alert
          navigation.navigate("Your Cookbook", { activeTab: "SavedMeals" });
        },
      },
    ]);
  };

  return (
    <View style={styles.screen} testID="add-meal-test">
      <View style={styles.createTextContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.createText} testID="add-meal-safe">Create Meal</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.container}>
        <MealHeader onClose={() => handleclose()} />
        <TextInput
          testID="meal-name"
          style={styles.input}
          value={mealName}
          placeholder="Meal Name"
          placeholderTextColor="grey"
          onChangeText={setMealName}
        />
        <TextInput
          testID="meal-ingredients"
          style={[styles.input, styles.tallInput]}
          value={mealIngredients}
          placeholder="Add ingredients..."
          placeholderTextColor="grey"
          multiline
          onChangeText={setMealIngredients}
        />
        <TextInput
          testID="meal-servings"
          style={styles.input}
          value={mealServing}
          placeholder="Servings"
          placeholderTextColor="grey"
          keyboardType="numeric"
          onChangeText={setMealServings}
        />
        <TextInput
          testID="meal-instructions"
          style={[styles.input, styles.tallInput]}
          value={mealInstructions}
          placeholder="Add instructions..."
          placeholderTextColor="grey"
          multiline
          onChangeText={setMealInstructions}
        />
        <CreateButton onPress={() => handleAdd()} label={"Create Meal"} testID="submit-meal"/>

        {/* Confirmation Alert */}
        {showConfirmation &&
          Alert.alert("Success", "Meal has been added to Saved Meals.", [
            {
              text: "OK",
              onPress: () => setShowConfirmation(false),
            },
          ])}
      </ScrollView>
    </View>
  );
};

export default AddMeal;
