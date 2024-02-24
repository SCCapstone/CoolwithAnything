import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from "react-native";
import Header from "../components/Header"; // Assuming this is a custom component
import InputField from "../components/InputField"; // Assuming this is a custom component
import DateTimePicker from "../components/DateTimePicker"; // Assuming this is a custom component
import TypeSelector from "../components/TypeSelector"; // Assuming this is a custom component
import CommentBox from "../components/CommentBox"; // Assuming this is a custom component
import CreateButton from "../components/CreateButton"; // Assuming this is a custom component, consider renaming it to ActionButton for reuse
import { updateTaskForUser } from "../services/AuthAPI";

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;

  // State for each field with initial values from the task
  const [taskName, setTaskName] = useState(task.name);
  const [location, setLocation] = useState(task.location);
  const [taskType, setTaskType] = useState(task.type);
  const [comment, setComment] = useState(task.comment);
  const [date, setDate] = useState(new Date(task.date));

  const handleUpdateTask = async () => {
    const taskData = {
      name: taskName,
      date: date.toISOString(),
      location: location,
      type: taskType,
      comment: comment,
    };

    try {
      await updateTaskForUser(task.userId, task.id, taskData);
      Alert.alert("Success", "Task updated successfully");
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      Alert.alert("Error", "Failed to update task");
      console.error(error);
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
    padding: 10,
  },
});

export default EditTaskScreen;