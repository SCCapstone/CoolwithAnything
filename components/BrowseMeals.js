import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CookbookApi from '../APIs/CookbookAPI';

const BrowseMeals = ({ searchTerm, setSearchTerm }) => {
  const [showApi, setShowApi] = useState(false);

  return (
    <View>
      {/* Button to toggle displaying the API data */}
      <TouchableOpacity onPress={() => setShowApi(!showApi)}>
        <Text>{showApi ? 'Hide API Data' : 'Show API Data'}</Text>
      </TouchableOpacity>

      {/* Render CookbookApi component conditionally based on showApi state */}
      {showApi && <CookbookApi />}
    </View>
  );
};

export default BrowseMeals;
