import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import WorkoutCard from "./WorkoutCard";

const SavedWorkouts = ({ workouts, setSavedWorkouts }) => {
  useEffect(() => {
    // Code to run when savedWorkouts change, if necessary
  }, [workouts]);

  const deleteWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setSavedWorkouts(newWorkouts);
  };

  const editWorkout = (cardWorkout, index) => {
    const newWorkouts = [...workouts];
    newWorkouts[index] = cardWorkout;
    setSavedWorkouts(newWorkouts);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {workouts != null &&
        workouts.length > 0 &&
        workouts.map((workout) => (
          <WorkoutCard
            key={workout.id} // Use the unique identifier as the key
            workout={workout}
            editWorkout={editWorkout}
            deleteWorkout={deleteWorkout}
          />
        ))}
    </ScrollView>
  );
};

export default SavedWorkouts;