// components/IngredientItem.js
import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const IngredientItem = ({
  ingredient,
  onAmountChange,
  onCaloriesChange,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ingredientName}>{ingredient}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onAmountChange}
        placeholder="Amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={onCaloriesChange}
        placeholder="Calories"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  ingredientName: {
    fontSize: 18,
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    flex: 1,
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
});

export default IngredientItem;
