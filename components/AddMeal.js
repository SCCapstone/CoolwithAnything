import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
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
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/AddStyles";

const AddMeal = ({ route }) => {
  const navigation = useNavigation();
  const { savedMeals, setSavedMeals } = useMeals();
  const { userID } = route.params;
  const [mealName, setMealName] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealServing, setMealServings] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
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

      <View style={styles.createTextContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.createText}>Create Meal</Text>
        <View style={{ width: 24 }} />
      </View>

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

export default AddMeal;
