import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MealHeader from "./MealHeader";
import IngredientItem from "./IngredientItem";
import DirectionsBox from "./DirectionsBox";
import CreateButton from "./CreateButton"; // Reused from previous examples
import InputField from "./InputField"; // Reused from previous examples
import CommentBox from "./CommentBox";
import { useMeals } from "../services/MealsContext";
import { useNavigation } from "@react-navigation/native";
import { addMealData } from "../services/AuthAPI";

const AddMeal = ({ route }) => {
  const navigation = useNavigation();
  const { savedMeals, setSavedMeals } = useMeals();
  const { userID } = route.params;
  const [mealName, setMealName] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealServing, setMealServings] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");

  const handleclose = () => {
    setMealName("");
    setMealIngredients("");
    setMealServings("");
    setMealInstructions("");
    navigation.navigate("Today");
  };
  const handleAdd = async () => {
    console.log(mealName);
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
    navigation.navigate("Today");
  };
  return (
    <ScrollView style={styles.container}>
      <MealHeader onClose={() => handleclose()} />
      <InputField
        value={mealName}
        placeholder="Meal Name"
        onChangeText={setMealName}
      />

      <DirectionsBox
        value={mealIngredients}
        onChangeText={setMealIngredients}
      />
      <InputField
        value={mealServing}
        placeholder="Servings"
        onChangeText={setMealServings}
      />
      <CommentBox value={mealInstructions} onChangeText={setMealInstructions} />
      <CreateButton onPress={() => handleAdd()} label={"Create Meal"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    alignItems: "center",
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: "blue",
  },
  totalCalories: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default AddMeal;
