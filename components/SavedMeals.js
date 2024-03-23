import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import MealCard from "./MealCard";
import { useMeals } from "../services/MealsContext";
import {
  deleteMealData,
  getMealData,
  getMeals,
  updateMealData,
} from "../services/AuthAPI";

const SavedMeals = (props) => {
  //const { savedMeals, setSavedMeals } = useMeals();
  const [savedMeals, setSavedMeals] = useState();
  useEffect(() => {
    getMeals(); // Code to run when meals change, if necessary
  }, []);

  const getMeals = async () => {
    let meals = await getMealData(props.userID);
    setSavedMeals(meals);
  };
  // Function to delete a meal from the list
  const deleteMeal = async (index) => {
    const newMeals = [...savedMeals];
    let mealDelete = newMeals[index];
    await deleteMealData(props.userID, mealDelete.id);
    newMeals.splice(index, 1);
    setSavedMeals(newMeals);
  };

  // Function to edit a meal in the list
  const editMeal = async (cardMeal, index) => {
    const newMeals = [...savedMeals];
    newMeals[index] = cardMeal;
    await updateMealData(props.userID, cardMeal.id, cardMeal);
    setSavedMeals(newMeals);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {savedMeals != null &&
        savedMeals.length > 0 &&
        savedMeals.map((meal, index) => (
          <MealCard
            key={index}
            index={index}
            meal={meal}
            editMeal={editMeal}
            deleteMeal={deleteMeal}
          />
        ))}
    </ScrollView>
  );
};

export default SavedMeals;
