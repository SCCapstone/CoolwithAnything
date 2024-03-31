import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Text,
} from "react-native";
import Styles from "../styles/WorkoutStyles.js"
import WorkoutApi from "../APIs/WorkoutAPI.js";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/SearchBarStyle.js";

const SearchWorkout = ({ setSearchTerm }) => {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const workoutStyles = Styles(theme);

  const handleSearch = () => {
    setLoading(true);

    let options = {
      method: "GET",
      headers: { "X-Api-Key": "272B6ZvC3H2fVwwWGIngig==qQ1K3uNZQm2Pgn0o" },
    };

    let url = "https://api.api-ninjas.com/v1/exercises?muscle=" + input;

    fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.exercise && data.exercise.length > 0) {
        setApiData(data.exercise);
        setModalVisible(true);
        setErrorMessage('');
      } else {
        setApiData([]);
        setModalVisible(false);
        setErrorMessage('No results found for the given search.');
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
      setApiData([]);
      setModalVisible(false);
      setErrorMessage('Error fetching data. Please try again later.');
    })
    .finally(() => {
      setLoading(false);
    });
};


  useEffect(() => {
    console.log("API data updated:", apiData);
    // You can perform additional logic if needed when the 'apiData' state changes
  }, [apiData]);


  const handleQueryButtonClick = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="What are you looking for?"
            placeholderTextColor="grey"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleQueryButtonClick(input)}>
          <Image
            source={require("../assets/search.png")}
            resizeMode="contain"
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        {/* Render the loading indicator based on the 'loading' state */}


      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={workoutStyles.listContainer}>
          <View style={workoutStyles.browseHeaderContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={workoutStyles.backButton1}>←</Text>
            </TouchableOpacity>
            <Text style={[workoutStyles.modalHeader, {marginLeft: -23}]}>Workouts</Text>  
            <View style={{ width: 24 }} />
          </View>
          {/* Render WorkoutApi component with the selected query */}
          {selectedExercise && <WorkoutApi query={selectedExercise}/>}
        </View>
      </Modal>
    </View>
  );
};

export default SearchWorkout;