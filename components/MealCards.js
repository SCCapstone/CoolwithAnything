import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import getStyles from "../styles/CookbookStyle.js";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useTheme } from "../services/ThemeContext.js";
import { addMealData } from "../services/AuthAPI";
import { useMeals } from "../services/MealsContext";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const MealCards = ({
  apiData,
  handleCardPress,
  selectedRecipe,
  closeModal,
  route,
}) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const userID = auth.currentUser ? auth.currentUser.uid : null;
  const [modalVisible, setModalVisible] = useState(false);
  const { savedMeals, setSavedMeals } = useMeals();
  const [mealName, setMealName] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealServing, setMealServings] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleAddMeal = async () => {
    console.log(mealName);

    const addMeal = {
      mealName: selectedRecipe.title, // Adjust based on the actual property names in selectedRecipe
      mealIngredients: selectedRecipe.ingredients,
      mealServings: selectedRecipe.servings, // Adjust variable name to match the object key if necessary
      mealInstructions: selectedRecipe.instructions,
    };
    await addMealData(userID, addMeal);
    setSavedMeals((savedMeals) => [...savedMeals, addMeal]);

    console.log(addMeal);

    setMealName(mealName);
    setMealIngredients(mealIngredients);
    setMealServings(mealServing);
    setMealInstructions(mealInstructions);

    closeModal();

    Alert.alert("Recipe added to saved");
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
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
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.mealCardsTextContainer}>
                <Pressable onPress={handleCloseModal}>
                  <Text style={styles.backButton}>←</Text>
                </Pressable>
                <Text style={styles.mealText}>Recipes</Text>
                <View style={{ width: 24 }} />
              </View>

              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"food-fork-drink"}
                  size={150}
                  color={"#5da8af"}
                />
              </View>
              <Text style={styles.cardModalHeader}>Exercise Details</Text>
              {selectedRecipe && (
                <View style={styles.modalContent}>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Name:</Text>{" "}
                    <Text style={styles.apiText}>{selectedRecipe.title}</Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Ingredients:</Text>{" "}
                    <Text style={styles.apiText}>
                      {selectedRecipe.ingredients}
                    </Text>
                  </Text>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>Servings:</Text>{" "}
                    <Text style={styles.apiText}>
                      {selectedRecipe.servings}
                    </Text>
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
              <TouchableOpacity
                onPress={() => {
                  console.log("meal added");
                  handleAddMeal();
                }}
              >
                <Text style={styles.addButton}>+ Add Recipe to Saved</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default MealCards;
