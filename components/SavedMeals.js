import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import MealCard from './MealCard';

const SavedMeals = ({ meals, setSavedMeals }) => {
  useEffect(() => {
    // Code to run when meals change, if necessary
  }, [meals]);

  // Function to delete a meal from the list
  const deleteMeal = (index) => {
    if (!meals) return;  // Guard against undefined meals

    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setSavedMeals(newMeals);
  };

  // Function to edit a meal in the list
  const editMeal = (cardMeal, index) => {
    if (!meals) return;  // Guard against undefined meals

    const newMeals = [...meals];
    newMeals[index] = cardMeal;
    setSavedMeals(newMeals);
  };

  // Check if meals is defined and is an array before mapping
  const mealCards = meals && Array.isArray(meals) ? (
    meals.map((meal, index) => (
      <MealCard
        key={index}
        index={index}
        meal={meal}
        editMeal={editMeal}
        deleteMeal={deleteMeal}
      />
    ))
  ) : (
    <Text>No meals available.</Text>  // Or any other placeholder content
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      {mealCards}
    </ScrollView>
  );
};

export default SavedMeals;
