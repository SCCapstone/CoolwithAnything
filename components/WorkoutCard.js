import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Share,
} from "react-native";

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
    backgroundColor: "#ededed",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

const WorkoutCard = ({ workout, index, deleteWorkout, EditWorkout }) => {
  const [cardWorkout, setCardWorkout] = useState(workout);
  const [editMode, setEditMode] = useState(false);
  const [editableWorkout, setEditableWorkout] = useState({ ...workout });
  const [workoutName, setWorkoutName] = useState(workout.workoutName);
  const [workoutType, setWorkoutType] = useState(workout.workoutType);
  const [workoutMuscle, setWorkoutMuscle] = useState(workout.workoutMuscle);
  const [workoutEquipment, setWorkoutEquipment] = useState(
    workout.workoutEquipment
  );
  const [workoutDifficulty, setWorkoutDifficulty] = useState(
    workout.workoutDifficulty
  );
  const [workoutInstructions, setWorkoutInstructions] = useState(
    workout.workoutInstructions
  );
  const myShare = async () => {
    try {
      const result = await Share.share({
        message: `Workout\nName: ${workout.workoutName}\nType: ${workout.workoutType}\nMuscle: ${workout.workoutMuscle}
        \nEquipment: ${workout.workoutEquipment}\nDifficulty: ${workout.workoutDifficulty}\nInstructions: ${workout.workoutInstructions}`,
      });
      if (result.action == Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of: ", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        confirm.log("dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onCancel = () => {
    setEditableWorkout({ ...workout });
    setEditMode(false);
  };

  const onSave = () => {
    const newWorkout = {
      workoutName,
      workoutType,
      workoutMuscle,
      workoutEquipment,
      workoutDifficulty,
      workoutInstructions,
    };
    //debugger;
    setCardWorkout(newWorkout);
    EditWorkout(newWorkout, index);
    setEditMode(false);
  };

  return (
    <View style={workoutStyles.card}>
      {editMode ? (
        <View>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            style={workoutStyles.text}
          />
          <TextInput
            value={workoutType}
            onChangeText={setWorkoutType}
            style={workoutStyles.text}
          />
          <TextInput
            value={workoutMuscle}
            onChangeText={setWorkoutMuscle}
            style={workoutStyles.text}
          />
          <TextInput
            value={workoutEquipment}
            onChangeText={setWorkoutEquipment}
            style={workoutStyles.text}
          />
          <TextInput
            value={workoutDifficulty}
            onChangeText={setWorkoutDifficulty}
            style={workoutStyles.text}
          />
          <TextInput
            value={workoutInstructions}
            onChangeText={setWorkoutInstructions}
            style={workoutStyles.text}
          />

          <Pressable style={workoutStyles.button} onPress={() => onCancel()}>
            <Text style={workoutStyles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={workoutStyles.button} onPress={() => onSave()}>
            <Text style={workoutStyles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={workoutStyles.text}>Name: {workout.workoutName}</Text>
          <Text style={workoutStyles.text}>Type: {workout.workoutType}</Text>
          <Text style={workoutStyles.text}>
            Muscle: {workout.workoutMuscle}
          </Text>
          <Text style={workoutStyles.text}>
            Equipment: {workout.workoutEquipment}
          </Text>
          <Text style={workoutStyles.text}>
            Difficulty: {workout.workoutDifficulty}
          </Text>
          <Text style={workoutStyles.text}>
            Instructions: {workout.workoutInstructions}
          </Text>

          <Pressable
            style={workoutStyles.button}
            onPress={() => setEditMode(true)}
          >
            <Text style={workoutStyles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={workoutStyles.button}
            onPress={() => deleteWorkout(index)}
          >
            <Text style={workoutStyles.buttonText}>Delete</Text>
          </Pressable>
          <Pressable style={workoutStyles.button} onPress={myShare}>
            <Text style={workoutStyles.buttonText}>Share</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
const SavedWorkouts = ({ workouts, setSavedWorkouts }) => {
  useEffect(() => {}, [workouts]);
  const deleteWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setSavedWorkouts(newWorkouts);
  };
  const EditWorkout = (cardWorkout, index) => {
    const newWorkouts = [...workouts];
    newWorkouts[index] = cardWorkout;
    setSavedWorkouts(newWorkouts);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {workouts != null &&
        workouts.length > 0 &&
        workouts.map((workout, index) => {
          return (
            <WorkoutCard
              index={index}
              workout={workout}
              EditWorkout={EditWorkout}
              deleteWorkout={deleteWorkout}
            />
          );
        })}
    </ScrollView>
  );
};

export default WorkoutCard;
