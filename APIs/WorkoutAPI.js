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

const WorkoutApi = ({ query }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let options = {
      method: "GET",
      headers: { "X-Api-Key": "272B6ZvC3H2fVwwWGIngig==qQ1K3uNZQm2Pgn0o" },
    };

    let url = "https://api.api-ninjas.com/v1/exercises?muscle=" + query;

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

  const handleCardPress = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View>
        {apiData.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => handleCardPress(exercise)}
          >
            <View style={styles.cardContent}>
              <Text>
                <Text style={styles.label}>Name:</Text> {exercise.name}
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
          {selectedExercise && (
            <View style={styles.modalContent}>
              <Text>
                <Text style={styles.label}>Name:</Text> {selectedExercise.name}
              </Text>
              <Text>
                <Text style={styles.label}>Type:</Text> {selectedExercise.type}
              </Text>
              <Text>
                <Text style={styles.label}>Muscle:</Text> {selectedExercise.muscle}
              </Text>
              <Text>
                <Text style={styles.label}>Equipment:</Text> {selectedExercise.equipment}
              </Text>
              <Text>
                <Text style={styles.label}>Difficulty:</Text> {selectedExercise.difficulty}
              </Text>
              <Text>
                <Text style={styles.label}>Instruction:</Text> {selectedExercise.instructions}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  cardContainer: {
    backgroundColor: "white",
    borderColor: "black",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
  },
  modalContent: {
    padding: 16,
  },
  closeButton: {
    color: "blue",
    fontSize: 16,
    padding: 16,
  },
});

export default WorkoutApi;
