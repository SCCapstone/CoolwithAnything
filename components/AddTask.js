// CreateTaskScreen.js
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './Header';
import InputField from './InputField';
import DateTimePicker from './DateTimePicker';
import TypeSelector from './TypeSelector';
import CommentBox from './CommentBox';
import CreateButton from './CreateButton';

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
