import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import styles from "../styles/CookbookStyle";
import CookbookApi from '../APIs/CookbookAPI';

const BrowseMeals = ({ searchTerm, setSearchTerm }) => {
  const [showApi, setShowApi] = useState(false);

  const [selectedQuery, setSelectedQuery] = useState("");

  const handleQueryButtonClick = (query) => {
    setSelectedQuery(query);
    setModalVisible(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      {/* Different Buttons for the different types of meals */}
      <TouchableOpacity
        onPress={() => handleQueryButtonClick("meat")}
        style={styles.showAllButton}
      >
        <Image source={('../assets/steak.png')}/>
        <Text>Meat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("fish")}
        style={styles.showAllButton}
      >
        <Text>Seafood</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("veggies")}
        style={styles.showAllButton}
      >
        <Text>Veggitarian</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("healthy")}
        style={styles.showAllButton}
      >
        <Text>Healthy</Text>
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
  );
};

export default BrowseMeals;
