import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const DirectionsBox = ({ onChangeText, value, placeholder, keyboardType }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.directionsInput}
        multiline
        placeholder="Ingredients"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
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
    borderColor: "grey",
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
    padding: 10,
  },
});

export default DirectionsBox;