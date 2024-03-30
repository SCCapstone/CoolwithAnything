import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import getStyles from "../styles/CookbookStyle.js";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { addMealData } from "../services/AuthAPI";
import { useMeals } from "../services/MealsContext";

const MealCards = ({
  apiData,
  handleCardPress,
  selectedRecipe,
  closeModal,
  route,
}) => {
  const navigation = useNavigation();
  //const { userID } = route.userID;
  const [modalVisible, setModalVisible] = useState(false);
  const { savedMeals, setSavedMeals } = useMeals();
  const [mealName, setMealName] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealServings, setMealServings] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleCloseModal = () => {
    closeModal();
  };

 const handleAddMeal = async () => {
    setMealName(selectedRecipe.name);
    setMealIngredients(selectedRecipe.ingredients);
    setMealServings(selectedRecipe.servings);
    setMealInstructions(selectedRecipe.instructions);

    const addMeal = {
      mealName,
      mealIngredients,
      mealServings,
      mealInstructions,
    };

    await addMealData(userID, addMeal);
    setSavedMeals((savedWorkouts) => [...savedMeals, addMeal]);

    setMealName("");
    setMealIngredients("");
    setMealServings("");
    setMealInstructions("");

    console.log(addMeal);
  }; 

  return (
    <View style={styles.screen}>
      <ScrollView styles={styles.scrollScreen}>
      <View style={styles.background}>
        {apiData.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => handleCardPress(recipe)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.modal}>
                <Text style={styles.modalName}>Name:</Text> {recipe.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for detailed information */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedRecipe !== ""}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.cardModalHeader}>Meal Details</Text>
          {selectedRecipe && (
            <View style={styles.modalContent}>
              <Text style={styles.textContainer}>
                <Text style={styles.label}>Name:</Text>{" "}
                <Text style={styles.apiText}>{selectedRecipe.title}</Text>
              </Text>
              <Text style={styles.textContainer}>
                <Text style={styles.label}>Ingredients:</Text>{" "}
                <Text style={styles.apiText}>{selectedRecipe.ingredients}</Text>
              </Text>
              <Text style={styles.textContainer}>
                <Text style={styles.label}>Servings:</Text>{" "}
                <Text style={styles.apiText}>{selectedRecipe.servings}</Text>
              </Text>
              <Text style={styles.textContainer}>
                <Text style={styles.label}>Instructions:</Text>{" "}
                <Text style={styles.apiText}>
                  {selectedRecipe.instructions}
                </Text>
              </Text>
            </View>
          )}
          {/* Add button */}
         <TouchableOpacity onPress={handleAddMeal}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeButton1}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </ScrollView>
    </View>
  );
};

export default MealCards;
