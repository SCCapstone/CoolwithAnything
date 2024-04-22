import React, { useState } from "react";
import { ScrollView, Alert, Pressable, Text, View, TextInput } from "react-native";
import Header from "./Header";
import DateTimePicker from "./DateTimePicker";
import TypeSelector from "./TypeSelector";
import Button from "./CreateButton";
import { saveTaskForUser } from "../services/AuthAPI";
import eventEmitter from "./EventEmitter";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/AddStyles";

const CreateTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userID } = route.params;
  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [taskType, setTaskType] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("medium");
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleCreateTask = async () => {
    if (!taskName.trim() || !location.trim() || !comment.trim() || !date) {
      Alert.alert("Validation Error", "Please ensure all fields are filled.");
      return;
    }

    const taskData = {
      name: taskName,
      date: date.toISOString(),
      location: location,
      type: taskType,
      comment: comment,
      completed: false,
      priority: priority,
    };

    try {
      await saveTaskForUser(userID, taskData);
      Alert.alert("Success", "Task created successfully!");
      eventEmitter.emit("taskCreated");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "There was an error creating your task. Please try again.");
      console.error("Error creating task:", error);
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Header onClose={() => navigation.goBack()} />
      <TextInput
        style={styles.input}
        value={taskName}
        placeholder="Name"
        onChangeText={setTaskName}
      />
      <DateTimePicker initialDate={date} onConfirm={setDate} />
      <TextInput
        style={styles.input}
        value={location}
        placeholder="Location"
        onChangeText={setLocation}
      />
      <TypeSelector selectedType={taskType} onSelect={setTaskType} />
      <TextInput
        style={[styles.input, styles.tallInput]}
        value={comment}
        placeholder="Comments"
        multiline
        onChangeText={setComment}
      />
      <Text style={styles.priorityText}>Priority:</Text>
      <Picker
        selectedValue={priority}
        onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
        style={styles.priorityPicker}
      >
        <Picker.Item label="Low" value="low" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="High" value="high" />
      </Picker>
      <CreateButton
        onPress={handleCreateTask}
        label="Create Task"
        disabled={!taskName.trim()}
      />
    </ScrollView>
  );
};

export default CreateTaskScreen;