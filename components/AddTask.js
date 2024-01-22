// CreateTaskScreen.js
import React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Alert  } from 'react-native';
import Header from './Header';
import InputField from './InputField';
import DateTimePicker from './DateTimePicker';
import TypeSelector from './TypeSelector';
import CommentBox from './CommentBox';
import CreateButton from './CreateButton';
import { saveDataToFirestore } from '../services/AuthAPI';

const CreateTaskScreen = ({route}) => {
  const { userID } = route.params;
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [taskType, setTaskType] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date());

  const handleCreateTask = async () => {
    // Get the user id from the auth service
    const userId = userID;

    const taskData = {
      name: taskName,
      date: date.toISOString(), // Convert date to a string format
      location,
      type: taskType,
      comment,
    };

    try {
      await saveDataToFirestore('tasks', taskData);
      Alert.alert('Task Created', 'Your task has been successfully created!');
      // Reset task creation form or navigate the user away
    } catch (error) {
      Alert.alert('Error', 'There was an error creating your task. Please try again.');
      console.error(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Header onClose={() => console.log('Close pressed')} />
      <InputField placeholder="Name" onChangeText={setTaskName} />
      <DateTimePicker onConfirm={setDate} />
      <InputField placeholder="Location" onChangeText={setLocation} />
      <TypeSelector onSelect={setTaskType} />
      <CommentBox onChangeText={setComment} />
      <CreateButton onPress={handleCreateTask} />
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
