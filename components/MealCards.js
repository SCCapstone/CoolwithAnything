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
  Image,
} from "react-native";
import getStyles from "../styles/CookbookStyle.js";
import { getAuth } from "firebase/auth";
import { useTheme } from "../services/ThemeContext.js";
import { addMealData } from "../services/AuthAPI";
import { useMeals } from "../services/MealsContext";
import { SafeAreaView } from "react-native-safe-area-context";

const imageMapping = {
  "Elegant Crabmeat Balls": require("../images/cookbook/crabballs.png"),
  "Ella's Vegetable and Meat Egg Rolls": require("../images/cookbook/eggrolls.png"),
  "Emeril's Crab Meat Deviled Eggs": require("../images/cookbook/deviled_eggs.png"),
  "Empanadas (Brazilian Meat Pies)": require("../images/cookbook/empanadas.png"),
  'Friday "Meat" Loaf': require("../images/cookbook/meatloaf.png"),
  "Friday Night Pot Roast (Meat)": require("../images/cookbook/pot_roast.png"),
  "Meat - a N's Slow Shoulder of Lamb": require("../images/cookbook/lamb_roast.png"),
  "Meat - Beef a la Will Moreland": require("../images/cookbook/roast_beef.png"),
  "Meat - Chicken Breasts with Walnut Aillade": require("../images/cookbook/chicken_breast.png"),
  'Meat - Roast Meat Loaf or "Hedgehog"': require("../images/cookbook/roast_meatloaf.png"),

  "Elegant and Easy Gourmet Gefilte Fish Pate": require("../images/cookbook/gefilte_fish.png"),
  "Elegant Baked Fish": require("../images/cookbook/baked_fish.png"),
  "Fried Catfish": require("../images/cookbook/fried_catfish.png"),
  "Fried Catfish #1": require("../images/cookbook/fried_catfish1.png"),
  "Fried Catfish #2": require("../images/cookbook/fried_catfish2.png"),
  "Fried Catfish Batter": require("../images/cookbook/fried_catfish3.png"),
  "Fried Crawfish Remoulade": require("../images/cookbook/fried_crawfish.png"),
  "Goan Fish Curry": require("../images/cookbook/fish_curry.png"),
  "Goan Grilled Fish": require("../images/cookbook/grilled_fish.png"),

  "Cellophane Noodles with Tofu and Veggies": require("../images/cookbook/cellophane.png"),
  "Vinaigrette of Braised Soup Veggies": require("../images/cookbook/veggie_soup.png"),
  "Seafood Stew W/veggies": require("../images/cookbook/veggie_stew.png"),
  "Marinated Veggies": require("../images/cookbook/grilled_veggies.png"),
  "Tortellini and Veggies <r T>": require("../images/cookbook/veg_tortellini.png"),
  "Bundle of Veggies": require("../images/cookbook/baked_veg.png"),
  "Chops And Garden Veggies": require("../images/cookbook/chop_veg.png"),
  "Rice And Veggies Stir Fry": require("../images/cookbook/rice_veg.png"),
  "Herb Dip for Artichokes/veggies": require("../images/cookbook/art_dip.png"),
  "Fish and Veggies Primavera": require("../images/cookbook/fish_veg_prima.png"),

  "Broccoli Cheese Soup - Healthy": require("../images/cookbook/broc_ched_soup.png"),
  "Chocolate-Covered Cherry Pudding (Healthy Exchanges)": require("../images/cookbook/choc_pud.png"),
  "Chocolateville Mocha Cheesecake (Healthy Exchanges)": require("../images/cookbook/choc_cheesecake.png"),
  "Gahb Healthy Apple-Walnut Muffins": require("../images/cookbook/apple_muffs.png"),
  "Lo-Cal Healthy Cole Slaw": require("../images/cookbook/coleslaw.png"),
  "Western Scramble (Healthy Exchanges)": require("../images/cookbook/scram_eggs.png"),
  "Quick and Healthy Chicken Stir-Fry, Lhj": require("../images/cookbook/stirfry.png"),
  "Low-Fat Healthy Chili in Crockpot": require("../images/cookbook/chili.png"),
  "Green Chile Stew-Healthy Mexican Cookbook": require("../images/cookbook/mexican_stew.png"),
  "Healthy Alfredo-Style Noodles": require("../images/cookbook/alfredo.png"),
};

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
            <Image
              source={imageMapping[item.title]}
              style={styles.iconContainer}
            />
            <View style={styles.cardContent}>
              <Text style={styles.modal}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: "5%", // Adjust horizontal padding for two-column layout
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
                <Image
                  source={imageMapping[selectedRecipe.title]}
                  style={styles.imageDetails}
                />
              </View>
              <Text style={styles.cardModalHeader}>Recipe Details</Text>
              {selectedRecipe && (
                <View style={styles.modalContent}>
                  <Text style={styles.textContainer}>
                    <Text style={styles.label}>{selectedRecipe.title}</Text>
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
                  <TouchableOpacity
                    onPress={() => {
                      console.log("meal added");
                      handleAddMeal();
                    }}
                  >
                    <Text style={styles.addButton}>+ Add Recipe to Saved</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* Add button */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default MealCards;
