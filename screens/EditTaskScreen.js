import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, Text, View, Switch } from "react-native";
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
  
  // Initialize state
  const [taskName, setTaskName] = useState(task.name);
  const [location, setLocation] = useState(task.location);
  const [taskType, setTaskType] = useState(task.type);
  const [comment, setComment] = useState(task.comment);
  const [date, setDate] = useState(new Date(task.date));
  const [isCompleted, setIsCompleted] = useState(task.completed || false); // Assuming task has a completed field

  const handleUpdateTask = async () => {
    // Include completed status in taskData
    const taskData = {
      name: taskName,
      date: date.toISOString(),
      location: location,
      type: taskType,
      comment: comment,
      completed: isCompleted, // Include the completion status
    };

    try {
      await updateTaskForUser(userId, task.id, taskData);
      Alert.alert("Success", "Task updated successfully");
      eventEmitter.emit('taskUpdated');
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.toString());
      console.error("Error updating task:", error);
    }
  };

  // UI Component for switch
  const renderCompletionSwitch = () => (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>Task Completed:</Text>
      <Switch
        value={isCompleted}
        onValueChange={setIsCompleted}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Header onClose={() => navigation.goBack()} />
      <InputField placeholder="Name" value={taskName} onChangeText={setTaskName} />
      <DateTimePicker initialDate={date} onConfirm={setDate} />
      <InputField placeholder="Location" value={location} onChangeText={setLocation} />
      <TypeSelector selectedType={taskType} onSelect={setTaskType} />
      <CommentBox text={comment} onChangeText={setComment} />
      {renderCompletionSwitch()}
      <CreateButton onPress={handleUpdateTask} label={"Update Task"} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
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