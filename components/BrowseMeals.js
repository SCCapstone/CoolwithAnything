import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import CookbookApi from "../APIs/CookbookAPI";
import SearchBar from "./SearchMeal";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/CookbookStyle.js";

const BrowseMeals = ({ route }) => {
  const [selectedQuery, setSelectedQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const handleQueryButtonClick = (query) => {
    setSelectedQuery(query);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View>
        <SearchBar />
      </View>

      <ScrollView>
        {/* Different Buttons for the different types of meals */}
        <View style={styles.typeContainer}>
          <TouchableOpacity
            onPress={() => handleQueryButtonClick("meat")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/meat.png")}
                style={styles.imageSteak}
              />
            }
            <Text style={styles.buttonText}>Meat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("fish")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/seafood.png")}
                style={styles.imageSeafood}
              />
            }
            <Text style={styles.buttonText}>Seafood</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("veggies")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/veg.png")}
                style={styles.imageVeg}
              />
            }
            <Text style={styles.buttonText}>Vegetarian</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("healthy")}
            style={styles.wrapper}
          >
           { <ImageBackground
              source={require("../images/healthy.png")}
              style={styles.imageHealthy}
            />}
            <Text style={styles.buttonText}>Healthy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.listContainer}>
          <View style={styles.browseHeaderContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.backButton1}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.modalHeader, {marginLeft: -23}]}>Recipes</Text>
            <View styles={{ width: 24}} />
          </View>
          {/* Render WorkoutApi component with the selected query */}
          {selectedQuery && <CookbookApi query={selectedQuery} route={route} />}
        </View>
      </Modal>
    </View>
  );
};

export default BrowseMeals;
