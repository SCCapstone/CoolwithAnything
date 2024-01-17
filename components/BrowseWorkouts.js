// BrowseWorkouts.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import WorkoutApi from '../APIs/WorkoutAPI';

const BrowseWorkouts = () => {
  const [showApi, setShowApi] = useState(false);

  return (
    <View>
      {/* Button to toggle displaying the API data */}
      <TouchableOpacity onPress={() => setShowApi(!showApi)}>
        <Text>{showApi ? 'Hide API Data' : 'Show API Data'}</Text>
      </TouchableOpacity>

      {/* Render WorkoutApi component conditionally based on showApi state */}
      {showApi && <WorkoutApi />}
    </View>
  );
};

export default BrowseWorkouts;
