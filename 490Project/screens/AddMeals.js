import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const AddMeal = ({ savedMeals, setSavedMeals }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [fatTotal, setFatTotal] = useState("");
  const [fatSaturated, setFatSaturated] = useState("");
  const [protein, setProtein] = useState("");
  const [sodium, setSodium] = useState("");
  const [potassium, setPotassium] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [carbohydratesTotal, setCarbohydratesTotal] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");

  const handleAdd = () => {
    const meal = {
      name,
      calories,
      servingSize,
      fatTotal,
      fatSaturated,
      protein,
      sodium,
      potassium,
      cholesterol,
      carbohydratesTotal,
      fiber,
      sugar,
    };

    setSavedMeals((savedMeals) => [...savedMeals, meal]);

    // Reset input fields after adding
    setName("");
    setCalories("");
    setServingSize("");
    setFatTotal("");
    setFatSaturated("");
    setProtein("");
    setSodium("");
    setPotassium("");
    setCholesterol("");
    setCarbohydratesTotal("");
    setFiber("");
    setSugar("");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Add Meal</Text>
        <TextInput
          style={styles.input}
          placeholder="Meal Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Serving Size (g)"
          value={servingSize}
          onChangeText={setServingSize}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Total Fat (g)"
          value={fatTotal}
          onChangeText={setFatTotal}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Saturated Fat (g)"
          value={fatSaturated}
          onChangeText={setFatSaturated}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Protein (g)"
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Sodium (mg)"
          value={sodium}
          onChangeText={setSodium}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Potassium (mg)"
          value={potassium}
          onChangeText={setPotassium}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cholesterol (mg)"
          value={cholesterol}
          onChangeText={setCholesterol}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Total Carbohydrates (g)"
          value={carbohydratesTotal}
          onChangeText={setCarbohydratesTotal}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Dietary Fiber (g)"
          value={fiber}
          onChangeText={setFiber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Sugar (g)"
          value={sugar}
          onChangeText={setSugar}
          keyboardType="numeric"
        />
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            { backgroundColor: pressed ? "#DC3545" : "#007BFF" },
          ]}
          onPress={handleAdd}
        >
          <Text style={styles.pressableText}>Add Meal</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: "100%",
  },
  pressable: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddMeal;
