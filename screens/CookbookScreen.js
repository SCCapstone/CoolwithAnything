import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import CookbookApi from "../APIs/CookbookAPI";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const BrowseMeals = ({ searchTerm, setSearchTerm }) => {
  const [showApi, setShowApi] = useState(false);

  return (
    <View>
      {/* Button to toggle displaying the API data */}
      <TouchableOpacity onPress={() => setShowApi(!showApi)}>
        <Text>{showApi ? 'Hide API Data' : 'Show API Data'}</Text>
      </TouchableOpacity>

      {/* Render WorkoutApi component conditionally based on showApi state */}
      {showApi && <CookbookApi />}
    </View>
  );
};
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
    <View>
      {editMode ? (
        <View style={mealStyles.card}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={mealStyles.text}
            placeholder="Name"
          />
          <TextInput
            value={calories}
            onChangeText={setCalories}
            style={mealStyles.text}
            placeholder="Calories"
          />
          <TextInput
            value={servingSize}
            onChangeText={setServingSize}
            style={mealStyles.text}
            placeholder="Serving Size"
          />
          <TextInput
            value={fatTotal}
            onChangeText={setFatTotal}
            style={mealStyles.text}
            placeholder="Total Fat"
          />
          <TextInput
            value={fatSaturated}
            onChangeText={setFatSaturated}
            style={mealStyles.text}
            placeholder="Saturated Fat"
          />
          <TextInput
            value={protein}
            onChangeText={setProtein}
            style={mealStyles.text}
            placeholder="Protein"
          />
          <TextInput
            value={sodium}
            onChangeText={setSodium}
            style={mealStyles.text}
            placeholder="Sodium"
          />
          <TextInput
            value={potassium}
            onChangeText={setPotassium}
            style={mealStyles.text}
            placeholder="Potassium"
          />
          <TextInput
            value={cholesterol}
            onChangeText={setCholesterol}
            style={mealStyles.text}
            placeholder="Cholesterol"
          />
          <TextInput
            value={carbohydratesTotal}
            onChangeText={setCarbohydratesTotal}
            style={mealStyles.text}
            placeholder="Total Carbohydrates"
          />
          <TextInput
            value={fiber}
            onChangeText={setFiber}
            style={mealStyles.text}
            placeholder="Fiber"
          />
          <TextInput
            value={sugar}
            onChangeText={setSugar}
            style={mealStyles.text}
            placeholder="Sugar"
          />
          <View>
            <Pressable onPress={onCancel}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={onSave}>
              <Text>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={mealStyles.card}>
          <Text style={mealStyles.text}>Name: {cardMeal.name}</Text>
          <Text style={mealStyles.text}>Calories: {cardMeal.calories}</Text>
          <Text style={mealStyles.text}>
            Serving Size: {cardMeal.servingSize}
          </Text>
          <Text style={mealStyles.text}>Total Fat: {cardMeal.fatTotal}</Text>
          <Text style={mealStyles.text}>
            Saturated Fat: {cardMeal.fatSaturated}
          </Text>
          <Text style={mealStyles.text}>Protein: {cardMeal.protein}</Text>
          <Text style={mealStyles.text}>Sodium: {cardMeal.sodium}</Text>
          <Text style={mealStyles.text}>Potassium: {cardMeal.potassium}</Text>
          <Text style={mealStyles.text}>
            Cholesterol: {cardMeal.cholesterol}
          </Text>
          <Text style={mealStyles.text}>
            Total Carbohydrates: {cardMeal.carbohydratesTotal}
          </Text>
          <Text style={mealStyles.text}>Fiber: {cardMeal.fiber}</Text>
          <Text style={mealStyles.text}>Sugar: {cardMeal.sugar}</Text>
          <View>
            <Pressable onPress={() => setEditMode(true)}>
              <Text>Edit</Text>
            </Pressable>
            <Pressable onPress={() => deleteMeal(index)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};
const SavedMeals = ({ meals, setSavedMeals }) => {
  useEffect(() => {}, [meals]);

  const deleteMeal = (index) => {
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setSavedMeals(newMeals);
  };

  const editMeal = (cardMeal, index) => {
    const newMeals = [...meals];
    newMeals[index] = cardMeal;
    setSavedMeals(newMeals);
  };

  return (
    <ScrollView style={{ flex: 1, overflow: "scroll" }}>
      {meals != null &&
        meals.length > 0 &&
        meals.map((meal, index) => {
          return (
            <MealCard
              key={index}
              index={index}
              meal={meal}
              editMeal={editMeal}
              deleteMeal={deleteMeal}
            />
          );
        })}
    </ScrollView>
  );
};

const Tab = createMaterialTopTabNavigator();

const CookbookScreen = ({ savedMeals, setSavedMeals }) => {
  useEffect(() => {}, [savedMeals]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Browse Meals"
        component={BrowseMeals}
        options={{ tabBarLabel: "Browse" }}
      />
      <Tab.Screen
        name="Saved Meals"
        options={{ tabBarLabel: "Saved" }}
      >
        {() => (
          <SavedMeals meals={savedMeals} setSavedMeals={setSavedMeals} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default CookbookScreen;