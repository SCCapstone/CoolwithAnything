// CreateMealScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MealHeader from './MealHeader';
import IngredientItem from './IngredientItem';
import DirectionsBox from './DirectionsBox';
import CreateButton from './CreateButton'; // Reused from previous examples
import InputField from './InputField'; // Reused from previous examples

const CreateMealScreen = () => {
  // You would manage your ingredients and their amounts/calories here
  const [ingredients, setIngredients] = useState([
    { name: 'Steak', amount: '10 oz', calories: '847' },
    // ...other ingredients
  ]);

  return (
    <ScrollView style={styles.container}>
      <MealHeader onClose={() => console.log('Close pressed')} />
      <InputField placeholder="Meal Name" />
      {ingredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient.name} />
      ))}
      {/* Add New Ingredient Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New +</Text>
      </TouchableOpacity>
      {/* Total Calories */}
      <View style={styles.totalCalories}>
        <Text>Total Calories:</Text>
        <Text>1004</Text>
      </View>
      <DirectionsBox />
      <CreateButton onPress={() => console.log('Create Meal')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    alignItems: 'center',
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  totalCalories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

export default CreateMealScreen;