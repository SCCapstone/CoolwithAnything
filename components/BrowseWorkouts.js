// BrowseWorkouts.js
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
import SearchBar from "../components/SearchBar";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

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
      <View>
        <SearchBar />
      </View>

      <ScrollView>
        {/* Different Buttons for the different types of exercises */}
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleQueryButtonClick("biceps")}
            style={styles.wrapper}
          >
            <ImageBackground
              source={require("../assets/biceps.png")}
              style={styles.imageBiceps}
            />
            <Text style={styles.buttonText}>Biceps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("glutes")}
            style={styles.wrapper}
          >
            <ImageBackground
              source={require("../assets/glutes.png")}
              style={styles.imageGlutes}
            />
            <Text style={styles.buttonText}>Glutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("abs")}
            style={styles.wrapper}
          >
            <ImageBackground
              source={require("../assets/abs.png")}
              style={styles.imageAbs}
            />
            <Text style={styles.buttonText}>Abs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleQueryButtonClick("legs")}
            style={styles.wrapper}
          >
            <ImageBackground
              source={require("../assets/legs.png")}
              style={styles.imageLegs}
            />
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
