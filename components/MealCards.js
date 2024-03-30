import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import getStyles from "../styles/CookbookStyle";
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
  //const { userID } = route.userID;
  const [modalVisible, setModalVisible] = useState(false);
  const { savedMeals, setSavedMeals } = useMeals();
  const [ mealName, setMealName ] = useState("");
  const [ mealIngredients, setMealIngredients ] = useState("");
  const [ mealServings, setMealServings ] = useState("");
  const [ mealInstructions, setMealInstructions ] = useState("");
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

  }




return (
  <ScrollView>
      <View>
        {apiData.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => handleCardPress(recipe)}
          >
            <View style={styles.cardContent}>
              <Text>
                <Text style={styles.label}>Name:</Text> {recipe.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for detailed information */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View>
          <Text style={styles.modalHeader}>Exercise Details</Text>
          {selectedRecipe && (
            <View style={styles.modalContent}>
              <Text>
                <Text style={styles.label}>Name:</Text> {selectedRecipe.title}
              </Text>
              <Text>
                <Text style={styles.label}>Ingredients:</Text> {selectedRecipe.ingredients}
              </Text>
              <Text>
                <Text style={styles.label}>Servings:</Text> {selectedRecipe.servings}
              </Text>
              <Text>
                <Text style={styles.label}>Instructions:</Text> {selectedRecipe.instructions}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeButton1}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MealCards;