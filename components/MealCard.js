import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Share,
} from "react-native";

import getStyles from "../styles/CookbookStyle";
import { useTheme } from "../services/ThemeContext";

const MealCard = ({ meal, index, deleteMeal, editMeal }) => {
  const [cardMeal, setCardMeal] = useState(meal);
  const [editMode, setEditMode] = useState(false);
  const [editableMeal, setEditableMeal] = useState({ ...meal });
  const [mealName, setMealName] = useState(meal.mealName);
  const [mealIngredients, setMealIngredients] = useState(meal.mealIngredients);
  const [mealServing, setMealServing] = useState(meal.mealServing);
  const [nameInputHeight, setNameInputHeight] = useState(20); 
  const [ingredientsInputHeight, setIngredientsInputHeight] = useState(20);
  const [servingInputHeight, setServingInputHeight] = useState(20);
  const [instructionsInputHeight, setInstructionsInputHeight] = useState(20);

  const { theme } = useTheme();
  const styles = getStyles(theme);
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

  const handleTextChange = (text, field) => {
    const prefix = `${field}: `;
    let newValue = text.startsWith(prefix) ? text.slice(prefix.length) : text;
    if (text.trim() === prefix.trim()) {
      newValue = '';
    }
  
    switch (field) {
      case "Name":
        setMealName(newValue);
        break;
      case "Ingredients":
        setMealIngredients(newValue);
        break;
      case "Serving Size":
        setMealServing(newValue);
        break;
      case "Instructions":
        setMealInstructions(newValue);
        break;
      default:
        break;
    }
  };

  const handleNameSizeChange = (event) => {
    setNameInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleIngredientsSizeChange = (event) => {
    setIngredientsInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleServingSizeChange = (event) => {
    setServingInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleInstructionsSizeChange = (event) => {
    setInstructionsInputHeight(event.nativeEvent.contentSize.height + 4);
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
      id: meal.id,
    };

    setCardMeal(newMeal);
    editMeal(newMeal, index);
    setEditMode(false);
  };

  return (
    <View style={styles.savedCard}>
      {editMode ? (
        // Edit mode UI with TextInputs for meal properties
        <View>
          <TextInput
    value={`Name: ${mealName}`}
    onChangeText={(text) => handleTextChange(text, "Name")}
    style={[styles.savedText, { height: nameInputHeight }]}
    multiline
    onContentSizeChange={handleNameSizeChange}
  />
  <TextInput
    value={`Ingredients: ${mealIngredients}`}
    onChangeText={(text) => handleTextChange(text, "Ingredients")}
    style={[styles.savedText, { height: ingredientsInputHeight }]}
    multiline
    onContentSizeChange={handleIngredientsSizeChange}
  />
  <TextInput
    value={`Serving Size: ${mealServing}`}
    onChangeText={(text) => handleTextChange(text, "Serving Size")}
    style={[styles.savedText, { height: servingInputHeight }]}
    multiline
    onContentSizeChange={handleServingSizeChange}
  />
  <TextInput
    value={`Instructions: ${mealInstructions}`}
    onChangeText={(text) => handleTextChange(text, "Instructions")}
    style={[styles.savedText, { height: instructionsInputHeight }]}
    multiline
    onContentSizeChange={handleInstructionsSizeChange}
  />
          {/* ... other TextInputs for editing meal properties */}
          <View>
            <Pressable style={styles.buttonOptions} onPress={onCancel}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable style={styles.buttonOptions} onPress={onSave}>
              <Text>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        // Display mode UI with Text for meal properties
        <View>
          <Text style={styles.savedText}>Name: {meal.mealName}</Text>
          <Text style={styles.savedText}>
            Ingredients: {meal.mealIngredients}
          </Text>
          <Text style={styles.savedText}>Serving size: {meal.mealServing}</Text>
          <Text style={styles.savedText}>
            Instructions: {meal.mealInstructions}
          </Text>

          <View>
            <Pressable
              style={styles.buttonOptions}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.optionText}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.buttonOptions}
              onPress={() => deleteMeal(index)}
            >
              <Text style={styles.optionText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.buttonOptions} onPress={myShare}>
              <Text style={styles.optionText}>Share</Text>
            </Pressable>
            </View>
          </View>
        )}
      </View>
    
  );
};

export default MealCard;
