// components/DirectionsBox.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const DirectionsBox = ({ onDirectionsChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.directionsInput}
        multiline
        placeholder="Directions"
        onChangeText={onDirectionsChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  directionsInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default DirectionsBox;
