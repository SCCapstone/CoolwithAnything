import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import styles from "../styles/WorkoutStyles.js";

const MealCards = ({
  apiData,
  handleCardPress,
  selectedExercise,
  closeModal,
}) => {
  const [setModalVisible] = useState(false);
  const handleCloseModal = () => {
    closeModal();
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
        visible={selectedExercise !== ""}
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
                <Text style={styles.label}>Muscle:</Text>{" "}
                {selectedExercise.muscle}
              </Text>
              <Text>
                <Text style={styles.label}>Equipment:</Text>{" "}
                {selectedExercise.equipment}
              </Text>
              <Text>
                <Text style={styles.label}>Difficulty:</Text>{" "}
                {selectedExercise.difficulty}
              </Text>
              <Text>
                <Text style={styles.label}>Instruction:</Text>{" "}
                {selectedExercise.instructions}
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
