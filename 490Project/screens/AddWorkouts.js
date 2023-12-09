import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

const AddWorkout = ({ savedWorkouts, setSavedWorkouts }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleAdd = () => {
    const workout = {
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instruction,
    };
    setSavedWorkouts((savedWorkouts) => [...savedWorkouts, workout]);
    // Reset input fields after adding
    setName("");
    setType("");
    setMuscle("");
    setEquipment("");
    setDifficulty("");
    setInstruction("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Muscle"
        value={muscle}
        onChangeText={setMuscle}
      />
      <TextInput
        style={styles.input}
        placeholder="Equipment"
        value={equipment}
        onChangeText={setEquipment}
      />
      <TextInput
        style={styles.input}
        placeholder="Difficulty"
        value={difficulty}
        onChangeText={setDifficulty}
      />
      <TextInput
        style={styles.input}
        placeholder="Instruction"
        value={instruction}
        onChangeText={setInstruction}
      />
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          { backgroundColor: pressed ? "#DC3545" : "#007BFF" },
        ]}
        onPress={handleAdd}
      >
        <Text style={styles.pressableText}>Add Workout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AddWorkout;
