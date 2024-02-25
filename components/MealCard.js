import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Share,
} from "react-native";

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
  button: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#ededed",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

const MealCard = ({ meal, index, deleteMeal, editMeal }) => {
  const [cardMeal, setCardMeal] = useState(meal);

  const [editMode, setEditMode] = useState(false);
  const [editableMeal, setEditableMeal] = useState({ ...meal });
  const [mealName, setMealName] = useState(meal.mealName);
  const [mealIngredients, setMealIngredients] = useState(meal.mealIngredients);
  const [mealServing, setMealServing] = useState(meal.mealServing);
  const [mealInstructions, setMealInstructions] = useState(
    meal.mealInstructions
  );
  const myShare = async () => {
    try {
      const result = await Share.share({
        message: `Meal\nMeal Name: ${meal.mealName}\nIngredients: ${meal.mealIngredients}
        \nServing size: ${meal.mealServing} \nInstruction: ${meal.mealInstructions}`,
      });
      if (result.action == Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of: ", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        confirm.log("dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Function to handle canceling the edit operation
  const onCancel = () => {
    setEditableMeal({ ...meal });
    setEditMode(false);
  };

  // Function to handle saving the edited meal
  const onSave = () => {
    const newMeal = {
      mealName,
      mealIngredients,
      mealServing,
      mealInstructions,
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
            value={mealName}
            onChangeText={setMealName}
            style={mealStyles.text}
          />
          <TextInput
            value={String(mealIngredients)}
            onChangeText={setMealIngredients}
            style={mealStyles.text}
          />
          <TextInput
            value={mealServing}
            onChangeText={setMealServing}
            style={mealStyles.text}
          />
          <TextInput
            value={mealInstructions}
            onChangeText={setMealInstructions}
            style={mealStyles.text}
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
          <Text style={mealStyles.text}>Name: {meal.mealName}</Text>
          <Text style={mealStyles.text}>
            Ingredients: {meal.mealIngredients}
          </Text>
          <Text style={mealStyles.text}>Serving size: {meal.mealServing}</Text>
          <Text style={mealStyles.text}>
            Instructions: {meal.mealInstructions}
          </Text>

          <View>
            <Pressable
              style={mealStyles.button}
              onPress={() => setEditMode(true)}
            >
              <Text>Edit</Text>
            </Pressable>
            <Pressable
              style={mealStyles.button}
              onPress={() => deleteMeal(index)}
            >
              <Text>Delete</Text>
            </Pressable>
            <Pressable style={mealStyles.button} onPress={myShare}>
              <Text style={mealStyles.buttonText}>Share</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default MealCard;