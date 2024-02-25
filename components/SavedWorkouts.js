// SavedWorkouts.js
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import WorkoutCard from "./WorkoutCard";
import { useWorkouts } from "../services/WorkoutsContext";

const SavedWorkouts = () => {
  const { savedWorkouts, setSavedWorkouts } = useWorkouts();
  useEffect(() => {
    //debugger; // Code to run when savedWorkouts change, if necessary
  }, [savedWorkouts]);

  const deleteWorkout = (index) => {
    const newWorkouts = [...savedWorkouts];
    newWorkouts.splice(index, 1);
    setSavedWorkouts(newWorkouts);
  };

  const editWorkout = (cardWorkout, index) => {
    const newWorkouts = [...savedWorkouts];
    newWorkouts[index] = cardWorkout;
    setSavedWorkouts(newWorkouts);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {savedWorkouts != null &&
        savedWorkouts.length > 0 &&
        savedWorkouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            index={index}
            workout={workout}
            editWorkout={editWorkout}
            deleteWorkout={deleteWorkout}
          />
        ))}
    </ScrollView>
  );
};

export default SavedWorkouts;
