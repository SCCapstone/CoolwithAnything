import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import WorkoutCard from "./WorkoutCard";
import { useWorkouts } from "../services/WorkoutsContext";
import {
  deleteWorkoutData,
  getWorkoutData,
  getWorkouts,
  updateWorkoutData,
} from "../services/AuthAPI";

const SavedWorkouts = ({ userID }) => {
  const {savedWorkouts, setSavedWorkouts} = useWorkouts();
  useEffect(() => {
    getWorkouts(); // Code to run when savedWorkouts change, if necessary
  }, [userID, setSavedWorkouts]);
  const getWorkouts = async () => {
    let workouts = await getWorkoutData(userID);
    setSavedWorkouts(workouts);
  };
  const deleteWorkout = async (index) => {
    const newWorkouts = [...savedWorkouts];
    let workoutDelete = newWorkouts[index];
    await deleteWorkoutData(userID, workoutDelete.id);
    newWorkouts.splice(index, 1);
    setSavedWorkouts(newWorkouts);
  };

  const editWorkout = async (cardWorkout, index) => {
    const newWorkouts = [...savedWorkouts];
    newWorkouts[index] = cardWorkout;
    await updateWorkoutData(userID, cardWorkout.id, cardWorkout);
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
