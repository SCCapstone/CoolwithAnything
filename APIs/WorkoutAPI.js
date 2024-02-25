import React, { useState, useEffect } from "react";
import WorkoutCards from "../components/WorkoutCards.js";

const WorkoutApi = ({ query }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [modalVisible, setModalVisible] = useState("");

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

  return (
    <WorkoutCards
      apiData={apiData}
      handleCardPress={handleCardPress}
      selectedExercise={selectedExercise}
      closeModal={() => setSelectedExercise("")}
    />
  );
};

export default WorkoutApi;