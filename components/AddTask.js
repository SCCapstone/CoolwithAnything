// CreateTaskScreen.js
import React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import Header from "./Header";
import InputField from "./InputField";
import DateTimePicker from "./DateTimePicker";
import TypeSelector from "./TypeSelector";
import CommentBox from "./CommentBox";
import CreateButton from "./CreateButton";
import { saveTaskForUser } from "../services/AuthAPI";

const CreateTaskScreen = ({ route }) => {
  const { userID } = route.params;
  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [taskType, setTaskType] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());

  const handleCreateTask = async () => {
    const user = userID;

    const taskData = {
      name: taskName,
      date: date.toISOString(),
      location: location,
      type: taskType,
      comment: comment,
      priority: 'low' // default priority
    };

    try {
      await saveTaskForUser(user, taskData);
      Alert.alert("Task Created", "Your task has been successfully created!");
      // Reset task creation form or navigate the user away
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error creating your task. Please try again."
      );
      console.error(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Header onClose={() => console.log("Close pressed")} />
      <InputField placeholder="Name" onChangeText={setTaskName} />
      <DateTimePicker onConfirm={setDate} />
      <InputField placeholder="Location" onChangeText={setLocation} />
      <TypeSelector onSelect={setTaskType} />
      <CommentBox onChangeText={setComment} />
      <CreateButton onPress={handleCreateTask} label={"Create Task"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CreateTaskScreen;
