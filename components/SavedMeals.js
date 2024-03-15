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
    const newMeals = [...savedMeals];
    newMeals.splice(index, 1);
    setSavedMeals(newMeals);
  };

  // Function to edit a meal in the list
  const editMeal = (cardMeal, index) => {
    const newMeals = [...savedMeals];
    newMeals[index] = cardMeal;
    setSavedMeals(newMeals);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {savedMeals != null &&
        savedMeals.length > 0 && 
        savedMeals.map((meal, index) =>
          <MealCard
            key={index}
            index={index}
            meal={meal}
            editMeal={editMeal}
            deleteMeal={deleteMeal}
          />
        )}
    </ScrollView>
  );
};

export default SavedMeals;