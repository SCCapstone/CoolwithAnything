import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  Text,
  View,
  Switch,
  TextInput,
  Pressable
} from "react-native";
import Header from "../components/Header";
import DateTimePicker from "../components/DateTimePicker";
import TypeSelector from "../components/TypeSelector";
import CreateButton from "../components/CreateButton";
import { updateTaskForUser, deleteTask } from "../services/AuthAPI";
import eventEmitter from "../components/EventEmitter";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/AddStyles";

const EditTaskScreen = ({ route, navigation }) => {
  const { task, userId } = route.params;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [taskName, setTaskName] = useState(task.name);
  const [location, setLocation] = useState(task.location);
  const [taskType, setTaskType] = useState(task.type);
  const [comment, setComment] = useState(task.comment);
  const [date, setDate] = useState(new Date(task.date));
  const [priority, setPriority] = useState(task.priority);
  const [isCompleted, setIsCompleted] = useState(false);



  const handleCompleteAndDeleteTask = async () => {
    try {
      await deleteTask(userId, task.id);
      Alert.alert("Success", "Task successfully completed and removed!");
      eventEmitter.emit("taskUpdated");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to complete and remove the task. Please try again.");
      console.error("Error completing and removing task:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe("taskUpdated", () => {
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateTask = async () => {
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
      priority: priority,
      completed: isCompleted,
    };

    try {
      await updateTaskForUser(userId, task.id, taskData);
      Alert.alert("Success", "Task updated successfully");
      eventEmitter.emit("taskUpdated");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.toString());
    }
  };

  return (
    <View style={{ flex: 1}}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Edit Task</Text>
        <View style={{width: 24}}/>
      </View>

      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          placeholderTextColor='gray'
          value={taskName}
          onChangeText={setTaskName}
        />
        <DateTimePicker date={date} onConfirm={setDate} />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor='gray'
          value={location}
          onChangeText={setLocation}
        />
        <TypeSelector selectedType={taskType} onSelect={setTaskType} />
        <TextInput
          style={styles.input}
          placeholder="Comments"
          placeholderTextColor='gray'
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
        </View>
        <CreateButton
          onPress={handleUpdateTask}
          label="Update Task"
          disabled={!taskName.trim()}
        />
      </ScrollView>
    </View>
    
  );
};

export default EditTaskScreen;