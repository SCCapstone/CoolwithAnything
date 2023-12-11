// CreateTaskScreen.js
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './AddTaskComp/Header';
import InputField from './AddTaskComp/InputField';
import DateTimePicker from './AddTaskComp/DateTimePicker';
import TypeSelector from './AddTaskComp/TypeSelector';
import CommentBox from './AddTaskComp/CommentBox';
import CreateButton from './AddTaskComp/CreateButton';

const CreateTaskScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header onClose={() => console.log('Close pressed')} />
      <InputField placeholder="Name" />
      <DateTimePicker /> 
      <InputField placeholder="Location" />
      <TypeSelector />
      <CommentBox />
      <CreateButton onPress={() => console.log('Create Task')} />
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
