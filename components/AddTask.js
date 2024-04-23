import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import Header from "./Header";
import DateTimePicker from "./DateTimePicker";
import TypeSelector from "./TypeSelector";
import CreateButton from "./CreateButton";
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
      eventEmitter.emit("taskAdded");
      eventEmitter.emit("taskUpdated");
      eventEmitter.emit("monthChanged");
      eventEmitter.emit("completedTasks");
      navigation.goBack();

      // Clear all input fields after successful task creation
      setTaskName("");
      setLocation("");
      setTaskType("");
      setComment("");
      setDate(new Date());
      setPriority("medium");
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error creating your task. Please try again."
      );
      console.error("Error creating task:", error);
    }
  };

  return (
    <View style={styles.screen} testID="add-meal-test">
      <View style={styles.createTextContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.createText} testID="add-meal-safe">
          Create Task
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.container}>
        <Header onClose={() => navigation.goBack()} />
        <TextInput
          style={styles.input}
          value={taskName}
          placeholder="Name"
          placeholderTextColor={"grey"}
          onChangeText={setTaskName}
        />
        <DateTimePicker initialDate={date} onConfirm={setDate} />
        <TextInput
          style={styles.input}
          value={location}
          placeholder="Location"
          placeholderTextColor={"grey"}
          onChangeText={setLocation}
        />
        <TypeSelector selectedType={taskType} onSelect={setTaskType} />
        <TextInput
          style={[styles.input, styles.tallInput]}
          value={comment}
          placeholder="Comments"
          placeholderTextColor={"grey"}
          multiline
          onChangeText={setComment}
        />
        <Text style={styles.priorityText}>Priority:</Text>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
          style={styles.priorityPicker}
          testID="priority-selector"
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
        <CreateButton
          onPress={handleCreateTask}
          label="Create Task"
          disabled={!taskName.trim()}
          testID="create-task-button"
        />
      </ScrollView>
    </View>
  );
};

export default CreateTaskScreen;
