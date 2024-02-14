import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/SearchBarStyle.js";
import WorkoutCards from "./WorkoutCards.js";

const SearchBar = ({ setSearchTerm }) => {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
        console.log(data);
        if (data && data.exercise) {
          setApiData(data.exercise);
          setModalVisible(true);
        }
      })
      .catch((err) => {
        console.log(`error ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("API data updated:", apiData);
    // You can perform additional logic if needed when the 'apiData' state changes
  }, [apiData]);

  const handleCardPress = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
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
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Image
            source={require("../assets/search.png")}
            resizeMode="contain"
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        {/* Render the loading indicator based on the 'loading' state */}

        {/* Render your search results here based on the 'apiData' state */}
        {apiData.length > 0 && (
          <WorkoutCards
            apiData={apiData}
            handleCardPress={handleCardPress}
            selectedExercise={selectedExercise}
            setModalVisible={setModalVisible}
            closeModal={() => setSelectedExercise("")}
          />
        )}
      </View>

      {/* Move the WorkoutCards component outside the main View if it's not directly related */}
      {/* <WorkoutCards
        apiData={apiData}
        handleCardPress={handleCardPress}
        selectedExercise={selectedExercise}
        setModalVisible={setModalVisible}
        closeModal={() => setSelectedExercise("")}
      /> */}
    </View>
  );
};

export default SearchBar;
