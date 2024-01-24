import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles/WorkoutStyles.js';

const WorkoutApi = ({ query }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let options = {
      method: "GET",
      headers: { "X-Api-Key": "LoTwPc2646862p61sf+G2w==Uz3ffsJRY53dhgOi" },
    };

    let url = 'https://api.api-ninjas.com/v1/exercises?muscle=' + query;

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
              <Text><Text style={styles.label}>Name:</Text> {exercise.name}</Text>
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
              <Text><Text style={styles.label}>Name:</Text> {selectedExercise.name}</Text>
              <Text><Text style={styles.label}>Type:</Text> {selectedExercise.type}</Text>
              <Text><Text style={styles.label}>Muscle:</Text> {selectedExercise.muscle}</Text>
              <Text><Text style={styles.label}>Equipment:</Text> {selectedExercise.equipment}</Text>
              <Text><Text style={styles.label}>Difficulty:</Text> {selectedExercise.difficulty}</Text>
              <Text><Text style={styles.label}>Instruction:</Text> {selectedExercise.instructions}</Text>
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

export default WorkoutApi;
