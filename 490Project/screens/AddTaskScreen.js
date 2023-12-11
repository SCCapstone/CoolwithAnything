import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSave = async () => {
    const formattedDate = date.toISOString().split('T')[0]; // Ensure the date is in 'YYYY-MM-DD' format
    const task = { name, details, date: formattedDate };
    try {
      const storedData = await AsyncStorage.getItem('@tasks');
      const tasks = storedData ? JSON.parse(storedData) : [];
      tasks.push(task);
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
      console.log("Saved task:", task);

      if (route.params?.reloadTasks) {
        route.params.reloadTasks(); // Invoke the callback to refresh the tasks on the calendar
      }

      navigation.goBack();
    } catch (e) {
      console.error('Error saving task:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Task Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDetails}
        value={details}
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
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
  }
});

export default AddTaskScreen;