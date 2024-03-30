import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import WorkoutApi from "../APIs/WorkoutAPI";
import styles from "../styles/WorkoutStyles";
import SearchBar from "./SearchWorkout";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/WorkoutStyles";


const BrowseWorkouts = (route) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const handleQueryButtonClick = (exercise) => {
    setSelectedExercise(exercise);
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
        {/* Different Buttons for the different types of exercises */}
        <View style={styles.typeContainer}>
          <TouchableOpacity
            onPress={() => handleQueryButtonClick("biceps")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/biceps.png")}
                style={styles.imageBiceps}
              />
            }
            <Text style={styles.buttonText}>Biceps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("glutes")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/glutes.png")}
                style={styles.imageGlutes}
              />
            }
            <Text style={styles.buttonText}>Glutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("abdominals")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/abs.png")}
                style={styles.imageAbs}
              />
            }
            <Text style={styles.buttonText}>Abs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("quadriceps")}
            style={styles.wrapper}
          >
            {
              <ImageBackground
                source={require("../images/legs.png")}
                style={styles.imageLegs}
              />
            }
            <Text style={styles.buttonText}>Legs</Text>
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
          <View style={styles.headerContainer}>
            <Text style={styles.modalHeader}>Workouts</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton2}>Close</Text>
            </TouchableOpacity>
          </View>
          {/* Render WorkoutApi component with the selected query */}
          {selectedExercise && <WorkoutApi query={selectedExercise} route={route}/>}
        </View>
      </Modal>
    </View>
  );
};

export default BrowseWorkouts;
