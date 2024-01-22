import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

const workoutStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: "black",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#ededed',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

const WorkoutCard = ({ workout, index, deleteWorkout, editWorkout }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableWorkout, setEditableWorkout] = useState({ ...workout });

  const onCancel = () => {
    setEditableWorkout({ ...workout });
    setEditMode(false);
  };

  const onSave = () => {
    setEditMode(false);
    editWorkout(editableWorkout, index);
  };

  return (
    <View style={workoutStyles.card}>
      {editMode ? (
        <View>
          <TextInput
            value={editableWorkout.name}
            onChangeText={(text) => setEditableWorkout({ ...editableWorkout, name: text })}
            style={workoutStyles.text}
          />
          {/* Repeat TextInput for other fields */}
          <Pressable style={workoutStyles.button} onPress={onCancel}>
            <Text style={workoutStyles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={workoutStyles.button} onPress={onSave}>
            <Text style={workoutStyles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={workoutStyles.text}>Name: {workout.name}</Text>
          {/* Repeat Text for other fields */}
          <Pressable style={workoutStyles.button} onPress={() => setEditMode(true)}>
            <Text style={workoutStyles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable style={workoutStyles.button} onPress={() => deleteWorkout(index)}>
            <Text style={workoutStyles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default WorkoutCard;
