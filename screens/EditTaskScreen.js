import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, Text, View } from "react-native";
import Header from "../components/Header";
import InputField from "../components/InputField"; 
import DateTimePicker from "../components/DateTimePicker"; 
import TypeSelector from "../components/TypeSelector"; 
import CommentBox from "../components/CommentBox"; 
import CreateButton from "../components/CreateButton"; 
import { updateTaskForUser } from "../services/AuthAPI";
import eventEmitter from '../components/EventEmitter';


const EditTaskScreen = ({ route, navigation }) => {
  const { task, userId } = route.params;

  // State for each field with initial values from the task
  const [taskName, setTaskName] = useState(task.name);
  const [location, setLocation] = useState(task.location);
  const [taskType, setTaskType] = useState(task.type);
  const [comment, setComment] = useState(task.comment);
  const [date, setDate] = useState(new Date(task.date));

  const handleUpdateTask = async () => {
    console.log("UserID:", userId, "TaskID:", task.id);
    const taskData = {
      name: taskName,
      date: date.toISOString(),
      location: location,
      type: taskType,
      comment: comment,
    };

    try {
        await updateTaskForUser(userId, task.id, taskData);
        Alert.alert("Success", "Task updated successfully");
        eventEmitter.emit('taskUpdated');
        navigation.goBack();
      } catch (error) {
         // Display the error message directly
        Alert.alert("Error", error.toString());
        console.error("Error updating task:", error);
      }
    };

  return (
    <ScrollView style={styles.container}>
      <Header onClose={() => navigation.goBack()} />
      <InputField placeholder="Name" value={taskName} onChangeText={setTaskName} />
      <DateTimePicker initialDate={date} onConfirm={setDate} />
      <InputField placeholder="Location" value={location} onChangeText={setLocation} />
      <TypeSelector selectedType={taskType} onSelect={setTaskType} />
      <CommentBox text={comment} onChangeText={setComment} />
      <CreateButton onPress={handleUpdateTask} label={"Update Task"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0FF', // Light blue background
    padding: 20,
  },
  inputField: {
    backgroundColor: '#FFFFFF', // White for contrast and clarity
    color: '#333333', // Dark text for readability
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B0B0FF', // Light purple border for a slight contrast
  },
  button: {
    backgroundColor: '#A0A0FF', // Soft purple for the button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF', // White text for visibility
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    color: '#5C5CFF', // Darker blue for header text
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default EditTaskScreen;