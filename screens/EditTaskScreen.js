import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  View,
  Switch,
  TextInput
} from "react-native";
import Header from "../components/Header";
import DateTimePicker from "../components/DateTimePicker";
import TypeSelector from "../components/TypeSelector";
import CreateButton from "../components/CreateButton";
import { updateTaskForUser } from "../services/AuthAPI";
import eventEmitter from "../components/EventEmitter";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/AddStyles";

const EditTaskScreen = ({ route, navigation }) => {
  const { task, userId } = route.params;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Initialize state
  const [taskName, setTaskName] = useState(task.name);
  const [location, setLocation] = useState(task.location);
  const [taskType, setTaskType] = useState(task.type);
  const [comment, setComment] = useState(task.comment);
  const [date, setDate] = useState(new Date(task.date));
  const [priority, setPriority] = useState("medium");
  const [isCompleted, setIsCompleted] = useState(task.completed || false); // Assuming task has a completed field

  const handleUpdateTask = async () => {
    // Include completed status in taskData
    const taskData = {
      name: taskName,
      date: date.toISOString(),
      location: location,
      type: taskType,
      comment: comment,
      priority: priority,
      completed: isCompleted, // Include the completion status
    };

    try {
      await updateTaskForUser(userId, task.id, taskData);
      Alert.alert("Success", "Task updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.toString());
      console.error("Error updating task:", error);
    }
    eventEmitter.emit("taskCreated");
  };

  // UI Component for switch
  const renderCompletionSwitch = () => (
    <View style={styles.switchContainer}>
      <Text style={styles.priorityText}>Task Completed:</Text>
      <Switch value={isCompleted} onValueChange={setIsCompleted} />
    </View>
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Header onClose={() => navigation.goBack()} />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={taskName}
          onChangeText={setTaskName}
        />
      </View>
      <View>
        <DateTimePicker initialDate={date} onConfirm={setDate} />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View>
        <TypeSelector selectedType={taskType} onSelect={setTaskType} />
      </View>
      <View>
        <TextInput style={styles.input} text={comment} onChangeText={setComment} />
      </View>
      <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={styles.priorityText}>Priority</Text>
        <View
          style={styles.priorityPicker}
        >
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
            style={{ height: 50, width: 150 }}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
        {renderCompletionSwitch()}
      </View>

      <View>
        <CreateButton onPress={handleUpdateTask} label={"Update Task"} />
      </View>
    </ScrollView>
  );
};

export default EditTaskScreen;
