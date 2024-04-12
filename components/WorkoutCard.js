import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Share,
} from "react-native";

import getStyles from "../styles/WorkoutStyles";
import { useTheme } from "../services/ThemeContext";

const WorkoutCard = ({ workout, index, deleteWorkout, editWorkout }) => {
  const [cardWorkout, setCardWorkout] = useState(workout);
  const [editMode, setEditMode] = useState(false);
  const [editableWorkout, setEditableWorkout] = useState({ ...workout });
  const [workoutName, setWorkoutName] = useState(workout.workoutName);
  const [workoutType, setWorkoutType] = useState(workout.workoutType);
  const [workoutMuscle, setWorkoutMuscle] = useState(workout.workoutMuscle);
  const [nameInputHeight, setNameInputHeight] = useState(20); 
  const [typeInputHeight, setTypeInputHeight] = useState(20);
  const [muscleInputHeight, setMuscleInputHeight] = useState(20);
  const [equipmentInputHeight, setEquipmentInputHeight] = useState(20); 
  const [difficultyInputHeight, setDifficultyInputHeight] = useState(20);
  const [instructionsInputHeight, setInstructionsInputHeight] = useState(20);
  const { theme } = useTheme();
  const styles = getStyles(theme);
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

  const handleTextChange = (text, field) => {
    const prefix = `${field}: `;
    let newValue = text.startsWith(prefix) ? text.slice(prefix.length) : text;
    if (text.trim() === prefix.trim()) {
      newValue = '';
    }
  
    switch (field) {
      case "Name":
        setWorkoutName(newValue);
        break;
      case "Type":
        setWorkoutType(newValue);
        break;
      case "Muscle":
        setWorkoutMuscle(newValue);
        break;
      case "Equipment":
        setWorkoutEquipment(newValue);
        break;
      case "Difficulty":
        setWorkoutDifficulty(newValue);
        break;
      case "Instructions":
        setWorkoutInstructions(newValue);
        break;
      default:
        break;
    }
  };

  const handleNameSizeChange = (event) => {
    setNameInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleTypeSizeChange = (event) => {
    setTypeInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleMuscleSizeChange = (event) => {
    setMuscleInputHeight(event.nativeEvent.contentSize.height + 4);
  };

  const handleEquipmentSizeChange = (event) => {
    setEquipmentInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleDifficultySizeChange = (event) => {
    setDifficultyInputHeight(event.nativeEvent.contentSize.height + 4);
  };
  
  const handleInstructionsSizeChange = (event) => {
    setInstructionsInputHeight(event.nativeEvent.contentSize.height + 4);
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
      id: workout.id,
    };
    //debugger;
    setCardWorkout(newWorkout);
    editWorkout(newWorkout, index);
    setEditMode(false);
  };

  return (
    <View style={styles.savedCard}>
      {editMode ? (
        <View>
          <TextInput
  value={`Name: ${workoutName}`}
  onChangeText={(text) => handleTextChange(text, "Name")}
  style={[styles.savedText, { height: nameInputHeight }]}
  multiline
  onContentSizeChange={handleNameSizeChange}
/>
<TextInput
  value={`Type: ${workoutType}`}
  onChangeText={(text) => handleTextChange(text, "Type")}
  style={[styles.savedText, { height: typeInputHeight }]}
  multiline
  onContentSizeChange={handleTypeSizeChange}
/>
<TextInput
  value={`Muscle: ${workoutMuscle}`}
  onChangeText={(text) => handleTextChange(text, "Muscle")}
  style={[styles.savedText, { height: muscleInputHeight }]}
  multiline
  onContentSizeChange={handleMuscleSizeChange}
/>
<TextInput
  value={`Equipment: ${workoutEquipment}`}
  onChangeText={(text) => handleTextChange(text, "Equipment")}
  style={[styles.savedText, { height: equipmentInputHeight }]}
  multiline
  onContentSizeChange={handleEquipmentSizeChange}
/>
<TextInput
  value={`Difficulty: ${workoutDifficulty}`}
  onChangeText={(text) => handleTextChange(text, "Difficulty")}
  style={[styles.savedText, { height: difficultyInputHeight }]}
  multiline
  onContentSizeChange={handleDifficultySizeChange}
/>
<TextInput
  value={`Instructions: ${workoutInstructions}`}
  onChangeText={(text) => handleTextChange(text, "Instructions")}
  style={[styles.savedText, { height: instructionsInputHeight }]}
  multiline
  onContentSizeChange={handleInstructionsSizeChange}
/>


          <Pressable style={styles.buttonOptions} onPress={() => onCancel()}>
            <Text style={styles.optionText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.buttonOptions} onPress={() => onSave()}>
            <Text style={styles.optionText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.savedText}>Name: {workout.workoutName}</Text>
          <Text style={styles.savedText}>Type: {workout.workoutType}</Text>
          <Text style={styles.savedText}>
            Muscle: {workout.workoutMuscle}
          </Text>
          <Text style={styles.savedText}>
            Equipment: {workout.workoutEquipment}
          </Text>
          <Text style={styles.savedText}>
            Difficulty: {workout.workoutDifficulty}
          </Text>
          <Text style={styles.savedText}>
            Instructions: {workout.workoutInstructions}
          </Text>

          <Pressable
            style={styles.buttonOptions}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.optionText}>Edit</Text>
          </Pressable>
          <Pressable
            style={styles.buttonOptions}
            onPress={() => deleteWorkout(index)}
          >
            <Text style={styles.optionText}>Delete</Text>
          </Pressable>
          <Pressable style={styles.buttonOptions} onPress={myShare}>
            <Text style={styles.optionText}>Share</Text>
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