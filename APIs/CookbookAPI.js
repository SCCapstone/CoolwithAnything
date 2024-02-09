import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import styles from "../styles/CookbookStyle";

const CookbookAPI = ({ query }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let options = {
      method: "GET",
      headers: { "X-Api-Key": "272B6ZvC3H2fVwwWGIngig==qQ1K3uNZQm2Pgn0o" },
    };

    let url = "https://api.api-ninjas.com/v1/recipe?query=" + query;

    fetch(url, options)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        console.log(data);
        setApiData(data); // update state with fetched data
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }, [query]);

  const handleCardPress = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton1}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CookbookAPI;