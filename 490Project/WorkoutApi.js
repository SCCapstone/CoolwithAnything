import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const WorkoutApi = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch("https://api-ninjas.com/api/exercises+G2w==Uz3ffsJRY53dhgOi")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setWorkouts(data))
    .catch((error) => console.error("Error fetching workouts:", error.message));
  }, []);

  return (
    <View>
      <Text>API Screen</Text>
      {/* Render API data or loading indicator */}
    </View>
  );
};

export default WorkoutApi;