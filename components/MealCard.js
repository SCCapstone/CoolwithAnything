import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

const mealStyles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      borderColor: "black",
      padding: 16,
      borderRadius: 8,
      margin: 8,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
    },
  });

const MealCard = ({ meal, index, deleteMeal, editMeal }) => {
  const [cardMeal, setCardMeal] = useState(meal);

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(meal.name);
  const [calories, setCalories] = useState(meal.calories);
  const [servingSize, setServingSize] = useState(meal.servingSize);
  const [fatTotal, setFatTotal] = useState(meal.fatTotal);
  const [fatSaturated, setFatSaturated] = useState(meal.fatSaturated);
  const [protein, setProtein] = useState(meal.protein);
  const [sodium, setSodium] = useState(meal.sodium);
  const [potassium, setPotassium] = useState(meal.potassium);
  const [cholesterol, setCholesterol] = useState(meal.cholesterol);
  const [carbohydratesTotal, setCarbohydratesTotal] = useState(
    meal.carbohydratesTotal
  );
  const [fiber, setFiber] = useState(meal.fiber);
  const [sugar, setSugar] = useState(meal.sugar);

  // Function to handle canceling the edit operation
  const onCancel = () => {
    setName(meal.name);
    setCalories(meal.calories);
    setServingSize(meal.servingSize);
    setFatTotal(meal.fatTotal);
    setFatSaturated(meal.fatSaturated);
    setProtein(meal.protein);
    setSodium(meal.sodium);
    setPotassium(meal.potassium);
    setCholesterol(meal.cholesterol);
    setCarbohydratesTotal(meal.carbohydratesTotal);
    setFiber(meal.fiber);
    setSugar(meal.sugar);

    setEditMode(false);
  };

  // Function to handle saving the edited meal
  const onSave = () => {
    const newMeal = {
      name,
      calories,
      servingSize,
      fatTotal,
      fatSaturated,
      protein,
      sodium,
      potassium,
      cholesterol,
      carbohydratesTotal,
      fiber,
      sugar,
    };

    setCardMeal(newMeal);
    editMeal(newMeal, index);
    setEditMode(false);
  };

  return (
    <View style={mealStyles.card}>
      {editMode ? (
        // Edit mode UI with TextInputs for meal properties
        <View>
          <TextInput
            value={name}
            onChangeText={setName}
            style={mealStyles.text}
            placeholder="Name"
          />
          <TextInput
            value={String(calories)}
            onChangeText={(text) => setCalories(text)}
            style={mealStyles.text}
            placeholder="Calories"
            keyboardType="numeric"
          />
          {/* ... other TextInputs for editing meal properties */}
          <View>
            <Pressable style={mealStyles.button} onPress={onCancel}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable style={mealStyles.button} onPress={onSave}>
              <Text>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        // Display mode UI with Text for meal properties
        <View>
          <Text style={mealStyles.text}>Name: {cardMeal.name}</Text>
          <Text style={mealStyles.text}>Calories: {cardMeal.calories}</Text>
          {/* ... other Text components for displaying meal properties */}
          <View>
            <Pressable style={mealStyles.button} onPress={() => setEditMode(true)}>
              <Text>Edit</Text>
            </Pressable>
            <Pressable style={mealStyles.button} onPress={() => deleteMeal(index)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default MealCard;
