import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import getStyles from "../styles/CookbookStyle.js";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useTheme } from "../services/ThemeContext.js";
import { addMealData } from "../services/AuthAPI";
import { useMeals } from "../services/MealsContext";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const MealCards = ({
  apiData,
  handleCardPress,
  selectedRecipe,
  closeModal,
}) => {
  const auth = getAuth();
  const userID = auth.currentUser ? auth.currentUser.uid : null;
  const { setSavedMeals } = useMeals();
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
      <FlatList
        data={apiData}
        keyExtractor={(reciepe, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handleCardPress(item)}
          >
            <MaterialCommunityIcons
              name={"food-fork-drink"}

              color={"#5da8af"}
            />
            <View style={styles.cardContent}>
              <Text style={styles.modal}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: "2.5%", // Adjust horizontal padding for two-column layout
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for detailed information */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedRecipe !== ""}
        onRequestClose={closeModal}
      >
        <SafeAreaView>
          <View style={styles.mealCardsTextContainer}>
            <Pressable onPress={handleCloseModal}>
              <Text style={styles.backButton}>←</Text>
            </Pressable>
            <Text style={styles.mealText}>Recipes</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView>
            <View style={styles.modalContainer}>
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
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default MealCards;
