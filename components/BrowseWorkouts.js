// BrowseWorkouts.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import WorkoutApi from "../APIs/WorkoutAPI";
import styles from "../styles/WorkoutStyles";
import SearchBar from "../components/SearchBar";

const BrowseWorkouts = () => {
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
      {/* Different Buttons for the different types of exercises */}
      <TouchableOpacity
        onPress={() => handleQueryButtonClick("biceps")}
        style={styles.showAllButton}
      >
        <Text>Biceps</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("glutes")}
        style={styles.showAllButton}
      >
        <Text>Glutes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("abdominals")}
        style={styles.showAllButton}
      >
        <Text>Abs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleQueryButtonClick("quadriceps")}
        style={styles.showAllButton}
      >
        <Text>Legs</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View>
          <Text style={styles.modalHeader}>Workouts</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton2}>Close</Text>
          </TouchableOpacity>
          {/* Render WorkoutApi component with the selected query */}
          {selectedQuery && <WorkoutApi query={selectedQuery} />}
        </View>
      </Modal>
    </View>
  );
};

export default BrowseWorkouts;
