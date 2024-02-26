import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import MealCard from './MealCard';
import { useMeals } from '../services/MealsContext';

const SavedMeals = () => {
  const { savedMeals, setSavedMeals } = useMeals();
  useEffect(() => {
    // Code to run when meals change, if necessary
  }, [savedMeals]);

  // Function to delete a meal from the list
  const deleteMeal = (index) => {
    if (!savedMeals) return; // Corrected from meals to savedMeals

    const newMeals = [...savedMeals]; // Corrected from meals to savedMeals
    newMeals.splice(index, 1);
    setSavedMeals(newMeals);
  };

  // Function to edit a meal in the list
  const editMeal = (cardMeal, index) => {
    if (!savedMeals) return; // Corrected from meals to savedMeals

    const newMeals = [...savedMeals]; // Corrected from meals to savedMeals
    newMeals[index] = cardMeal;
    setSavedMeals(newMeals);
  };

  // Check if meals is defined and is an array before mapping
  const mealCards = savedMeals && Array.isArray(savedMeals) ? (
    savedMeals.map((meal, index) => (
      <MealCard
        key={index}
        index={index}
        meal={meal}
        editMeal={editMeal}
        deleteMeal={deleteMeal}
      />
    ))
  ) : (
    <Text>No meals available.</Text>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      {mealCards}
    </ScrollView>
  );
};

export default SavedMeals;