import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import styles from "../styles/CookbookStyle";
import CookbookApi from "../APIs/CookbookAPI";
import SearchBar from "../components/SearchBar";

const BrowseMeals = ({ searchTerm, setSearchTerm }) => {
  const [selectedQuery, setSelectedQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleQueryButtonClick("meat")}
            style={styles.wrapper}
          >
            {/*<ImageBackground
              source={require("../images/meat.png")}
              style={styles.imageSteak}
            />*/}
            <Text style={styles.buttonText}>Meat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("fish")}
            style={styles.wrapper}
          >
            {/*<ImageBackground
              source={require("../images/seafood.png")}
              style={styles.imageSeafood}
            />
          */}
            <Text style={styles.buttonText}>Seafood</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("veggies")}
            style={styles.wrapper}
          >
            {/*<ImageBackground
              source={require("../images/veg.png")}
              style={styles.imageVeg}
            />
            */}
            <Text style={styles.buttonText}>Veggitarian</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("healthy")}
            style={styles.wrapper}
          >
            {/*<ImageBackground
              source={require("../images/healthy.png")}
              style={styles.imageHealthy}
          />*/}
            <Text style={styles.buttonText}>Healthy</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View>
              <Text style={styles.modalHeader}>Recipes</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton2}>Close</Text>
              </TouchableOpacity>
              {/* Render WorkoutApi component with the selected query */}
              {selectedQuery && <CookbookApi query={selectedQuery} />}
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default BrowseMeals;