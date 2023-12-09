import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTaskScreen = ({ route, navigation }) => {
  const { task, onGoBack } = route.params;
  const [name, setName] = useState(task.name);
  const [details, setDetails] = useState(task.details);
  
  // Adjust the date initialization to account for timezone
  const [date, setDate] = useState(new Date(task.date + 'T00:00:00'));

  const handleSave = async () => {
    // Format date to YYYY-MM-DD format
    const formattedDate = formatDate(date);
    const updatedTask = { ...task, name, details, date: formattedDate };
    
    try {
      const storedData = await AsyncStorage.getItem('@tasks');
      let tasks = storedData ? JSON.parse(storedData) : [];
      // Find the index of the task we are editing
      const taskIndex = tasks.findIndex(t => t.name === task.name && t.details === task.details && t.date === task.date);
      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask; // Update the task at the found index
      }
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
      onGoBack(); // Invoke the callback to refresh tasks
      navigation.goBack(); // Navigate back to the previous screen
    } catch (e) {
      console.error('Error updating the task:', e);
    }
  };

  // Helper function to format the date in YYYY-MM-DD format
  function formatDate(d) {
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Task Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDetails}
        value={details}
        placeholder="Details"
        multiline
      />
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          setDate(selectedDate || date);
        }}
      />
      <Button title="Save Task" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  // Add other styles if necessary
});

export default EditTaskScreen;