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
<<<<<<< HEAD
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
=======
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
>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a
    </ScrollView>
  );
};

export default SavedWorkouts;