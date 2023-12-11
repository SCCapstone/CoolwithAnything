// CreateWorkoutScreen.js
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import WorkoutHeader from './AddWorkoutComp/WorkoutHeader';
import InputField from './AddTaskComp/InputField'; // Reused from Create Task
import ExerciseItem from './AddWorkoutComp/ExerciseItem';
import DaySelector from './AddTaskComp/DateTimePicker';
import CommentBox from './AddTaskComp/CommentBox'; // Reused from Create Task
import CreateButton from './AddTaskComp/CreateButton'; // Reused from Create Task

const CreateWorkoutScreen = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <WorkoutHeader onClose={() => console.log('Close pressed')} />
      <InputField placeholder="Workout Name" />
      {/* Repeat ExerciseItem for each exercise */}
      <ExerciseItem />
      <ExerciseItem />
      {/* ... */}
      <DaySelector selectedDays={selectedDays} onDayToggle={toggleDay} />
      <CommentBox />
      <CreateButton onPress={() => console.log('Create Workout')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CreateWorkoutScreen;
